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


# create a random number
def get_random_number(total_numbers):
    return random.randrange(1, total_numbers + 1)


# Remove Duplicate
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


# Creates/Edits user information
def upload_user_info(update_type, avatar):
    # Gather form and blank information
    user_info = {
        "username": request.form.get("name").lower(),
        "email": request.form.get("email").lower(),
        "password": generate_password_hash(
            request.form.get("passwordCheck")),
        "avatar": None,
        "avatar_id": None,
        "bio": "",
        "admin": False,
        "recents": [],
        "favorites": [],
        "date": datetime.datetime.now()
    }

    if update_type:
        mongo.db.users.insert_one(user_info)

    else:
        print("Im an edit")


# Update mongo info
def update_mongo(recipe_user, object_id, dict_key, dict_value):
    if recipe_user == "user":
        mongo.db.users.update_one(
            {"_id": ObjectId(object_id)},
            {"$set": {dict_key: dict_value}})
    return


# Login function
# validate, redirect_val, redirect_inval
def check_user_password(user):
    # If username exists, checks password
    if user:
        if check_password_hash(user["password"], request.form.get("password")):
            return True
        else:
            return False
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


def search_bool_return(search):
    recipes = list(enumerate(mongo.db.recipes.find(
        {search: {"$eq": True}},
        {"name": 1, "feature": 1, "created_by": 1, "time": 1,"lazy": 1, "grandparent": 1, "avatar": 1})))
    return recipes


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
