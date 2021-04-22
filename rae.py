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
def check_for_dups(full_list, added_item):
    for dup_check in full_list:
        if dup_check == added_item:
            return False, added_item
        else:
            continue
    return True, added_item


# Builds randomized item list from random indexes
def random_list(random_index_list, item_list):
    iteration = 1
    return_random_list = []
    for random_index in random_index_list:
        for item in item_list:
            if random_index == iteration:
                return_random_list += [item]
                iteration = 1
                break
            iteration += 1
    return return_random_list


# Creates a randomized list
def create_random_recipe_lists(total_return, cursor_dict):
    random_indexes = []
    if len(cursor_dict) > 0:
        while True:
            non_dup = check_for_dups(
                random_indexes, get_random_number(len(cursor_dict)))
            if non_dup[0]:
                random_indexes += [non_dup[1]]
            if len(random_indexes) > total_return or (
                    len(random_indexes) == len(cursor_dict)):
                break
    return random_list(random_indexes, cursor_dict)


# Removes old avatar/image and adds new avatar to upload dictionary
def update_avatar(form_key, avatar_mongo_id, dictionary):
    if request.form.get(form_key) == 'true':
        delete_avatar(avatar_mongo_id)
        create_avatar_dict(upload_avatar(), dictionary)


# Deletes previous avatar/image
def delete_avatar(avatar_id):
    try:
        mongo.db.fs.chunks.delete_many({"files_id": ObjectId(avatar_id)})
        mongo.db.fs.files.delete_many({"_id": ObjectId(avatar_id)})
    except KeyError:
        pass


# Uploads new avatar/image
def upload_avatar():
    mongo.save_file(request.form.get("avatar_name"), request.files['avatar'])
    imageDict = mongo.db.fs.files.find_one(
        {"filename": request.form.get("avatar_name")})
    return request.form.get("avatar_name"), imageDict["_id"]


# avatar_tuple - avatar name[0], avatar id[1]
# Create avatar dictioanry
def create_avatar_dict(avatar_tuple, dictionary):
    dictionary.update(dict(avatar=avatar_tuple[0], avatar_id=avatar_tuple[1]))


# Checks user password against server hash
def check_user_password(user):
    try:
        if check_password_hash(user["password"], request.form.get("password")):
            return True
        else:
            return False
    except TypeError:
        return False


# Creates new hashed, unsalted password and adds to upload dictionary
def create_new_password(dict_key, form_key, dictioanry):
    dictioanry[dict_key] = generate_password_hash(
            request.form.get(form_key))


# Request bool from form and adds to upload dictionary
def get_form_bool(bool_request_list, dictionary):
    for item in bool_request_list:
        dictionary[item] = bool(request.form.get(item))


# [time, 0], [ingredients, 1], [steps, 1]
# # Pulls list from form and adds it to dictionary as list
def get_form_list(pull_list, dictionary):
    for item_list in pull_list:
        dictionary[item_list[0]] = []
        for item in range(1, (int(request.form.get(
                item_list[0] + "Total")) + int(item_list[1]))):
            dictionary[item_list[0]].append(str(
                request.form.get(item_list[0] + "-" + (str(item)))))


# Pulls multiple items from form and adds to dictionary
def get_form_items(pull_list, dictionary, is_lower):
    for item in pull_list:
        if is_lower:
            dictionary[item] = request.form.get(item).lower()
        else:
            dictionary[item] = request.form.get(item)


# Update mongo recipe/user info with $set operator and adds to dictionary
def update_mongo(
        recipe_user, object_id, dictionary):
    if recipe_user == "user":
        mongo.db.users.update_one(
            {"_id": ObjectId(object_id)}, {"$set": dictionary})
    elif recipe_user == "recipe":
        mongo.db.recipes.update_one(
            {"_id": ObjectId(object_id)}, {"$set": dictionary})


# Checks if user value exists in mongo
def check_mongo_user_unique(is_form, key, value):
    if is_form:
        exists = mongo.db.users.find_one(
            {key: request.form.get(value).lower()})
    else:
        exists = mongo.db.users.find_one(
            {key: value})
    if exists is not None:
        return False, value, exists
    else:
        return True, value, None


# Checks if recipe value exists in mongo
def check_mongo_recipe_exists(id):
    try:
        exists = mongo.db.recipes.find_one({"_id": ObjectId(id)})
    except ValueError:
        return False, id, None
    if exists is not None:
        return True, id, exists
    else:
        return False, id, None


# Checks if mongo information matches user's email or name
def check_diff_unique(mongo_cursor, key_list):
    for key in key_list:
        if mongo_cursor[key] != request.form.get(key).lower():
            exist = check_mongo_user_unique(True, key, key)
            if not exist[0]:
                flash(f"{key.title()} already exists! Try Again!")
                return False
    return True


# Mongo Search for Bool True with dictionary key
def search_bool_return(dict_key):
    recipes = list(enumerate(mongo.db.recipes.find(
        {dict_key: {"$eq": True}},
        {"ingedients": 0, "steps": 0, "text": 0})))
    return recipes


# Compares dictionary values of mongo cursors and adds second cursor item
# to output list if they match and then randomizes list
def match_mongo_cursors(cursor1, dict1, cursor2, dict2):
    return_list = []
    for match1 in cursor1:
        matched_list = [
            match2 for match2 in cursor2 if match2[dict2] == match1[dict1]]
        return_list += create_random_recipe_lists(2, matched_list)
    return return_list


# Gathers basic user info for user search
def call_user():
    return mongo.db.users.find_one({"email": session["user"]}, (
        {"username": 1, "recents": 1, "favorites": 1}))


# Checks if inputs are false and outputs false item
# boolean_list == [bool_value[0], item_name[1]]
def check_boolean(boolean_list):
    for item in boolean_list:
        if not item[0]:
            return False, item[1]
    return True, None
