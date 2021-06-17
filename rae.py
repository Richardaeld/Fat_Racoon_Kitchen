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


# Validates images
def validate_image():
    file = request.files["avatar"]
    filename = file.content_type
    if not filename.endswith("stream"):
        if filename.endswith("jpg") or filename.endswith("jpeg") or (
                filename.endswith("png")):
            return True
        else:
            flash("Image is incorrect format, please use jpg, jpeg, or png")
            return False
    return True


# Compares password and password check
def password_confirm(dictionary):
    print(request.form.get("passwordCheck2"))
    if validate_list([["passwordCheck2", "no_space", 8, 20, "password"]]):
        if request.form.get(
                "passwordCheck2") == request.form.get("passwordCheck1"):
            create_new_password("password", "passwordCheck2", dictionary)
            return True
        else:
            flash("Confirm password doesnt match")
            return False
    else:
        return False


# Validation types
def validation_type(validation):
    alpha = "abcdefghijklmnopqrstuvwxyz"
    numeric = "1234567890"
    special = "!@#%&*_+-=?.'/"
    text = ',"'
    if validation == "no_space":
        val_type = alpha + alpha.upper() + numeric + special
    if validation == "space":
        val_type = alpha + alpha.upper() + numeric + special + " "
    if validation == "text":
        val_type = alpha + alpha.upper() + numeric + special + text + " "
    return val_type


# Validate user string
def acceptable_input(user_input, val_type, min_char, max_char, error):
    print(user_input, val_type, min_char, max_char, error)
    if len(user_input) < min_char or len(user_input) > max_char:
        flash(f"{error} has incorrect number of characters")
        return False
    if val_type == "numeric" and not user_input.isnumeric():
        flash("Must contain only whole positive numbers")
        return False
    for inputCheck in user_input:
        accepted_char = validation_type(val_type)
        for acceptCheck in accepted_char:
            if inputCheck == acceptCheck:
                break
            elif acceptCheck == accepted_char[-1]:
                flash(
                    f"{error.title()} has incorrect character, '{inputCheck}'")
                return False
    return True


# List call validator
# form, val_type, min_char, max_char, error,
def validate_list(val_list):
    for validate in val_list:
        if not acceptable_input(request.form.get(validate[0]), validate[1], (
                validate[2]), validate[3], validate[4]):
            return False
        if validate[0] == "email":
            user_email = request.form.get(validate[0])
            if not user_email.endswith(".com") and (
                    not user_email.endswith(".edu")) and (
                    not user_email.endswith(".net")) and (
                    not user_email.endswith(".org")):
                flash("inappropiate email suffix")
                return False
            if user_email.find("@") == -1:
                flash("missing @")
                return False
    return True


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
            flash("Incorrect password")
            return False
    except TypeError:
        return False


# Creates new hashed, unsalted password and adds to upload dictionary
def create_new_password(dict_key, form_key, dictioanry):
    dictioanry[dict_key] = generate_password_hash(
            request.form.get(form_key))


# [time, 0], [ingredients, 1], [steps, 1]
# # Pulls list from form and adds it to dictionary as list
def get_form_list(pull_list, dictionary):
    for item_list in pull_list:
        dictionary[item_list[0]] = []
        for num in range(1, (int(request.form.get(
                item_list[0] + "Total")) + int(item_list[1]))):
            user_input = str(request.form.get(item_list[0] + "-" + str(num)))
            if item_list[0] == "time" and not user_input.isnumeric():
                flash("Times were not all numeric")
                return False
            elif item_list[0] != "time" and not acceptable_input(
                    user_input, "text", 0, 400, "recipe" + item_list[0]):
                return False
            # Removes blank entries
            if user_input != "" and not user_input.isspace():
                dictionary[item_list[0]].append(user_input)
    return True


# Pulls multiple items from form and adds to dictionary
# input_list = [form_dict, is_lower_bool, is_bool], dictionary
def get_form_items(user_input, dictionary):
    for list_item in user_input:
        if list_item[1]:
            dictionary[list_item[0]] = request.form.get(
                list_item[0]).lower()
        elif not list_item[1] and not list_item[2]:
            dictionary[list_item[0]] = request.form.get(list_item[0])
        elif list_item[2]:
            dictionary[list_item[0]] = bool(request.form.get(list_item[0]))


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
