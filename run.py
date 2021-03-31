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
    # Sets Head Chef
    headChef = "Fat_Raccoon"

    # counts total recipes from specified chef -- AKA head chef
    chef = mongo.db.users.find_one({"username": headChef})
    totalRecipeCount = mongo.db.recipes.count_documents(
        {"created_by": headChef})
    totalRecipes = list(mongo.db.recipes.find({"created_by": headChef},{"name": 1, "feature": 1, "time": 1, "avatar":1, "grandparent": 1, "lazy": 1, "created_by": 1}))

    # ---- For Dev -- updates all entries
    #findchange = mongo.db.recipes.find({"created_by": "asdfa@aol.com"})
    #for change in findchange:
    #    update = {
    #        "created_by": headChef
    #    }
    #    mongo.db.recipes.update_many({"_id": ObjectId(change["_id"])}, {"$set":  update})

    # ---- Loads quick meal ideas (carousel) features
    features = list(mongo.db.feature.find())

    # for grandparent call
    # allRecipes = list(mongo.db.recipes.count_documents({"grandparent": True}))
    # create_random_recipe_lists("whole_recipe", 3, allrecipes)
    def create_random_recipe_lists(multiple_lists, total_return, allRecipes):
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

                # breaks random number generation with conditions are met
                # print(len(interimTotal), " ",   total_return)
                # print("--------------------------------------")
                # print(len(interimTotal), " ", len(allRecipes))
                # print("========================================")
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
    # ---------------------------------------------------------------------------
    #I print out grandparent classics
    allRecipes = list(mongo.db.recipes.find({"grandparent": True}))
    recipeHeader = create_random_recipe_lists(False, 3, allRecipes)

    #allRecipes = list(mongo.db.recipes.find({"created_by": headChef})) #----Im a duplicate!!
    # featureRecipes = create_random_recipe_lists(True, 2, allRecipes) #-----whole recipe can be removed
    allRecipes = totalRecipes
    featureRecipes = []
    for feature in features:
        tempRecipes = []
        for recipe in allRecipes:
            if(recipe["feature"] == feature["name"]):
    #             # use feature to call mongodb lists
                tempRecipes += [recipe]

        featureRecipes += create_random_recipe_lists(feature["name"], 2, tempRecipes)
        # print(create_random_recipe_lists(feature["name"], 1, tempRecipes))

    print(featureRecipes)
    # print(featureRecipes)
    # allRecipes = list(mongo.db.recipes.find({"created_by": headChef})) #----Im a duplicate!!

    #I print out recipe of day
    allrecipes = totalRecipes
    recipeOfDay = create_random_recipe_lists(False, 0, allRecipes)

    print(recipeOfDay)

    # # ---- Creates recipes found in carousel with a max of 3 recipes per card
    # # Builds a list of recipes with matching feature
    # featureRecipes = []
    # for feature in features:
    #     recipeRandomTotal = []
    #     recipesWithFeature = []
    #     for recipe in totalRecipes:
    #         if recipe['feature'] == feature['name']:
    #             recipesWithFeature += [recipe]
    #     print(len(recipesWithFeature), feature['name'])
    #     randomtotal = len(recipesWithFeature)

    #     # Build a set of random numbers to pull recipes
    #     # with matching features in a random order
    #     iteration = 1
    #     while True:
    #         if randomtotal == 0:
    #             break
    #         randomRecipeNumber = random.randrange(1, randomtotal + 1)
    #         if len(recipeRandomTotal) > 0:
    #             iteration = 1
    #             for recipeNumber in recipeRandomTotal:
    #                 if randomRecipeNumber == recipeNumber:
    #                     iteration += 1
    #                     break
    #                 elif len(recipeRandomTotal) == iteration:
    #                     recipeRandomTotal += [randomRecipeNumber]
    #                 iteration += 1
    #         else:
    #             recipeRandomTotal += [randomRecipeNumber]
    #         # breaks random number generation with conditions are met
    #         if len(recipeRandomTotal) >= 3 or len(
    #                 recipeRandomTotal) == randomtotal:
    #             break

    #     # builds recipe list to be displayed in a random order
    #     iteration = 1
    #     for recipeNumber in recipeRandomTotal:
    #         for recipe in recipesWithFeature:
    #             if recipeNumber == iteration:
    #                 featureRecipes += (
    #                     [[recipe["feature"], recipe["name"], recipe["_id"]]])
    #                 iteration = 1
    #                 break
    #             iteration += 1

    # # ---- Im grandmother classics
    # # I add random grandmother classics
    # recipeHeader = []
    # recipeRandomTotal = []
    # iteration = 1
    # grandparentRecipeTotal = mongo.db.recipes.count_documents(
    #     {"grandparent": True})
    # if grandparentRecipeTotal > 0:
    #     grandparentRecipes = list(mongo.db.recipes.find({"grandparent": True}))

    #     # keeps looping to find all or set number of recipes
    #     while True:
    #         # Builds a random number list
    #         randomRecipe = random.randrange(1, grandparentRecipeTotal + 1)
    #         # Gets first number
    #         if len(recipeRandomTotal) > 0:
    #             iteration = 1
    #             for recipe in recipeRandomTotal:
    #                 if randomRecipe == recipe:
    #                     iteration += 1
    #                     break
    #                 elif len(recipeRandomTotal) == iteration:
    #                     recipeRandomTotal += [randomRecipe]
    #                 iteration += 1
    #         else:
    #             recipeRandomTotal += [randomRecipe]

    #         # breaks random number generation with conditions are met
    #         if len(recipeRandomTotal) > 3 or len(
    #                 recipeRandomTotal) == grandparentRecipeTotal:
    #             break

    #     # builds recipe list with random numbers
    #     iteration = 1
    #     for recipeNumber in recipeRandomTotal:
    #         for recipe in grandparentRecipes:
    #             if recipeNumber == iteration:
    #                 recipeHeader += [recipe]
    #                 iteration = 1
    #                 break

    #             iteration += 1

    # # prints a random recipe form head chef
    # recipeRandom = random.randrange(1, totalRecipeCount + 1)
    # iteration = 1
    # for recipe in totalRecipes:
    #     # Random selects recipe and loads its chef info
    #     if recipeRandom == iteration:
    #         recipeOfDay = recipe
    #         break
    #     iteration += 1

    # --Search for recipes
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
            {"email": request.form.get("email")})
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

    # --Create account-- information
    if request.method == "POST":
        print("Im a create function")

        # Check to be sure email doesnt already exist in DB
        userNameTaken = mongo.db.users.find_one(
            {"email": request.form.get("email")})
        if userNameTaken:
            flash("This email was already taken!")
            return redirect(url_for("index"))

        # Check to be sure username doesnt already exist in DB
        userNameTaken = mongo.db.users.find_one(
            {"email": request.form.get("username")})
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
    # Removes session for user
    session.pop("user")
    flash("You've been logged out!")
    return redirect(url_for("index"))


# Returns users personal profile
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

    # Find recipies submitted by this user, change them into
    # a list, and give each iteration a number
    submitteds = []
    submittedAll = mongo.db.recipes.find({"created_by": session["user"]})
    for submitted in submittedAll:
        submitteds += [[submitted["_id"], submitted["name"]]]
    submitteds = list(enumerate(submitteds))

    # Creates list of recipes to display
    # Used with favorite and recent recipes lists
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
        submitteds=submitteds,
        favorites=create_user_recipe_list("favorites"),
        recents=create_user_recipe_list("recents"))


# Chaanges favorite status of recipe and returns user to recipe's page
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
        # removes an unfavorited recipe
        for fav in changeFav:
            if fav == recipeInfo["_id"]:
                continue
            else:
                newFav += [fav]
        favoriteChange = False
    # Adds new favorite recipe
    else:
        newFav = [recipeInfo["_id"]] + user["favorites"]
        favoriteChange = True

    mongo.db.users.update_one(
        {"_id": user["_id"]},
        {"$set": {"favorites": newFav}})
    return render_template(
        "recipe.html",
        recipeId=recipeInfo["_id"], recipeInfo=recipeInfo,
        favoriteRecipe=favoriteChange, chef=chef)


# Returns recipe and auto adjusts recent list for logged in users
@app.route("/recipe/<recipeId>", methods=("GET", "POST"))
def recipe(recipeId):
    # Redirects incase recipe has been removed
    if mongo.db.recipes.find_one({"_id": ObjectId(recipeId)}) is None:
        flash("Sorry this recipe has been removed")
        return(redirect(url_for("profile")))

    # Finds recipe to display
    recipeInfo = mongo.db.recipes.find_one({"_id": ObjectId(recipeId)})
    # If user is singed in, finds recipe favorite status and
    # adds recipe to user previously viewed list
    try:
        if session["user"]:
            # Finds and sets user chef id
            chef = mongo.db.users.find_one({"email": session['user']})
            chef = chef['username']

            # For updating favorite and user recents list
            findRecentFav = (
                mongo.db.users.find_one(
                    {"email": session["user"]}))

            # determine if recipe is favorited
            favorited = findRecentFav["favorites"]
            if len(favorited) == 0:
                favoriteRecipe = False
            favoriteRecipe = False
            for fav in favorited:
                if fav == recipeInfo["_id"]:
                    favoriteRecipe = True
                    break

            # Creates base list for user recent
            if len(findRecentFav["recents"]) == 0:
                findRecentFav = [recipeInfo["_id"]]
            else:
                findRecentFav = (
                    [recipeInfo["_id"]] + findRecentFav["recents"])

            # Iterates through checking for duplicates to remove
            # For outer Loop
            userRecentFinal = []
            for final in findRecentFav:
                checkPass = True
                if len(userRecentFinal) == 0:
                    userRecentFinal += [final]
                # Check for duplicates and remove them
                # For inner loop
                for check in userRecentFinal:
                    # Breaks when recent list is 10 entries
                    if len(userRecentFinal) > 9:
                        break
                    elif final == check:
                        checkPass = False
                        break
                    elif check == userRecentFinal[-1] and checkPass is True:
                        userRecentFinal += [final]

            mongo.db.users.update_one(
                {"email": session["user"]},
                {"$set": {"recents": userRecentFinal}})

    # Except is for a missing session user
    # Sets chef and favorite status to blank if user isnt signed in
    except KeyError:
        favoriteRecipe = "None"
        chef = ""

    # Counts steps of recipe
    recipeSteps = list(enumerate(recipeInfo["steps"]))

    # Allows admin or user to delete recipe
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
    # Finds user data
    admin = mongo.db.users.find_one({"email": session["user"]})

    # Sets new recipe with blanks
    if (recipeId == "new"):
        recipeInfo = None
        recipeIngEnum = None
        recipeSteEnum = None
    # Sets edit recipe with recipe data
    else:
        if mongo.db.recipes.find_one({"_id": ObjectId(recipeId)}) is None:
            flash("Sorry this recipe has been removed")
            return(redirect(url_for("profile")))
        recipeInfo = (mongo.db.recipes.find_one({"_id": ObjectId(recipeId)}))
        recipeIngEnum = list(enumerate(recipeInfo["ingredients"]))
        recipeSteEnum = list(enumerate(recipeInfo["steps"]))

    # Generates the select/option for feature
    features = mongo.db.feature.find()

    if request.method == "POST":
        # Creates base dictionary and adds name and feature
        upload_dict = {}
        upload_dict["name"] = request.form.get("recipeName")
        upload_dict["feature"] = request.form.get("feature")

        # Creates list of times and adds to dictionary
        upload_dict["time"] = []
        for time in range(1, 4):
            upload_dict["time"].append(request.form.get("time" + str(time)))

        # Creates list of steps and adds to dictionary
        upload_dict["steps"] = []
        for step in range(1, int(request.form.get("recipeStepsTotal")) + 1):
            upload_dict["steps"].append(
                request.form.get("recipeSteps-" + str(step)))

        # Creates list of ingredents and adds to dictionary
        upload_dict["ingredients"] = []
        for ingredient in range(1, int(
                request.form.get("recipeIngredientsTotal")) + 1):
            upload_dict["ingredients"].append(
                request.form.get("recipeIngredients-" + str(ingredient)))

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
            imageDict = mongo.db.fs.files.find_one(
                {"filename": request.form.get("avatar_name")})
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

    # Creates empty dictionary to add edit information to
    update_dict = {}

    if request.method == "POST":
        # Updates user name if different and validates
        if userInfo["username"] != request.form.get("usernameEdit"):
            # Checks if new user name is unique
            usernameCheck = mongo.db.users.find_one(
                {"username": request.form.get("usernameEdit")})
            # Returns error if name is taken and redirects
            if usernameCheck is not None:
                flash("Username already exists! Try Again!")
                return(redirect(url_for("edit_user_info")))
            update_dict["username"] = request.form.get("usernameEdit")

        # Updates user email if different and validates
        if userInfo["email"] != request.form.get("emailEdit"):
            # Checks if new email is unique
            emailCheck = mongo.db.users.find_one(
                {"email": request.form.get("emailEdit")})
            # Returns error if email is taken and redirects
            if emailCheck is not None:
                flash("Email already exists! Try Again!")
                return(redirect(url_for("edit_user_info")))
            update_dict["email"] = request.form.get("emailEdit")

        # Checks if password confirm is blank
        if request.form.get("passwordCheck2") != "":
            update_dict["password"] = generate_password_hash(
                request.form.get("passwordCheck2"))

        # Checks if bio is blank
        if userInfo["bio"] != request.form.get("bio"):
            update_dict["bio"] = request.form.get("bio")

        # Validates current password before allowing changes to be made
        passwordCheck = check_password_hash(
            userInfo["password"], request.form.get('password'))

        # If password validates proceeds with last checks
        if (passwordCheck):
            flash("Profile updated successfully!")

            # Replaces Avatar if new image present and deletes previous
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

            # Uploads all new edit data dictionary to mongo DB
            mongo.db.users.update(
                {"_id": ObjectId(userInfo["_id"])}, {"$set": update_dict})
            return(redirect(url_for("profile")))

        # If Password validation fails returns error and redirects
        elif (passwordCheck is False):
            flash("Current password does not match your login password")
            flash("Could not update your profile")
            return(redirect(url_for("edit_user_info")))

        # If Unexpected unknown error happens returns error and redirects
        else:
            flash("An unexpected error occurred!")
            flash("Please enter your information again!")
            return(redirect(url_for("edit_user_info")))

    return render_template("edit_user_info.html", userInfo=userInfo)


# Returns all recipes that have a feature in common
@app.route("/recipe_list/<feature>")
def recipe_list(feature):
    allrecipes = list(mongo.db.recipes.find({"feature": feature}))
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
    allRecipes = list(mongo.db.recipes.find({}))
    return render_template(
        "all_recipes.html",
        allFeatures=allFeatures, allRecipes=allRecipes)


# Returns a search based on key words user uses, for: name, feature, or chef
@app.route("/search_bar_returns/<search>", methods=("POST", "GET"))
def search_bar_returns(search):
    # User's search
    displayRecipes = list(enumerate(
        mongo.db.recipes.find({"$text": {"$search": search}})))
    return render_template(
        "search_bar_returns.html", findRecipes=displayRecipes)


# Returns a search based on users favorites, recents, or uploaded recipes
@app.route("/search_user_recipes/<search>", methods=("POST", "GET"))
def search_user_recipes(search):
    # Find User Info
    chef = mongo.db.users.find_one({"email": session["user"]})

    # Pulls list from individual recipes
    if search == "submitted":
        displayRecipes = list(enumerate(
            mongo.db.recipes.find({"createdby": chef["username"]})))

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
