import os
import random
import datetime
from flask import (
    Flask, flash, render_template,
    redirect, request, session, url_for)
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from werkzeug.security import generate_password_hash, check_password_hash
if os.path.exists("env.py"):
    import env


app = Flask(__name__)


app.config["MONGO_DBNAME"] = os.environ.get("MONGO_DBNAME")
app.config["MONGO_URI"] = os.environ.get("MONGO_URI")
app.secret_key = os.environ.get("SECRET_KEY")


mongo = PyMongo(app)


# Creates a random number starting at 1 
def get_random_number(total_numbers):
    return random.randrange(1, total_numbers + 1)


# Finds if a duplicate exists
# *note* duplicates return False
def check_for_dups(full_list, added_item):
    for dup_check in full_list:
        if dup_check == added_item:
            return False, added_item
        else:
            continue
    return True, added_item


# builds randomized item list from random indexes
def random_list(random_indexes, item_list):
    iteration = 1
    return_list = []
    for index in random_indexes:
        for item in item_list:
            if index == iteration:
                return_list += [item]
                iteration = 1
                break
            iteration += 1
    return return_list


# --Creates(function) a randomized list for display
def create_random_recipe_lists(total_return, allRecipes):
    # --Defensive-- for a empty list
    if len(allRecipes) == 0:
        return allRecipes
    random_indexes = []  # holds random indexes
    if len(allRecipes) > 0:
        # keeps looping to find all or set number of recipes
        while True:
            # Builds a random number list without dups
            non_dup = check_for_dups(
                random_indexes, get_random_number(len(allRecipes)))
            if len(random_indexes) > 0:
                if non_dup[0]:
                    random_indexes += [non_dup[1]]
            else:
                random_indexes += [non_dup[1]]
            # Breaks while when max # of recipes reached
            if len(random_indexes) > total_return or (
                    len(random_indexes) == len(allRecipes)):
                break

    return random_list(random_indexes, allRecipes)


# --Creates(function)-- lists for user favorites and recents
# Keeps Items in order opposed to mongo "$or" operator
def create_user_recipe_list(recent_fav, chef_info):
    recipe_list = []
    if len(chef_info[recent_fav]) > 0:
        for recipe in chef_info[recent_fav]:
            recipe = mongo.db.recipes.find_one({"_id": ObjectId(recipe)})
            if recipe:
                recipe_list += [[recipe["_id"], recipe["name"]]]
    recipe_list = list(enumerate(recipe_list))
    return (recipe_list)


# Deletes previous image
def delete_avatar(avatar):
    try:
        mongo.db.fs.chunks.delete_many({"files_id": ObjectId(avatar)})
        mongo.db.fs.files.delete_many({"_id": ObjectId(avatar)})
    except KeyError:
        pass
    return


# Uploads new image
def upload_avatar():
    mongo.save_file(request.form.get("avatar_name"), request.files['avatar'])
    imageDict = mongo.db.fs.files.find_one(
        {"filename": request.form.get("avatar_name")})
    return request.form.get("avatar_name"), imageDict["_id"]


#Creates new hashed, unsalted password
def create_new_password(dict_key, form_key, dictioanry):
    dictioanry[dict_key] = generate_password_hash(
            request.form.get(form_key))
    return


# avatar_tuple - avatar name[0], avatar id[1]
# Create avatar dictioanry
def create_avatar_dict(avatar_tuple):
    return dict(avatar=avatar_tuple[0], avatar_id=avatar_tuple[1])


# Request bool from form and add to dict
def get_form_bool(bool_request_list, dictionary):
    for item in bool_request_list:
        dictionary[item] = bool(request.form.get(item))
    return


# Pulls list from form and adds it to dictionary as list
def get_form_list(range_total, dict_key, form_key, dictionary):
    dictionary[dict_key] = []
    for item in range(1, range_total):
        dictionary[dict_key].append(request.form.get(form_key + str(item)))
    return


# Pulls multiple items from forms and adds to dictionary
def get_form_items(pull_list, dictionary, is_lower):
    for item in pull_list:
        if is_lower:
            dictionary[item] = request.form.get(item).lower()
        else:
            dictionary[item] = request.form.get(item)
    return


# Update mongo recipe/user info with $set operator and dictionary
def update_mongo(
        recipe_user, object_id, upload_dict):
    if recipe_user == "user":
        mongo.db.users.update_one(
            {"_id": ObjectId(object_id)}, {"$set": upload_dict})
    elif recipe_user == "recipe":
        mongo.db.recipe.update_one(
            {"_id": ObjectId(object_id)}, {"$set": upload_dict})
    return


# Checks user password against server hash
def check_user_password(user):
    if check_password_hash(user["password"], request.form.get("password")):
        return True
    else:
        return False


# Checks if user value exists in mongo
def check_mongo_user(is_form, key, value):
    try:
        if is_form:
            exists = mongo.db.users.find_one(
                {key: request.form.get(value).lower()})
        else:
            exists = mongo.db.users.find_one(
                {key: value})
        return True, key, exists

    except AttributeError:
        return False, key


# Checks if mongo information matches user's email or name
def form_check_diff(mongo_cursor, dict_key, form_key):
    if mongo_cursor[dict_key] != request.form.get(form_key).lower():
        exist = check_mongo_user(True, dict_key, form_key)
        if exist[0]:
            flash_mes = dict_key.title() + " already exists! Try Again!"
            flash(flash_mes)
            return False
    return True


# Mongo Search for Bool True with dictionary key
def search_bool_return(dict_key):
    recipes = list(enumerate(mongo.db.recipes.find(
        {dict_key: {"$eq": True}},
        {"ingedients": 0, "steps": 0, "text": 0})))
    return recipes


# Compares dictionary values of mongo cursors and adds second cursor item
# to output list if they match and randomizes list
def match_mongo_cursors(match1_cur, match1_dict, match2_cur, match2_dict):
    return_list = []
    for match1 in match1_cur:
        matched_list = []
        for match2 in match2_cur:
            if(match2[match2_dict] == match1[match1_dict]):
                matched_list += [match2]
        return_list += create_random_recipe_lists(2, matched_list)
    return return_list


def search_mongo_recipes_no_bloat(list_enumerate, key, value):
    if list_enumerate == "list":
        return list(mongo.db.recipes.find(
            {key: value}, {"ingredients": 0, "steps": 0}))

    if list_enumerate == "enumerate":
        return enumerate(mongo.db.recipes.find(
            {key: value}, {"ingredients": 0, "steps": 0}))

    if list_enumerate == "both":
        return list(enumerate(mongo.db.recipes.find(
            {key: value}, {"ingredients": 0, "steps": 0})))


def call_user():
    userInfo = mongo.db.users.find_one({"email": session["user"]}, (
        {"username": 1, "recents": 1, "favorites": 1}))
    return userInfo
