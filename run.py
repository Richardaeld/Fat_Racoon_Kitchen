import os
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
    # ---- Loads quick meal ideas (carousel) feature items
    features = list(mongo.db.feature.find())

    recipes = mongo.db.recipes.find({"created_by": "asdfa@aol.com"})
    recipeHeader = []
    for recipe in recipes:
        if len(recipeHeader) < 3:
            print(recipe)
            recipeHeader += [recipe]

    # ---- Creates recipes found in carousel with a max of 3 recipes per card
    # Generates list of recipes to be presented in carousel
    iteration = 0
    featureRecipes = []
    # gets dish features for comparason
    for feature in features:
        # gets recipe feature to compare with dish features
        allRecipeWithFeature = mongo.db.recipes.find({"feature": feature["name"]})  # I need refactoring
        # Compares all recipe features for matching dish feature
        for recipe in allRecipeWithFeature:
            # first loop generates featurePrev variable
            if (iteration == 0):
                featurePrev = feature["name"]
            # if iteration max is reached, prevents additional recipes
            # from being posted, and resets iteration when a new dish
            # feature is used
            elif (iteration >= 3):
                if (featurePrev == feature["name"]):
                    continue
                elif (featurePrev != feature["name"]):
                    iteration = 0
                    featurePrev = feature["name"]
            # if dish feature doesnt match recipe feature it resets
            #  iteration count and updates dish feature
            elif (featurePrev != feature["name"]):
                featurePrev = feature["name"]
                iteration = 0
            # Creates list to be used on carousel
            if(iteration <= 3 and featurePrev == feature["name"]): #conditional iteration<= 3 not needed anymore
                featureRecipes += [[recipe["feature"], recipe["name"], recipe["_id"]]]
                iteration += 1

    # Loads recipe of the day # THIS IS THE RECIPE!!!
    recipeOfDay = mongo.db.recipes.find_one({"_id": ObjectId("603ead31010dfd474fbb718f")})  # --------------------- CHANGE ME TO SOMETHING LESS HARDCODE

    # finds and loads chefs information from recipe of the day
    chef = mongo.db.users.find_one({"email": recipeOfDay["created_by"]})

    # --Login-- information
    if request.method == "POST" and request.form.get("name") == "":
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

    # --Create account-- information
    if request.method == "POST":

        if request.form.get("formType") == "search":
            return redirect(url_for("search_bar_returns", search=request.form.get("userSearch")))

        userNameTaken = mongo.db.users.find_one({"email": request.form.get("email")})

        # Check to be sure email doesnt already exist in DB
        if userNameTaken:
            flash("This email was already taken!")
            return redirect(url_for("index"))

        # Gather form information and submit to DB
        create = {
            "username": request.form.get("name"),
            "email": request.form.get("email"),
            "password": generate_password_hash(request.form.get("password")),
            "avatar": None,
            "avatar_id": None,
            "bio": "",
            "recent": [],
            "favorites": [],
            "submitted": [],
            "date": datetime.datetime.now()
        }
        mongo.db.users.insert_one(create)

        # Create session for user name
        session["user"] = request.form.get("email")
        flash("Welcome to the table!")
        return redirect(url_for("index", username=session['user']))

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
    # Loads user Info
    chef_info = mongo.db.users.find_one({"email": session['user']})

    # Find Chef submitted recipies, change them into
    # a list, and give each iteration a number
    submitteds = []
    submittedId = []
    submittedAll = mongo.db.recipes.find({"created_by": session["user"]})
    for submitted in submittedAll:
        submitteds += [submitted["name"]]
        submittedId += [submitted["_id"]]

    submitteds = enumerate(submitteds)

    # Find user selected favorites by '_id' and add them to a list
    favorites = []
    favoriteId = []
    userFavorites = chef_info["favorites"]
    if len(userFavorites) > 0:
        for fav in userFavorites:
            fav = mongo.db.recipes.find_one({"_id": ObjectId(fav)})
            if fav:
                favorites += [fav["name"]]
                favoriteId += [fav["_id"]]

    favorites = enumerate(favorites)

    # Find ten previously user viewed recipies
    recents = []
    recentId = []
    userRecents = chef_info["recent"]
    if len(userRecents) > 0:
        for rec in userRecents:
            rec = mongo.db.recipes.find_one({"_id": ObjectId(rec)})
            if rec:
                recents += [rec["name"]]
                recentId += [rec["_id"]]
    recents = enumerate(recents)

    return render_template(
        "profile.html", chef_info=chef_info,
        submitteds=submitteds, submittedId=submittedId,
        favorites=favorites, favoriteId=favoriteId,
        recents=recents, recentId=recentId)


@app.route("/recipe/<recipeId>/<favoriteChange>", methods=("GET", "POST"))
def addFavorite(recipeId, favoriteChange):
    recipeInfo = mongo.db.recipes.find_one({"_id": ObjectId(recipeId)})
    user = mongo.db.users.find_one({"email": session["user"]})
    if favoriteChange == "True":
        favoriteChange = True
    else:
        favoriteChange = False

    if favoriteChange is False:
        newFav = user["favorites"] + [recipeInfo["_id"]]
        print("False ", newFav)
        mongo.db.users.update_one({"_id": user["_id"]}, {"$set": {"favorites": newFav}})
        favoriteChange = True

    elif favoriteChange is True:
        newFav = []
        changeFav = user["favorites"]
        for fav in changeFav:
            if fav == recipeInfo["_id"]:
                continue
            else:
                newFav += [fav]
        favoriteChange = False
        mongo.db.users.update_one({"_id": user["_id"]}, {"$set": {"favorites": newFav}})

        print("True ", newFav)
        print(" Im truye")

    print(" imafter if statements")
    time = recipeInfo["time"]
    ingredients = recipeInfo["ingredients"]
    steps = recipeInfo["steps"]

    #recipeInfo = mongo.db.recipes.fine_one({"_id": recipeId})
    #print("Im recipe info from add favorites ", recipeInfo['_id'])
    #userInfo = mongo.db.users.find_one({"email": session["user"]})
    #userInfo = userInfo["favorites"]
    return render_template("recipe.html", recipeId=recipeInfo["_id"], recipeInfo=recipeInfo, time=time, ingredients=ingredients, steps=steps, favoriteRecipe=favoriteChange, favoriteChange=favoriteChange)


@app.route("/recipe/<recipeId>", methods=("GET", "POST"))
def recipe(recipeId):
    # Finds recipe to display
    recipeInfo = mongo.db.recipes.find_one({"_id": ObjectId(recipeId)})

    # Finds the splits time info into a list
    time = recipeInfo["time"]

    # Creates a previously viewed list
    try:
        if session["user"]:
            userRecentFinal = []
            findRecent = mongo.db.users.find_one({"email": session["user"]})

            # determine if favorited
            favorited = findRecent["favorites"]
            if len(favorited) == 0:
                favoriteRecipe = False
            for fav in favorited:
                if fav == recipeInfo["_id"]:
                    favoriteRecipe = True
                    break
                else:
                    favoriteRecipe = False          # Ive got to have a better solution

            # Creates base list for user recent
            if len(findRecent["recent"]) == 0:
                findRecent = [recipeInfo["_id"]]
            else:
                findRecent = [recipeInfo["_id"]] + findRecent["recent"]

            # Iterates through checking to duplicates
            # For outer Loop
            for final in findRecent:
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
                    elif check == userRecentFinal[-1] and checkPass is True:
                        userRecentFinal += [final]

            mongo.db.users.update_one({"email": session["user"]}, {"$set": {"recent": userRecentFinal}})

    # For a missing session user
    except KeyError:
        favoriteRecipe = "None"

    if request.method == "POST":
        mongo.db.recipes.delete_one({"_id": ObjectId(recipeInfo["_id"])})
        return redirect(url_for("profile"))

    return render_template("recipe.html", recipeInfo=recipeInfo, time=time, favoriteRecipe=favoriteRecipe)


# Code customized from Pretty Printed
# https://www.youtube.com/watch?v=DsgAuceHha4
# This allows picture to be displayed
@app.route('/avatar/<avatar_image>')
def avatar(avatar_image):
    return mongo.send_file(avatar_image)


@app.route("/add_edit_recipe/<recipeId>", methods=("GET", "POST"))
def add_edit_recipe(recipeId):

    # if editing recipe, populate the page with recipe information
    # if gets all existing recipe information
    # else populates blanks
    print(recipeId)
    if (recipeId != 'new'):
        recipeInfo = (mongo.db.recipes.find_one({"_id": ObjectId(recipeId)}))
        recipeIngEnum = enumerate(recipeInfo["ingredients"])
        recipeSteEnum = enumerate(recipeInfo["steps"])
        session['editRecipe'] = recipeId
        print(recipeId)
        print(True)
    else:
        try:
            if session['editRecipe']:
                print("Im popping aosdjfh;asdjf;lsakjflkajshd;lfja;sjf")
                session.pop('editRecipe')
        except KeyError:
            print("I ran a KeyError for console because editRecipe has been poped")

        recipeInfo = None
        recipeIngEnum = None
        recipeSteEnum = None
        print(False)

    # Generates the select/option for meal feature
    features = mongo.db.feature.find()

    if request.method == "POST":
        time = [request.form.get("prepTime"), request.form.get("cookTime"), request.form.get("totalTime")]
        ingredients = []
        steps = []

        recipeStepsTotal = (request.form.get("recipeStepsTotal"))
        recipeStepsTotal = int(recipeStepsTotal)
        for step in range(1, recipeStepsTotal + 1):
            recipeStep = "recipeSteps-" + str(step)
            steps += [request.form.get(recipeStep)]

        recipeIngredientsTotal = request.form.get("recipeIngredientsTotal")
        recipeIngredientsTotal = int(recipeIngredientsTotal)
        for step in range(1, recipeIngredientsTotal + 1):
            ingredientStep = "recipeIngredients-" + str(step)
            ingredients += [request.form.get(ingredientStep)]

        if request.form.get("avatar_file_valid") == 'true':
            print("Im creating a image")
            # Code customized from Pretty Printed
            # https://www.youtube.com/watch?v=DsgAuceHha4
            avatar = request.files['avatar']
            # format filename and then file
            mongo.save_file(request.form.get("avatar_name"), avatar)
            imageDict = mongo.db.fs.files.find_one({"filename": request.form.get("avatar_name")})
            avatar_img = request.form.get("avatar_name")
            avatar_id = imageDict["_id"]

        else:
            print("im not imageing!!!")
            avatar_img = None
            avatar_id = None

        add_recipe = {
            "name": request.form.get("recipeName"),
            "feature": request.form.get("feature"),
            "ingredients": ingredients,
            "steps": steps,
            "time": time,
            "text": request.form.get("recipeDescription"),
            "history": request.form.get("recipeHistory"),
           # "date": datetime.datetime.now().strftime("%Y-%b-%d:%H:%M"),
            "date": datetime.datetime.now(),
            "avatar": avatar_img,
            "avatar_id": avatar_id,
            "created_by": session["user"]
        }
        #print(add_recipe)
        #mongo.db.recipes.insert_one(add_recipe)
        result = mongo.db.recipes.insert_one(add_recipe) #I setup to upllaoad to mongo
        #print(result.inserted_id)
        testId = result.inserted_id     #I upload to mongo

        return redirect(url_for("recipe", recipeId=testId))
        #return redirect(url_for("profile")) -- For development testing

    return render_template(
        "add_edit_recipe.html", features=features, recipeInfo=recipeInfo,
        recipeIngEnum=recipeIngEnum, recipeSteEnum=recipeSteEnum)


@app.route("/profile/edit", methods=("GET", "POST"))
def edit_user_info():
    userInfo = mongo.db.users.find_one({"email": session["user"]})

    if request.method == "POST":
        if userInfo["avatar"]:
            delPrevImg = userInfo["avatar_id"]
            mongo.db.fs.chunks.delete_many({"files_id": ObjectId(delPrevImg)})
            mongo.db.fs.files.delete_many({"_id": ObjectId(delPrevImg)})

        # Code customized from Pretty Printed
        # https://www.youtube.com/watch?v=DsgAuceHha4
        avatar = request.files['avatar']
        
        # format filename and then file
        mongo.save_file(request.form.get("avatar_name"), avatar)
        imageDict = mongo.db.fs.files.find_one({"filename": request.form.get("avatar_name")})
        imgUpdate = {"$set": {
            "avatar": request.form.get("avatar_name"),
            "avatar_id": imageDict["_id"]
        }}
        mongo.db.users.update({"_id": ObjectId(userInfo["_id"])}, imgUpdate)

        update = {"$set": {
            "username": request.form.get("username"),
            "email": request.form.get("email"),
        #    "password": request.form.get("newPassword"),

            "bio": request.form.get("bio")
        }}
    #    mongo.db.users.update({"_id": ObjectId(userInfo["_id"])}, update)
        return redirect(url_for("profile"))

    return render_template("edit_user_info.html", userInfo=userInfo)


@app.route("/allRecipe/<feature>")
def recipe_list(feature):
    allRecipes = mongo.db.recipes.find({"feature": feature})
    allRecipes = enumerate(allRecipes)
    evenRecipes = []
    oddRecipes = []
    for recipe in allRecipes:
        print(recipe[1]["name"])
        if recipe[0] % 2:
            evenRecipes += [recipe[1]]
        else:
            oddRecipes += [recipe[1]]

    return render_template(
        "recipe_list.html", feature=feature, allRecipes=allRecipes,
        oddRecipes=oddRecipes, evenRecipes=evenRecipes)


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
    print("Im search", search)
    findRecipes = mongo.db.recipes.find({"$text": {"$search": search}})
    print("Im user inpit", findRecipes)
    return render_template("search_bar_returns.html", recipes=findRecipes)


if __name__ == "__main__":
    app.run(host=os.environ.get("IP"),
            port=int(os.environ.get("PORT")),
            debug=True)
