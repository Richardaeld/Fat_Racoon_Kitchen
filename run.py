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


# Custom library made for this project
import rae
# --Sets Head Chef--
head_chef = "fat_raccoon"


app = Flask(__name__)


app.config["MONGO_DBNAME"] = os.environ.get("MONGO_DBNAME")
app.config["MONGO_URI"] = os.environ.get("MONGO_URI")
app.secret_key = os.environ.get("SECRET_KEY")


mongo = PyMongo(app)

# Returns Landing page 
@app.route("/", methods=("GET", "POST"))
def index():
    # --Loads-- head chef and all recipes from head chef
    chef = mongo.db.users.find_one({"username": head_chef})
    allRecipes = rae.search_mongo_recipes_no_bloat(
        "list", "created_by", head_chef)

    # --Loads-- features for carousel
    features = list(mongo.db.feature.find())

    # --Loads-- Index Card Carousel-- creates a list for each feature
    featureRecipes = []  # List for all recipes used
    featureRecipes = rae.match_mongo_cursors(features, "name", allRecipes, "feature")

    # --Loads-- Grandparent Classics--
    classicRecipes = rae.search_bool_return("grandparent")
    recipeHeader = rae.create_random_recipe_lists(3, classicRecipes)

    # -- Loads-- Random Recipe-
    recipeOfDay = rae.create_random_recipe_lists(0, allRecipes)

    return render_template(
        "index.html", features=features, randomRecipe=recipeOfDay,
        chef=chef, featureRecipes=featureRecipes, recipeHeader=recipeHeader)


# Logins user in or creates a new user account
@app.route("/login", methods=("GET", "POST"))
def login():
    if request.method == "POST" and request.form.get(
            "custom-button-login") == "Login":
        # Find user name and check password
        user = rae.check_mongo_user(True, "email", "email")
        if user[0]:
            password = rae.check_user_password(user[2])
        # Log user in or redirect
        if user[0] and password:
            session["user"] = request.form.get("email").lower()
            flash("Welcome back!")
            return redirect(url_for("profile", username=session['user']))
        else:
            flash("login credentials incorrect!")
            return redirect(url_for("index"))


    # ----------------------------------------------------------------------------------------I need to be made into a new create area but base.html and JS will need to be altered
    # --Create Account-- information
    if request.method == "POST" and request.form.get(
            "custom-button-login") == "Create":
        # Checks submitted info to be sure values are acceptiable
        username = rae.check_mongo_user(True, "name", "username")
        user_email = rae.check_mongo_user(True, "email", "email")

        if username and user_email:

            dictionary = {}
            rae.get_form_items(["username", "email"], dictionary, True)
            rae.create_new_password("password", "passwordCheck", dictionary)
            dictionary.update(dict(
                avatar=None, avatar_id=None, bio="", admin=False,
                recents=[], favorites=[], date=datetime.datetime.now()))
            print(dictionary)

            mongo.db.users.insert_one(dictionary)

            # Create new user account w/out avatar
            # rae.upload_user_info("new", False)
            # Create session for user name
            session["user"] = request.form.get("email").lower()
            flash("Welcome to the Fat Raccoon Family!")
            flash("Please take a moment to personaize your profile")
            return redirect(url_for("profile", username=session['user']))

        # redirects if email or username already exist
        else:
            flash("Login credentials are in correct")
            flash(username[1])
            return redirect(url_for("index"))


# Removes user's session
@app.route("/logout")
def logout():
    session.pop("user")
    flash("You've been logged out!")
    return redirect(url_for("index"))


# Returns users personal profile
@app.route("/profile", methods=("GET", "POST"))
def profile():
    user = rae.check_mongo_user(False, "email", session["user"])
    # --defensive code-- for deleted accouts
    if user[0]:
        # --Creates and Loads-- user uploaded recipe list with a date sort
        uploaded = list(enumerate(mongo.db.recipes.find(
            {"created_by": user[2]["username"]},
            {"name": 1}).sort("date", -1)))
        return render_template(
            "profile.html",
            chef_info=user[2], uploaded=uploaded,
            favorites=rae.create_user_recipe_list("favorites", user[2]),
            recents=rae.create_user_recipe_list("recents", user[2]))
    else:
        flash("Your session has ended please login again")
        session.pop("user")
        return redirect(url_for("index"))


# Changes favorite status of recipe and returns user to recipe's page
@app.route("/recipe/<recipeId>/<favoriteChange>", methods=("GET", "POST"))
def addFavorite(recipeId, favoriteChange):
    # --Loads-- Recipe, user, favorite info
    recipeInfo = mongo.db.recipes.find_one({"_id": ObjectId(recipeId)})
    userInfo = mongo.db.users.find_one({"email": session["user"]})
    favoriteChange = (
        rae.check_for_dups(userInfo["favorites"], recipeInfo["_id"]))[0]
    newFav = userInfo["favorites"]

    if favoriteChange:
        newFav.insert(0, recipeInfo["_id"])
        favoriteChange = True
    else:
        newFav.remove(recipeInfo["_id"])
        favoriteChange = False

    rae.update_mongo("user", userInfo["_id"], dict(favorites=newFav))
    return render_template(
        "recipe.html",
        recipeId=recipeInfo["_id"], recipeInfo=recipeInfo,
        favoriteRecipe=favoriteChange, recipeSteps=list(enumerate(recipeInfo["steps"])),
        userInfo=userInfo)


# Returns recipe and auto adjusts recent list for logged in users
@app.route("/recipe/<recipeId>", methods=("GET", "POST"))
def recipe(recipeId):
    # --Defensive-- Redirects incase recipe has been removed
    if mongo.db.recipes.find_one({"_id": ObjectId(recipeId)}) is None:
        flash("Sorry this recipe has been removed")
        return(redirect(url_for("profile")))

    # --Loads-- recipe to display
    recipeInfo = mongo.db.recipes.find_one({"_id": ObjectId(recipeId)})

    # --Defensive-- Sets blank values if user isnt signed in
    try:
        if session["user"]:
            # --Loads-- user information
            userInfo = mongo.db.users.find_one({"email": session['user']})

            # --Loads-- if recipe is favorite of user
            favoriteRecipe = not rae.check_for_dups(
                userInfo["favorites"], recipeInfo["_id"])[0]

            # --Creates-- Updated list for user recents
            non_dup = rae.check_for_dups(
                userInfo["recents"], recipeInfo["_id"])
            if non_dup[0]:
                findRecent = ([recipeInfo["_id"]] + userInfo["recents"])
            else:
                findRecent = userInfo["recents"]
                findRecent.remove(non_dup[1])
                findRecent.insert(0, non_dup[1])
            rae.update_mongo("user", userInfo["_id"], dict(recents=findRecent))

    except KeyError:
        favoriteRecipe = "None"
        userInfo = ""

    return render_template(
        "recipe.html",
        recipeInfo=recipeInfo, favoriteRecipe=favoriteRecipe,
        userInfo=userInfo, recipeSteps=list(enumerate(recipeInfo["steps"])))


# Code customized from Pretty Printed
# https://www.youtube.com/watch?v=DsgAuceHha4
# This allows picture to be uploaded
@app.route('/avatar/<avatar_image>')
def avatar(avatar_image):
    return mongo.send_file(avatar_image)


# Deletes user recipe
@app.route("/delete_recipe/<recipe_id>", methods=("GET", "POST"))
def delete_recipe(recipe_id):
    recipeInfo = mongo.db.recipe({"_id": ObjectId(recipe_id)})
    try:
        rae.delete_avatar(recipeInfo["avatar_id"])
    except KeyError:
        pass
    flashStr = "You've removed your recipe " + session["user"]
    flash(flashStr)
    mongo.db.recipes.delete_one({"_id": ObjectId(recipe_id)})
    return redirect(url_for("profile"))


# Returns a blank recipe or an existing recipe to edit
@app.route("/add_edit_recipe/<recipeId>", methods=("GET", "POST"))
def add_edit_recipe(recipeId):
    # --Loads-- user data
    userInfo = mongo.db.users.find_one({"email": session["user"]})

    # --Creates-- blanks for new recipe
    if (recipeId == "new"):
        recipeInfo = None
        recipeIngEnum = None
        recipeSteEnum = None
    # --Loads-- form with with existing recipe data
    else:
        if mongo.db.recipes.find_one(
                {"_id": ObjectId(recipeId)}, {"_id": 1}) is None:
            flash("Sorry this recipe has been removed")
            return(redirect(url_for("profile")))
        recipeInfo = (mongo.db.recipes.find_one({"_id": ObjectId(recipeId)}))
        recipeIngEnum = list(enumerate(recipeInfo["ingredients"]))
        recipeSteEnum = list(enumerate(recipeInfo["steps"]))

    # --Loads-- the select/option for feature
    features = mongo.db.feature.find()

    if request.method == "POST":
        # --Creates-- base dictionary, adds name, feature,
        # text, time, steps, ingredients, date, lazy, grandparent
        dictionary = {}
        rae.get_form_items(["name"], dictionary, True)
        rae.get_form_items(["feature", "text"], dictionary, False)
        rae.get_form_list(4, "time", "time", dictionary)
        rae.get_form_list(int(request.form.get("recipeStepsTotal")) + 1, "steps",  "recipeSteps-", dictionary)
        rae.get_form_list(int(request.form.get("recipeIngredientsTotal")) + 1, "ingredients", "recipeIngredients-", dictionary)
        dictionary["date"] = datetime.datetime.now()
        rae.get_form_bool(["lazy", "grandparent"], dictionary)

        # --Updates-- Avatar if new image present
        if request.form.get("avatar_file_valid") == 'true':
            rae.delete_avatar(recipeInfo["avatar_id"])
            dictionary.update(rae.create_avatar_dict(rae.upload_avatar()))

        # --Uploads-- dictionary depending on if its a new recipe or edit
        if recipeId == "new":
            dictionary["created_by"] = userInfo["username"]
            # Uploads to mongo and sets up to pull ID
            result = mongo.db.recipes.insert_one(dictionary)
            # Grabs ID of mongo upload for redirect
            uploadedId = result.inserted_id
        else:
            result = mongo.db.recipes.update_one(
                {"_id": ObjectId(recipeId)}, {'$set': dictionary})
            uploadedId = recipeId

        return redirect(url_for("recipe", recipeId=uploadedId))

    return render_template(
        "add_edit_recipe.html", features=features, recipeInfo=recipeInfo,
        recipeIngEnum=recipeIngEnum, recipeSteEnum=recipeSteEnum,
        admin=userInfo["admin"], recipeId=recipeId)


# Returns a page for users to edit their user info
@app.route("/profile/edit", methods=("GET", "POST"))
def edit_user_info():
    userInfo = mongo.db.users.find_one({"email": session["user"]})

    if request.method == "POST":
        # --Creates-- empty dictionary to add edit information to
        dictionary = {}

        # --Update/Validate-- username and email if different and validates
        if not rae.form_check_diff(userInfo, "username", "username") or (
                not rae.form_check_diff(userInfo, "email", "email")):
            return (redirect(url_for("edit_user_info")))

        # --Update-- if password confirm is blank
        if request.form.get("passwordCheck2") != "":
            dictionary["password"] = generate_password_hash(
                request.form.get("passwordCheck2"))

        # --Updates-- If password validates
        if rae.check_user_password(userInfo):
            flash("Profile updated successfully!")

            rae.get_form_items(["username", "email"], dictionary, True)
            rae.get_form_items(["bio"], dictionary, True)

            # --Updates-- Replaces Avatar w/ new image if present
            if request.form.get("avatar_file_valid") == 'true':
                print(userInfo["avatar_id"]) 
                rae.delete_avatar(userInfo["avatar_id"])
                dictionary.update(rae.create_avatar_dict(rae.upload_avatar()))

            print(dictionary)
            # --Uploads-- all new edit data dictionary to mongo DB
            rae.update_mongo("user", userInfo["_id"], dictionary)
            return(redirect(url_for("profile")))

        # --Validation/Error-- fails w/ error message
        else:
            flash("Current password does not match your login password")
            flash("Could not update your profile")
            return(redirect(url_for("edit_user_info")))

    return render_template("edit_user_info.html", userInfo=userInfo)


# Returns all recipes that match feature argument
@app.route("/recipe_list/<feature>")
def recipe_list(feature):
    allrecipes = list(mongo.db.recipes.find(
        {"feature": feature}, {"name": 1, "time": 1}))
    return render_template(
        "recipe_list.html",
        allrecipes=allrecipes, feature=feature)


# Retuens lessons page
@app.route("/lessons")
def lessons():
    return render_template("lessons.html")


# Returns all recipes paired by their feature
@app.route("/all_recipes")
def all_recipes():
    allFeatures = enumerate(mongo.db.feature.find({}))
    allRecipes = list(mongo.db.recipes.find(
        {}, {"name": 1, "feature": 1, "time": 1}))
    return render_template(
        "all_recipes.html",
        allFeatures=allFeatures, allRecipes=allRecipes)


# Returns a search based on lazy or grandparent bool
@app.route("/search_bool_returns/<search>", methods=("POST", "GET"))
def search_bool_returns(search):
    return render_template(
        "search_bar_returns.html",
        findRecipes=rae.search_bool_return(search))


# Returns a search based on user input for recipe name, feature, or chef name
@app.route("/search_bar_returns/", methods=("POST", "GET"))
def search_bar_returns():
    return render_template(
        "search_bar_returns.html",
        findRecipes=list(enumerate(mongo.db.recipes.find(
            {"$text": {"$search": request.form.get("userSearch")}},
            {"ingedients": 0, "steps": 0, "text": 0}))))


# Returns a search based on users favorites or recents
@app.route("/search_user_recipes/<search>", methods=("POST", "GET"))
def search_user_recipes(search):
    userInfo = rae.call_user()
    # Builds id dictionary to search mongo with
    findUserSelectedRecipes = {}
    findUserSelectedRecipes["$or"] = []
    for recipe in userInfo[search]:
        findUserSelectedRecipes["$or"].append({"_id": ObjectId(recipe)})

    return render_template(
        "search_bar_returns.html", findRecipes=list(enumerate(
            mongo.db.recipes.find(findUserSelectedRecipes))))


# Returns a search based on user's uploaded recipes
@app.route("/search_user_recipes", methods=("POST", "GET"))
def search_user_uploads():
    userInfo = rae.call_user()
    return render_template(
        "search_bar_returns.html", findRecipes=list(enumerate(
            mongo.db.recipes.find({"created_by": userInfo["username"]}, (
                {"ingedients": 0, "steps": 0, "text": 0})))))


if __name__ == "__main__":
    app.run(host=os.environ.get("IP"),
            port=int(os.environ.get("PORT")),
            debug=True)
