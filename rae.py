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


# total_number - max number(index) random can choose
# Creates a random number starting at 1
def get_random_number(total_numbers):
    return random.randrange(1, total_numbers + 1)


# add_item - item to check list for duplicates
# full_list - entire list to check through
# Finds if a duplicate exists
# *note* duplicates return False
def check_for_dups(full_list, add_item):
    for item in full_list:
        if item == add_item:
            return False, add_item
        else:
            continue
    return True, add_item


# builds lists with random indexes
def random_list(index_list, item_list):
    iteration = 1
    return_list = []
    for index in index_list:
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


# Delete previous image
def delete_avatar(avatar):
    try:
        mongo.db.fs.chunks.delete_many({"files_id": ObjectId(avatar)})
        mongo.db.fs.files.delete_many({"_id": ObjectId(avatar)})
    except KeyError:
        pass
    return


# Upload new image
def upload_avatar():
    mongo.save_file(request.form.get("avatar_name"), request.files['avatar'])
    imageDict = mongo.db.fs.files.find_one(
        {"filename": request.form.get("avatar_name")})
    return request.form.get("avatar_name"), imageDict["_id"]


def create_new_password(dict_key, form_key, dictioanry):
    dictioanry[dict_key] = generate_password_hash(
            request.form.get(form_key))
    return


# avatar_tuple - return form upload_avatar
# Create avatar dictioanry
def create_avatar_dict(avatar_tuple):
    return dict(avatar=avatar_tuple[0], avatar_id=avatar_tuple[1])


# iterate_list - list of bools to get from form and add to dictionary
# dictionary - dictioanry to add list to
# Get bool from form
def get_form_bool(iterate_list, dictionary):
    for item in iterate_list:
        dictionary[item] = bool(request.form.get(item))
    return


# range_total - Total of range to on form
# dict_key - key to add list items to in dictionary
# form_key - key to find items in form
# dictionary - dictioanry to add list to
# Pulls list from form and adds it to dictionary as list
def get_form_list(range_total, dict_key, form_key, dictionary):
    dictionary[dict_key] = []
    for item in range(1, range_total):
        dictionary[dict_key].append(request.form.get(form_key + str(item)))
    return


# pull_list - all items to pull from form
# dictionary - dictioanry to add items to
# Pulls multiple items from list at one time and adds to dictionary
def get_form_items(pull_list, dictionary, is_lower):
    for item in pull_list:
        if is_lower:
            dictionary[item] = request.form.get(item).lower()
        else:
            dictionary[item] = request.form.get(item)
    return


# recipe_user - str recipe or user
# object_id - id of object to update
# upload_dict - dictionary to be uploaded
# Update mongo info
def update_mongo(
        recipe_user, object_id, upload_dict):
    if recipe_user == "user":
        mongo.db.users.update_one(
            {"_id": ObjectId(object_id)}, {"$set": upload_dict})
    elif recipe_user == "recipe":
        mongo.db.recipe.update_one(
            {"_id": ObjectId(object_id)}, {"$set": upload_dict})
    return


# Login function
# validate, redirect_val, redirect_inval
def check_user_password(user):
    if check_password_hash(user["password"], request.form.get("password")):
        return True
    else:
        return False


# Checks if value exists in mongo
# is_form - Bool if informaion is from form
# Key - mongo's dict key
# From_value - Mongo dict value found in form
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


# mongo_cursor - cursor to pull dictionary entry with dict_key
# dict_key - dictionary key of item to check
# dict_value - dictionary value to update
def form_check_diff(mongo_cursor, dict_key, dict_value):
    if mongo_cursor[dict_key] != request.form.get(dict_value).lower():
        exist = check_mongo_user(True, dict_key, dict_value)
        if exist[0]:
            flash_mes = dict_key.title() + " already exists! Try Again!"
            flash(flash_mes)
            return False
    return True


def search_bool_return(search):
    recipes = list(enumerate(mongo.db.recipes.find(
        {search: {"$eq": True}},
        {"name": 1, "feature": 1, "created_by": 1, "time": 1,"lazy": 1, "grandparent": 1, "avatar": 1})))
    return recipes


# match#_cur - two cursors to compare values
# match#_dict - two keys used to compare values
# Takes two mongo cursors with keys and compares their values
# If values match match2_dict is added to a returned list
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
