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


# Sets Head Chef
headChef = "Fat_Raccoon"


mongo = PyMongo(app)


@app.route("/", methods=("GET", "POST"))
def index():


    # counts total recipes from specified chef -- AKA head chef
    totalRecipeCount = mongo.db.recipes.count_documents({"created_by": headChef})
    totalRecipes = list(mongo.db.recipes.find({"created_by": headChef}))

    # ---- For Dev -- updates all entries
    #findchange = mongo.db.recipes.find({"created_by": "asdfa@aol.com"})
    #for change in findchange:
    #    update = {
    #        "created_by": headChef
    #    }
    #    mongo.db.recipes.update_many({"_id": ObjectId(change["_id"])}, {"$set":  update})

    # ---- Loads quick meal ideas (carousel) feature items
    features = list(mongo.db.feature.find())

    # ---- Creates recipes found in carousel with a max of 3 recipes per card
    # Builds a list of recipes with matching feature
    featureRecipes = []
    for feature in features:
        recipeRandomTotal = []
        recipesWithFeature = []
        for recipe in totalRecipes:
            if recipe['feature'] == feature['name']:
                recipesWithFeature += [recipe]
        print(len(recipesWithFeature), feature['name']  )
        randomtotal = len(recipesWithFeature)

        # Build a set of random numbers to pull recipes
        # with matching features in a random order
        iteration = 1
        while True:
            if randomtotal == 0:
                break
            randomRecipeNumber = random.randrange(1, randomtotal + 1)
            if len(recipeRandomTotal) > 0:
                iteration = 1
                for recipeNumber in recipeRandomTotal:
                    if randomRecipeNumber == recipeNumber:
                        iteration += 1
                        break
                    elif len(recipeRandomTotal) == iteration:
                        recipeRandomTotal += [randomRecipeNumber]
                    iteration += 1
            else:
                recipeRandomTotal += [randomRecipeNumber]
            # breaks random number generation with conditions are met
            if len(recipeRandomTotal) >= 3 or len(recipeRandomTotal) == randomtotal:
                break

        # builds recipe list to be displayed in a random order
        iteration = 1
        for recipeNumber in recipeRandomTotal:
            for recipe in recipesWithFeature:
                if recipeNumber == iteration:
                    featureRecipes += [[recipe["feature"], recipe["name"], recipe["_id"]]]
                    iteration = 1
                    break
                iteration += 1

    # ---- Im grandmother classics
    # I add random grandmother classics
    recipeHeader = []
    recipeRandomTotal = []
    iteration = 1
    grandparentRecipeTotal = mongo.db.recipes.count_documents({"grandparent": True})
    if grandparentRecipeTotal > 0:
        grandparentRecipes = list(mongo.db.recipes.find({"grandparent": True}))

        # keeps looping to find all or set number of recipes
        while True:
            # Builds a random number list
            randomRecipe = random.randrange(1, grandparentRecipeTotal + 1)
            # Gets first number
            if len(recipeRandomTotal) > 0:
                iteration = 1
                for recipe in recipeRandomTotal:
                    if randomRecipe == recipe:
                        iteration += 1
                        break
                    elif len(recipeRandomTotal) == iteration:
                        recipeRandomTotal += [randomRecipe]
                    iteration += 1
            else:
                recipeRandomTotal += [randomRecipe]

            # breaks random number generation with conditions are met
            if len(recipeRandomTotal) > 3 or len(recipeRandomTotal) == grandparentRecipeTotal:
                break

        # builds recipe list with random numbers
        iteration = 1
        for recipeNumber in recipeRandomTotal:
            for recipe in grandparentRecipes:
                if recipeNumber == iteration:
                    recipeHeader += [recipe]
                    iteration = 1
                    break

                iteration += 1

    # Loads recipe of the day
    # prints a random recipe form speified chef
    recipeRandom = random.randrange(1, totalRecipeCount + 1)
    iteration = 1
    for recipe in totalRecipes:
        # Random selects recipe and loads its chef info
        if recipeRandom == iteration:
            recipeOfDay = recipe
            chef = mongo.db.users.find_one({"username": recipeOfDay["created_by"]})
            break
        iteration += 1

    # --Login-- information
    if request.method == "POST" and request.form.get("custom-button-login") == "Login":
        print("Im a login and not a create function running")
        userNameTaken = mongo.db.users.find_one({"email": request.form.get("email")})
        if userNameTaken:
            if check_password_hash(userNameTaken["password"], request.form.get("password")):
                session["user"] = request.form.get("email")
                flash("Welcome back!")
                return redirect(url_for("index"))
            else:
                flash("*meta password* Login credentials incorrect!")
                return redirect(url_for("index"))
        else:
            flash("*meta name*Login credentials incorrect!")

    # --Search for recipes
    # Returns a user search
    if request.method == "POST" and request.form.get("formType") == "search":
        print("Im a search function")
        return redirect(url_for("search_bar_returns", search=request.form.get("userSearch")))

    # --Create account-- information
    if request.method == "POST":
        print("Im a create function")

        # Check to be sure email doesnt already exist in DB
        userNameTaken = mongo.db.users.find_one({"email": request.form.get("email")})
        if userNameTaken:
            flash("This email was already taken!")
            return redirect(url_for("index"))

        # Check to be sure username doesnt already exist in DB
        userNameTaken = mongo.db.users.find_one({"email": request.form.get("username")})
        if userNameTaken:
            flash("This username was already taken!")
            return redirect(url_for("index"))

        # Checks to be sure passwords match
        if request.form.get("password") != request.form.get("passwordCheck"):
            flash("Passwords do not match")
            return redirect(url_for("index"))

        # Gather form information and submit to DB
        create = {
            "username": request.form.get("name"),
            "email": request.form.get("email").lower(),
            "password": generate_password_hash(request.form.get("passwordCheck")),
            "avatar": None,
            "avatar_id": None,
            "bio": "",
            "admin": False,
            "recent": [],
            "favorites": [],
            # "submitted": [],
            "date": datetime.datetime.now()
        }
        mongo.db.users.insert_one(create)

        # Create session for user name
        session["user"] = request.form.get("email")
        flash("Welcome to the Fat Raccoon Family!")
        flash("Please take a moment to update your profile with a personaized bio and image")
        return redirect(url_for("profile", username=session['user']))

    return render_template(
        "index.html", features=features, recipeOfDay=recipeOfDay,
        chef=chef, featureRecipes=featureRecipes, recipeHeader=recipeHeader)


@app.route("/logout")
def logout():
    # Removes session for user
    session.pop("user")
    flash("You've been logged out!")
    return redirect(url_for("index"))


@app.route("/profile", methods=("GET", "POST"))
def profile():
    # defensive code for deleted accouts
    userExists = mongo.db.users.find_one({"email": session['user']})
    if userExists is None:
        flash("Your session has ended please login again")
        session.pop("user")
        return redirect(url_for("index"))

    # Loads user Info
    chef_info = mongo.db.users.find_one({"email": session['user']})

    # Find Chef submitted recipies, change them into
    # a list, and give each iteration a number
    submitteds = []
    submittedAll = mongo.db.recipes.find({"created_by": session["user"]})
    for submitted in submittedAll:
        submitteds += [[submitted["_id"], submitted["name"]]]
    submitteds = list(enumerate(submitteds))

    # Creates list of recipes to display
    def create_user_recipe_list(recent_fav):
        recipe_list = []
        if len(chef_info[recent_fav]) > 0:
            for rec in chef_info[recent_fav]:
                rec = mongo.db.recipes.find_one({"_id": ObjectId(rec)})
                if rec:
                    recipe_list += [[rec["_id"], rec["name"]]]
        recipe_list = list(enumerate(recipe_list))
        return (recipe_list)

    return render_template(
        "profile.html", chef_info=chef_info,
        submitteds=submitteds,
        favorites=create_user_recipe_list("favorites"),
        recents=create_user_recipe_list("recents"))


@app.route("/recipe/<recipeId>/<favoriteChange>", methods=("GET", "POST"))
def addFavorite(recipeId, favoriteChange):
    recipeInfo = mongo.db.recipes.find_one({"_id": ObjectId(recipeId)})
    user = mongo.db.users.find_one({"email": session["user"]})
    chef = user["username"]
    # Changes string to boolean
    if favoriteChange == "True":
        favoriteChange = True
    else:
        favoriteChange = False

    # Creates user favorite list to upload to DB
    if favoriteChange:
        newFav = []
        changeFav = user["favorites"]
        for fav in changeFav:
            if fav == recipeInfo["_id"]:
                continue
            else:
                newFav += [fav]
        favoriteChange = False
    else:
        newFav = user["favorites"] + [recipeInfo["_id"]]
        favoriteChange = True

    mongo.db.users.update_one(
        {"_id": user["_id"]},
        {"$set": {"favorites": newFav}})
    return render_template(
        "recipe.html",
        recipeId=recipeInfo["_id"], recipeInfo=recipeInfo,
        favoriteRecipe=favoriteChange, chef=chef)


@app.route("/recipe/<recipeId>", methods=("GET", "POST"))
def recipe(recipeId):
    # place me better--------------
    chef = ""

    # Redirects incase recipe has been removed
    if mongo.db.recipes.find_one({"_id": ObjectId(recipeId)}) is None:
        flash("Sorry this recipe has been removed")
        return(redirect(url_for("profile")))

    # Finds recipe to display
    recipeInfo = mongo.db.recipes.find_one({"_id": ObjectId(recipeId)})
    # Find if recipe is favorite and adds recipes
    # to a previously viewed list for signed in users
    try:
        if session["user"]:
            # Finds and sets user chef id
            chef = mongo.db.users.find_one({"email": session['user']})
            chef = chef['username']
            # Updates user recents list
            findUserRecents = (
                mongo.db.users.find_one(
                    {"email": session["user"]}))

            # determine if recipe is favorited
            favorited = findUserRecents["favorites"]
            if len(favorited) == 0:
                favoriteRecipe = False
            favoriteRecipe = False
            for fav in favorited:
                if fav == recipeInfo["_id"]:
                    favoriteRecipe = True
                    break

            # Creates base list for user recent
            if len(findUserRecents["recents"]) == 0:
                findUserRecents = [recipeInfo["_id"]]
            else:
                findUserRecents = (
                    [recipeInfo["_id"]] + findUserRecents["recents"])

            # Iterates through checking for duplicates to remove
            # For outer Loop
            userRecentFinal = []
            for final in findUserRecents:
                checkPass = True
                if len(userRecentFinal) == 0:
                    userRecentFinal += [final]
                # Check for duplicates and remove them
                for check in userRecentFinal:
                    # Im idiot prevention -- can remove post development
                    if len(userRecentFinal) > 10:
                        break
                    elif final == check:
                        checkPass = False
                        break
                    elif check == userRecentFinal[-1] and checkPass is True:
                        userRecentFinal += [final]

            mongo.db.users.update_one(
                {"email": session["user"]},
                {"$set": {"recents": userRecentFinal}})

    # For a missing session user
    except KeyError:
        favoriteRecipe = "None"

    # Counts steps of recipe
    recipeSteps = list(enumerate(recipeInfo["steps"]))

    # Allows admin or user to delete recipe
    if request.method == "POST":
        # Flash accepts a single string, not combined inline
        flashStr = "You've removed your recipe " + recipeInfo['name']
        flash(flashStr)
        mongo.db.recipes.delete_one({"_id": ObjectId(recipeInfo["_id"])})
        return redirect(url_for("profile"))

    return render_template(
        "recipe.html",
        recipeInfo=recipeInfo, favoriteRecipe=favoriteRecipe, chef=chef, recipeSteps=recipeSteps)


# Code customized from Pretty Printed
# https://www.youtube.com/watch?v=DsgAuceHha4
# This allows picture to be displayed
@app.route('/avatar/<avatar_image>')
def avatar(avatar_image):
    return mongo.send_file(avatar_image)


@app.route("/add_edit_recipe/<recipeId>", methods=("GET", "POST"))
def add_edit_recipe(recipeId):
    # Finds user data
    admin = mongo.db.users.find_one({"email": session["user"]})

    # if editing recipe, populate the page with recipe information
    # if gets all existing recipe information
    # else populates blanks
    if (recipeId == "new"):
        recipeInfo = None
        recipeIngEnum = None
        recipeSteEnum = None
    else:
        if mongo.db.recipes.find_one({"_id": ObjectId(recipeId)}) is None:
            flash("Sorry this recipe has been removed")
            return(redirect(url_for("profile")))
        recipeInfo = (mongo.db.recipes.find_one({"_id": ObjectId(recipeId)}))
        recipeIngEnum = list(enumerate(recipeInfo["ingredients"]))
        recipeSteEnum = list(enumerate(recipeInfo["steps"]))

    # Generates the select/option for meal feature
    features = mongo.db.feature.find()

    if request.method == "POST":
        # Creates base dictionary and adds name and feature
        upload_dict = {}  #current 636 see if less using this method
        upload_dict["name"] = request.form.get("recipeName")
        upload_dict["feature"] = request.form.get("feature")

        # Creates list of times and adds to dictionary
        upload_dict["time"] = []
        for time in range(1, 4):
            upload_dict["time"].append(request.form.get("time" + str(time)))

        # Creates list of steps and adds to dictionary
        upload_dict["steps"] = []
        for step in range(1, int(request.form.get("recipeStepsTotal")) + 1):
            upload_dict["steps"].append(request.form.get("recipeSteps-" + str(step)))

        # Creates list of ingredents and adds to dictionary
        upload_dict["ingredients"] = []
        for ingredient in range(1, int(request.form.get("recipeIngredientsTotal")) + 1):
            upload_dict["ingredients"].append(request.form.get("recipeIngredients-" + str(ingredient)))

        # Adds recipe description and datetime to dictionary
        upload_dict["text"] = request.form.get("recipeDescription")
        upload_dict["date"] = datetime.datetime.now()

        # Replaces Avatar if new image present
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
            imageDict = mongo.db.fs.files.find_one({"filename": request.form.get("avatar_name")})
            upload_dict["avatar"] = request.form.get("avatar_name")
            upload_dict["avatar_id"] = imageDict["_id"]

        # Sets lazy value
        if request.form.get("lazy") == "True":
            upload_dict["lazy"] = True
        else:
            upload_dict["lazy"] = False

        # Sets grandparent value
        if request.form.get("grandparent") == "True":
            upload_dict["grandparent"] = True
        else:
            upload_dict["grandparent"] = False

        # Uploads dictionary depending on if its a new recipe or edit
        if recipeId == "new":
            upload_dict["created_by"] = admin["username"]
            # Uploads to mongo and sets up to pull ID
            result = mongo.db.recipes.insert_one(upload_dict)
            # Grabs ID of mongo upload
            uploadedId = result.inserted_id
        else:
            upload_dict["created_by"] = recipeInfo["created_by"]
            result = mongo.db.recipes.update_one(
                {"_id": ObjectId(recipeId)}, {'$set': upload_dict})
            uploadedId = recipeId

        return redirect(url_for("recipe", recipeId=uploadedId))

    return render_template(
        "add_edit_recipe.html", features=features, recipeInfo=recipeInfo,
        recipeIngEnum=recipeIngEnum, recipeSteEnum=recipeSteEnum,
        admin=admin["admin"], recipeId=recipeId)


@app.route("/profile/edit", methods=("GET", "POST"))
def edit_user_info():
    userInfo = mongo.db.users.find_one({"email": session["user"]})

    # Creates empty dictionary to add edit information to
    update_dict = {}

    if request.method == "POST":
        if userInfo["username"] != request.form.get("usernameEdit"):
            # Checks for validation
            # Checks to be sure this username is not taken or
            # returns with user error message
            usernameCheck = mongo.db.users.find_one(
                {"username": request.form.get("usernameEdit")})
            if usernameCheck is not None:
                flash("Username already exists! Try Again!")
                return(redirect(url_for("edit_user_info")))
            # Passes validation so adds to update dictionary
            update_dict["username"] = request.form.get("usernameEdit")

        # checks for new email and validates if new email exists
        if userInfo["email"] != request.form.get("emailEdit"):
            # Checks for validation
            # Checks to be sure this email is not taken or
            # returns with user error message
            emailCheck = mongo.db.users.find_one(
                {"email": request.form.get("emailEdit")})
            if emailCheck is not None:
                flash("Email already exists! Try Again!")
                return(redirect(url_for("edit_user_info")))
            # Passes validation so adds to update dictionary
            update_dict["email"] = request.form.get("emailEdit")

        if request.form.get("passwordCheck2") != "":
            update_dict["password"] = generate_password_hash(
                request.form.get("passwordCheck2"))

        if userInfo["bio"] != request.form.get("bio"):
            update_dict["bio"] = request.form.get("bio")

        # Validates current password before allowing changes to be made
        passwordCheck = check_password_hash(
            userInfo["password"], request.form.get('password'))

        # If all checks pass uploads new profile data to DB
        if (passwordCheck):
            flash("Profile updated successfully!")

            # Replaces Avatar if new image present
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

            mongo.db.users.update(
                {"_id": ObjectId(userInfo["_id"])}, {"$set": update_dict})
            print(update_dict)
            return(redirect(url_for("profile")))

        # Password validation fail
        elif (passwordCheck is False):
            flash("Current password does not match your login password")
            flash("Could not update your profile")
            return(redirect(url_for("edit_user_info")))

        # Unexpected unknown error
        else:
            flash("An unexpected error occurred!")
            flash("Please enter your information again!")
            return(redirect(url_for("edit_user_info")))

    return render_template("edit_user_info.html", userInfo=userInfo)


@app.route("/recipe_list/<feature>")
def recipe_list(feature):
    allrecipes = list(mongo.db.recipes.find({"feature": feature}))
    return render_template(
        "recipe_list.html",
        allrecipes=allrecipes, feature=feature)


@app.route("/lessons")
def lessons():
    return render_template("lessons.html")


@app.route("/all_recipes")
def all_recipes():
    allFeatures = enumerate(mongo.db.feature.find({}))
    allRecipes = list(mongo.db.recipes.find({}))
    return render_template(
        "all_recipes.html",
        allFeatures=allFeatures, allRecipes=allRecipes)


@app.route("/search_bar_returns/<search>", methods=("POST", "GET"))
def search_bar_returns(search):
    # User's search
    displayRecipes = list(enumerate(
        mongo.db.recipes.find({"$text": {"$search": search}})))
    return render_template(
        "search_bar_returns.html", findRecipes=displayRecipes)


@app.route("/search_user_recipes/<search>", methods=("POST", "GET"))
def search_user_recipes(search):

    if search == "False":
        displayRecipes = ""
    else:
        # Compile dictionary from user favorites, created, or viewed recipes
        findUserSelectedRecipes = {}
        findUserSelectedRecipes["$or"] = []
        for recipe in search.strip('[]"').split("'"):
            if recipe.find("O") == -1 and recipe.find(")") == -1:
                findUserSelectedRecipes["$or"].append(
                    {"_id": ObjectId(recipe)})

            # Find list of recipes user has favorites, created, or viewed
            displayRecipes = list(enumerate(
                mongo.db.recipes.find(findUserSelectedRecipes)))
    return render_template(
        "search_bar_returns.html", displayRecipes=displayRecipes)


if __name__ == "__main__":
    app.run(host=os.environ.get("IP"),
            port=int(os.environ.get("PORT")),
            debug=True)
