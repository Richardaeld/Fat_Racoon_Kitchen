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


@app.route("/", methods=("GET", "POST"))
def index():
    # --Sets Head Chef--
    headChef = "Fat_Raccoon"
    # --Counts and Loads-- total recipes from head chef
    chef = mongo.db.users.find_one({"username": headChef})
    allRecipes = list(mongo.db.recipes.find(
        {"created_by": headChef},
        {"name": 1, "feature": 1, "time": 1, "avatar": 1,
            "text": 1, "lazy": 1, "created_by": 1}))

    # --Loads-- features for carousel
    features = list(mongo.db.feature.find())

    # --Creates(function) a randomized list for display
    def create_random_recipe_lists(total_return, allRecipes):
        # In no recipes provided returns a empty list
        if len(allRecipes) == 0:
            return allRecipes
        return_list = []  # return list
        interimTotal = []  # holds random indexes
        if len(allRecipes) > 0:
            # keeps looping to find all or set number of recipes
            while True:
                # Builds a random number list
                randomRecipeIndex = random.randrange(1, len(allRecipes) + 1)
                # Gets numbers
                if len(interimTotal) > 0:
                    iteration = 1
                    for recipe in interimTotal:
                        # skip matching indexes
                        if randomRecipeIndex == recipe:
                            iteration += 1
                            break
                        # Add unique indexes to list
                        elif len(interimTotal) == iteration:
                            interimTotal += [randomRecipeIndex]
                        iteration += 1
                else:
                    interimTotal += [randomRecipeIndex]

                if len(interimTotal) > total_return or len(interimTotal) == len(allRecipes):
                    break

            # builds recipe list with random numbers
            iteration = 1
            for recipeNumber in interimTotal:
                for recipe in allRecipes:
                    if recipeNumber == iteration:
                        return_list += [recipe]
                        iteration = 1
                        break

                    iteration += 1
        return return_list

    # --Index Card Carousel-- creates a list for each feature ingredient
    featureRecipes = []  # List for all recipes used
    for feature in features:  # Loops through all features
        tempRecipes = []
        for recipe in allRecipes:  # Matches recipes with feature
            if(recipe["feature"] == feature["name"]):
                tempRecipes += [recipe]
        # Adds recipe/feature matches to list in random order
        featureRecipes += create_random_recipe_lists(2, tempRecipes)

    # --Grandparent Classics--
    classicRecipes = list(mongo.db.recipes.find(
        {"grandparent": True}, {"name": 1, "avatar": 1}))
    recipeHeader = create_random_recipe_lists(3, classicRecipes)

    # --Random Recipe--
    recipeOfDay = create_random_recipe_lists(0, allRecipes)

    # --Search-- for recipes
    # Returns a user search
    if request.method == "POST" and request.form.get("formType") == "search":
        print("Im a search function")
        return redirect(url_for(
            "search_bar_returns", search=request.form.get("userSearch")))

    # --Login-- information
    if request.method == "POST" and request.form.get(
            "custom-button-login") == "Login":
        print("Im a login and not a create function running")
        username = mongo.db.users.find_one(
            {"email": request.form.get("email").lower()})
        # If username exists, checks password
        if username:
            if check_password_hash(
                    username["password"], request.form.get("password")):
                session["user"] = request.form.get("email")
                flash("Welcome back!")
                return redirect(url_for("index"))
            else:
                flash("*meta password* Login credentials incorrect!")
                return redirect(url_for("index"))
        else:
            flash("*meta name*Login credentials incorrect!")

    # --Create Account-- information
    if request.method == "POST" and request.form.get(
            "custom-button-login") == "Create":
        print("Im a create function")

        # Check to be sure email doesnt already exist in DB
        userEmailTaken = mongo.db.users.find_one(
            {"email": request.form.get("email").lower()})
        if userEmailTaken:
            flash("This email was already taken!")
            return redirect(url_for("index"))

        # Check to be sure username doesnt already exist in DB
        userNameTaken = mongo.db.users.find_one(
            {"username": request.form.get("username")})
        if userNameTaken:
            flash("This username was already taken!")
            return redirect(url_for("index"))

        # Checks to be sure passwords match
        if request.form.get("password") != request.form.get("passwordCheck"):
            flash("Passwords do not match")
            return redirect(url_for("index"))

        # Gather form and blank information
        create = {
            "username": request.form.get("name"),
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
        mongo.db.users.insert_one(create)

        # Create session for user name
        session["user"] = request.form.get("email")
        flash("Welcome to the Fat Raccoon Family!")
        flash("Please take a moment to update your profile with a personaized bio and image")
        return redirect(url_for("profile", username=session['user']))

    return render_template(
        "index.html", features=features, randomRecipe=recipeOfDay,
        chef=chef, featureRecipes=featureRecipes, recipeHeader=recipeHeader)


# Removes user's session
@app.route("/logout")
def logout():
    # --Removes-- session for user
    session.pop("user")
    flash("You've been logged out!")
    return redirect(url_for("index"))


# Returns users personal profile
@app.route("/profile", methods=("GET", "POST"))
def profile():
    # --defensive code-- for deleted accouts
    chef = mongo.db.users.find_one({"email": session['user']})
    if chef is None:
        flash("Your session has ended please login again")
        session.pop("user")
        return redirect(url_for("index"))

    # --Loads-- user Info
    chef_info = mongo.db.users.find_one({"email": session['user']})

    # --Creates and Loads-- user uploaded recipe list with a date sort
    uploaded = list(enumerate(mongo.db.recipes.find(
        {"created_by": chef["username"]}, {"name": 1}).sort("date", -1)))

    # --Creates(function)-- lists for user favorites and recents
    # Keeps Items in order opposed to mongo "$or" operator
    def create_user_recipe_list(recent_fav):
        recipe_list = []
        if len(chef_info[recent_fav]) > 0:
            for recipe in chef_info[recent_fav]:
                recipe = mongo.db.recipes.find_one({"_id": ObjectId(recipe)})
                if recipe:
                    recipe_list += [[recipe["_id"], recipe["name"]]]
        recipe_list = list(enumerate(recipe_list))
        return (recipe_list)

    return render_template(
        "profile.html", chef_info=chef_info,
        uploaded=uploaded,
        favorites=create_user_recipe_list("favorites"),
        recents=create_user_recipe_list("recents"))


# Changes favorite status of recipe and returns user to recipe's page
@app.route("/recipe/<recipeId>/<favoriteChange>", methods=("GET", "POST"))
def addFavorite(recipeId, favoriteChange):
    # --Loads-- Recipe and user info
    recipeInfo = mongo.db.recipes.find_one({"_id": ObjectId(recipeId)})
    user = mongo.db.users.find_one({"email": session["user"]}, {
        "username": 1, "favorites": 1})
    chef = user["username"]

    # --Loads-- steps of recipe
    recipeSteps = list(enumerate(recipeInfo["steps"]))

    # --Updates-- string to boolean
    newFav = []
    if favoriteChange == "True":
        favoriteChange = True
    else:
        favoriteChange = False
        newFav += [recipeInfo["_id"]]

    checkFav = user["favorites"]
    # --Creates-- user favorite list to upload to DB
    # Removes any duplicated or unfavorited recipe
    for removeFav in checkFav:
        if removeFav == recipeInfo["_id"]:
            continue
        else:
            newFav += [removeFav]

    # --updates-- boolean to opposite value for return
    if favoriteChange:
        favoriteChange = False
    else:
        favoriteChange = True

    mongo.db.users.update_one(
        {"_id": user["_id"]},
        {"$set": {"favorites": newFav}})
    return render_template(
        "recipe.html",
        recipeId=recipeInfo["_id"], recipeInfo=recipeInfo,
        favoriteRecipe=favoriteChange, chef=chef, recipeSteps=recipeSteps)


# Returns recipe and auto adjusts recent list for logged in users
@app.route("/recipe/<recipeId>", methods=("GET", "POST"))
def recipe(recipeId):
    # --Defensive-- Redirects incase recipe has been removed
    if mongo.db.recipes.find_one({"_id": ObjectId(recipeId)}) is None:
        flash("Sorry this recipe has been removed")
        return(redirect(url_for("profile")))

    # --Loads-- recipe to display
    recipeInfo = mongo.db.recipes.find_one({"_id": ObjectId(recipeId)})

    # --Defensive-- Keeps page from crashing if user isnt signed in
    try:
        # --Loads-- Extra user signed in information
        if session["user"]:
            # --Loads-- user information
            userInfo = mongo.db.users.find_one({"email": session['user']})
            chef = userInfo['username']

            # --Loads/Updates-- if recipe is favorite of user
            if len(userInfo["favorites"]) == 0:
                favoriteRecipe = False
            favoriteRecipe = False
            for fav in userInfo["favorites"]:
                if fav == recipeInfo["_id"]:
                    favoriteRecipe = True
                    break

            # --Creates-- base list for user recents
            findRecent = []
            if len(userInfo["recents"]) == 0:
                findRecent = [recipeInfo["_id"]]
            else:
                findRecent = (
                    [recipeInfo["_id"]] + userInfo["recents"])

            # --Updates-- recents list by removing duplicates
            # and giving ceiling of 10 entries
            userRecentFinal = []
            for final in findRecent:
                checkPass = True
                if len(userRecentFinal) == 0:
                    userRecentFinal += [final]
                for check in userRecentFinal:
                    # Breaks when recent list is 10 entries
                    if len(userRecentFinal) > 9:
                        break
                    # Skips when dupicate
                    elif final == check:
                        checkPass = False
                        break
                    # Adds to list if passes other checks
                    elif check == userRecentFinal[-1] and checkPass is True:
                        userRecentFinal += [final]

            mongo.db.users.update_one(
                {"email": session["user"]},
                {"$set": {"recents": userRecentFinal}})

    # --Defensive-- Sets blank values if user isnt signed in
    except KeyError:
        favoriteRecipe = "None"
        chef = ""

    # --Loads-- steps of recipe
    recipeSteps = list(enumerate(recipeInfo["steps"]))

    # --Uploads-- Allows user to delete recipe
    if request.method == "POST":
        # Flash accepts a single string, not mutiple
        flashStr = "You've removed your recipe " + recipeInfo['name']
        flash(flashStr)
        mongo.db.recipes.delete_one({"_id": ObjectId(recipeInfo["_id"])})
        return redirect(url_for("profile"))

    return render_template(
        "recipe.html",
        recipeInfo=recipeInfo, favoriteRecipe=favoriteRecipe,
        chef=chef, recipeSteps=recipeSteps)


# Code customized from Pretty Printed
# https://www.youtube.com/watch?v=DsgAuceHha4
# This allows picture to be displayed
@app.route('/avatar/<avatar_image>')
def avatar(avatar_image):
    return mongo.send_file(avatar_image)


# Returns a blank recipe or prepopulates a recipe to edit
@app.route("/add_edit_recipe/<recipeId>", methods=("GET", "POST"))
def add_edit_recipe(recipeId):
    # --Loads-- user data
    admin = mongo.db.users.find_one({"email": session["user"]})

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
        # --Creates-- base dictionary and adds name and feature to dictionary
        upload_dict = {}
        upload_dict["name"] = request.form.get("recipeName")
        upload_dict["feature"] = request.form.get("feature")

        # --Creates-- list of times and adds to dictionary
        upload_dict["time"] = []
        for time in range(1, 4):
            upload_dict["time"].append(request.form.get("time" + str(time)))

        # --Creates-- list of steps and adds to dictionary
        upload_dict["steps"] = []
        for step in range(1, int(request.form.get("recipeStepsTotal")) + 1):
            upload_dict["steps"].append(
                request.form.get("recipeSteps-" + str(step)))

        # --Creates-- list of ingredents and adds to dictionary
        upload_dict["ingredients"] = []
        for ingredient in range(1, int(
                request.form.get("recipeIngredientsTotal")) + 1):
            upload_dict["ingredients"].append(
                request.form.get("recipeIngredients-" + str(ingredient)))

        # --Creates-- recipe description and datetime and adds to dictionary
        upload_dict["text"] = request.form.get("recipeDescription")
        upload_dict["date"] = datetime.datetime.now()

        # --Updates-- Avatar if new image present
        if request.form.get("avatar_file_valid") == 'true':
            if recipeId != "new":
                # Finds and deletes previous avatar in BOTH chunks and files
                delPrevImg = admin["avatar_id"]
                mongo.db.fs.chunks.delete_many(
                    {"files_id": ObjectId(delPrevImg)})
                mongo.db.fs.files.delete_many({"_id": ObjectId(delPrevImg)})

            # Code customized from Pretty Printed
            # https://www.youtube.com/watch?v=DsgAuceHha4
            avatar = request.files['avatar']
            # format filename and then file
            mongo.save_file(request.form.get("avatar_name"), avatar)
            imageDict = mongo.db.fs.files.find_one(
                {"filename": request.form.get("avatar_name")})
            upload_dict["avatar"] = request.form.get("avatar_name")
            upload_dict["avatar_id"] = imageDict["_id"]

        # --Creates-- lazy boolean value
        if request.form.get("lazy") == "True":
            upload_dict["lazy"] = True
        else:
            upload_dict["lazy"] = False

        # --Creates-- grandparent boolean value
        if request.form.get("grandparent") == "True":
            upload_dict["grandparent"] = True
        else:
            upload_dict["grandparent"] = False

        # --Uploads-- dictionary depending on if its a new recipe or edit
        if recipeId == "new":
            upload_dict["created_by"] = admin["username"]
            # Uploads to mongo and sets up to pull ID
            result = mongo.db.recipes.insert_one(upload_dict)
            # Grabs ID of mongo upload for redirect
            uploadedId = result.inserted_id
        else:
            # Grabs original chef name if admin edits recipe
            upload_dict["created_by"] = recipeInfo["created_by"]
            result = mongo.db.recipes.update_one(
                {"_id": ObjectId(recipeId)}, {'$set': upload_dict})
            uploadedId = recipeId

        return redirect(url_for("recipe", recipeId=uploadedId))

    return render_template(
        "add_edit_recipe.html", features=features, recipeInfo=recipeInfo,
        recipeIngEnum=recipeIngEnum, recipeSteEnum=recipeSteEnum,
        admin=admin["admin"], recipeId=recipeId)


# Returns a page for users to edit their user info
@app.route("/profile/edit", methods=("GET", "POST"))
def edit_user_info():
    userInfo = mongo.db.users.find_one({"email": session["user"]})

    # --Creates-- empty dictionary to add edit information to
    update_dict = {}

    if request.method == "POST":
        # --Update/Validate-- user name if different and validates
        if userInfo["username"] != request.form.get("usernameEdit"):
            # Checks if new user name is unique
            usernameCheck = mongo.db.users.find_one(
                {"username": request.form.get("usernameEdit")},
                {"username": 1})
            # Returns error if name is taken and redirects
            if usernameCheck is not None:
                flash("Username already exists! Try Again!")
                return(redirect(url_for("edit_user_info")))
            update_dict["username"] = request.form.get("usernameEdit")

        # --Update/Validate-- user email if different and validates
        if userInfo["email"] != request.form.get("emailEdit"):
            # Checks if new email is unique
            emailCheck = mongo.db.users.find_one(
                {"email": request.form.get("emailEdit")},
                {"email": 1})
            # Returns error if email is taken and redirects
            if emailCheck is not None:
                flash("Email already exists! Try Again!")
                return(redirect(url_for("edit_user_info")))
            update_dict["email"] = request.form.get("emailEdit")

        # --Update-- if password confirm is blank
        if request.form.get("passwordCheck2") != "":
            update_dict["password"] = generate_password_hash(
                request.form.get("passwordCheck2"))

        # --Update-- if bio is blank
        if userInfo["bio"] != request.form.get("bio"):
            update_dict["bio"] = request.form.get("bio")

        # --Validates-- current password before allowing changes to be made
        passwordCheck = check_password_hash(
            userInfo["password"], request.form.get('password'))

        # --Updates-- If password validates
        if (passwordCheck):
            flash("Profile updated successfully!")

            # --Updates-- Replaces Avatar w/ new image if present
            if request.form.get("avatar_file_valid") == 'true':
                # Finds and deletes previous avatar in BOTH chunks and files
                delPrevImg = userInfo["avatar_id"]
                mongo.db.fs.chunks.delete_many(
                    {"files_id": ObjectId(delPrevImg)})
                mongo.db.fs.files.delete_many({"_id": ObjectId(delPrevImg)})

                # Set save variable for new avatar
                # Code customized from Pretty Printed
                # https://www.youtube.com/watch?v=DsgAuceHha4
                avatar = request.files['avatar']

                # Saves new avatar format filename and then file
                mongo.save_file(request.form.get("avatar_name"), avatar)
                # Finds new save location for meta data fetch
                imageDict = mongo.db.fs.files.find_one(
                    {"filename": request.form.get("avatar_name")})
                # Adds Avatar information to update dictionary
                update_dict["avatar"] = request.form.get("avatar_name")
                update_dict["avatar_id"] = imageDict["id"]

            # --Uploads-- all new edit data dictionary to mongo DB
            mongo.db.users.update(
                {"_id": ObjectId(userInfo["_id"])}, {"$set": update_dict})
            return(redirect(url_for("profile")))

        # --Validation/Error-- If Password validation
        # fails redirect w/ error message
        elif (passwordCheck is False):
            flash("Current password does not match your login password")
            flash("Could not update your profile")
            return(redirect(url_for("edit_user_info")))

        # --Unknown/error-- If Unexpected unknown error
        # happens returns error and redirects
        else:
            flash("An unexpected error occurred!")
            flash("Please enter your information again!")
            return(redirect(url_for("edit_user_info")))

    return render_template("edit_user_info.html", userInfo=userInfo)


# Returns all recipes that have a feature in common
@app.route("/recipe_list/<feature>")
def recipe_list(feature):
    allrecipes = list(mongo.db.recipes.find(
        {"feature": feature}, {"name": 1, "time": 1}))
    return render_template(
        "recipe_list.html",
        allrecipes=allrecipes, feature=feature)


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


# Returns a search based on key words user uses, for: name, feature, or chef
@app.route("/search_bar_returns/<search>", methods=("POST", "GET"))
def search_bar_returns(search):
    # User's search
    displayRecipes = list(enumerate(
        mongo.db.recipes.find(
            {"$text": {"$search": search}},
            {"name": 1, "feature": 1, "created_by": 1, "time": 1})))
    return render_template(
        "search_bar_returns.html", findRecipes=displayRecipes)


# Returns a search based on users favorites, recents, or uploaded recipes
@app.route("/search_user_recipes/<search>", methods=("POST", "GET"))
def search_user_recipes(search):
    # Find User Info
    chef = mongo.db.users.find_one({
        "email": session["user"]},
        {"username": 1, "recents": 1, "favorites": 1})
    print(chef)
    # Pulls list from individual recipes
    if search == "uploaded":
        displayRecipes = list(enumerate(
            mongo.db.recipes.find(
                {"created_by": chef["username"]},
                {"name": 1, "feature": 1, "created_by": 1, "time": 1}).sort(
                    "date", -1)))

    else:
        # Selects if favorites or recent list
        search = chef[search]
        # Builds id dictionary to search mongo with
        findUserSelectedRecipes = {}
        findUserSelectedRecipes["$or"] = []
        for recipe in search:
            findUserSelectedRecipes["$or"].append({"_id": ObjectId(recipe)})
            # Find list of recipes user has favorites, created, or viewed

        displayRecipes = list(enumerate(
            mongo.db.recipes.find(findUserSelectedRecipes)))

    return render_template(
        "search_bar_returns.html", findRecipes=displayRecipes)


if __name__ == "__main__":
    app.run(host=os.environ.get("IP"),
            port=int(os.environ.get("PORT")),
            debug=True)
