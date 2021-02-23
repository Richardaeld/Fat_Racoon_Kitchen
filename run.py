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
    # Loads carousel feature items
    features = list(mongo.db.feature.find())

    # Generates list of recipes to be presented in carousel
    iteration = 0
    featurename = []
    # gets dish features for comparason
    featurefinder = mongo.db.feature.find()
    for feature1 in featurefinder:
        # gets recipe feature to compare with dish features
        featuremongo = mongo.db.recipes.find({"feature": feature1["name"]})
        # Compares all recipe features for matching dish feature
        for recipename in featuremongo:
            # first loop generates featPrev variable
            if (iteration == 0):
                featPrev = feature1["name"]
            # if iteration max is reached, prevents additional recipes
            # from being posted, and resets iteration when a new dish
            # feature is used
            elif (iteration >= 3):
                if (featPrev == feature1["name"]):
                    continue
                elif (featPrev != feature1["name"]):
                    iteration = 0
                    featPrev = feature1["name"]
            # if dish feature doesnt match recipe feature it resets
            #  iteration count and updates dish feature
            elif (featPrev != feature1["name"]):
                featPrev = feature1["name"]
                iteration = 0
            # Creates list to be used on carousel
            if(iteration <= 3 and featPrev == feature1["name"]):
                featurename += [[feature1["name"], recipename["name"], recipename["_id"]]]
                iteration += 1

    # Loads recipe of the day
    raccoonrecipe = list(mongo.db.recipes.find({"_id": ObjectId("601aef906fa63479d64827f1")}))  # --------------------- CHANGE ME TO SOMETHING LESS HARDCODE

    # Finds, splits and loads cook time data from recipe of the day
    time = raccoonrecipe[0]["time"].split(",")

    # finds and loads chefs information from recipe of the day
    chef = mongo.db.users.find_one(
        {"name": raccoonrecipe[0]["created_by"]})#['bio']

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
        userNameTaken = mongo.db.users.find_one({"email": request.form.get("email")})

        # Check to be sure email doesnt already exist in DB
        if userNameTaken:
            flash("This email was already taken!")
            return redirect(url_for("index"))

        # Gather form information and submit to DB
        create = {
            "username": request.form.get("name"),
            "email": request.form.get("email"),
            "password": generate_password_hash(request.form.get("password"))
        }
        mongo.db.users.insert_one(create)

        # Create session for user name
        session["user"] = request.form.get("email")
        flash("Welcome to the table!")
        return redirect(url_for("index", username=session['user']))

    return render_template(
        "index.html", features=features, raccoonrecipe=raccoonrecipe,
        time=time, chef=chef, featurename=featurename)


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
   # usersubmitteds = (mongo.db.users.find({"email": session['user']}))
   # for sub in usersubmitteds:
   #     for su in sub["submitted"]:
   #         submitted = mongo.db.recipes.find_one({"_id": ObjectId(su)})
   #         submitteds += [submitted["name"]]
   #         submittedId += [submitted["_id"]]
   # submitteds = enumerate(submitteds)
   #-----------------------------made obsolete with current idea
    submittedAll = mongo.db.recipes.find({"created_by": session["user"]})
    for submitted in submittedAll:
        submitteds += [submitted["name"]]
        submittedId += [submitted["_id"]]

    submitteds = enumerate(submitteds)

    # Find user selected favorites by '_id' and add them to a list
    favorites = []
    favoriteId = []
    userFavorites = (mongo.db.users.find({"email": session['user']}))
    #for fav in userFavorites:
    #    for fa in fav["favorites"]:
    #        favorite = mongo.db.recipes.find_one({"_id": ObjectId(fa)})
    #        if favorite:
    #            favorites += [favorite["name"]]
    #            favoriteId += [favorite["_id"]]

    #favorites = enumerate(favorites)

    # Find ten previously user viewed recipies
    recents = []
    recentId = []
    userRecents = (mongo.db.users.find_one({"email": session['user']}))

    print(userRecents)
    print(userRecents["recent"])
    print(len(userRecents["recent"]))

    if len(userRecents["recent"]) == 0:
        print("user recents doesnt exist")
    else:
        for rec in userRecents["recent"]:
            print(rec)
            print("bad if, didnt catch")
            rec = mongo.db.recipes.find_one({"_id": ObjectId(rec)})
            if rec:
                recents += [rec["name"]]
                recentId += [rec["_id"]]

        #    for re in rec["recent"]:

    recents = enumerate(recents)

    # Loads carousel items
    features = list(mongo.db.feature.find())

    return render_template(
        "profile.html", chef_info=chef_info,
        features=features,
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
    # time = recipeInfo["time"].split(",")
    # --- commited out with user added recipes
    time = recipeInfo["time"]

    # Finds ingredients and sets it to its own list
    ingredients = recipeInfo["ingredients"]

    # Finds steps and sets it to its own list
    #steps = enumerate(recipeInfo["steps"])
    steps = recipeInfo["steps"]

    # Creates a previously viewed list
    if session["user"]:
        userRecentFinal = []
        findRecent = mongo.db.users.find_one({"email": session["user"]})

        # determine if favorited
        favorited = findRecent["favorites"]
        print(favorited, "Im favorited")
        for fav in favorited:
            if len(favorited) == 0:
                break
            if fav == recipeInfo["_id"]:
                favoriteRecipe = True
                print("Favorite Break!!")
                break
            else:
                favoriteRecipe = False
                print("False try again!!")

        # Creates base list
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

    if request.method == "POST":
        mongo.db.recipes.delete_one({"_id": ObjectId(recipeInfo["_id"])})
        return redirect(url_for("profile"))

    print(favoriteRecipe)
    return render_template("recipe.html", recipeInfo=recipeInfo, time=time, ingredients=ingredients, steps=steps, favoriteRecipe=favoriteRecipe)


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
                session.pop('editRecipe')
        except KeyError:
            print("I ran a KeyError for console because editRecipe has been poped")

        recipeInfo = None
        recipeIngEnum = None
        recipeSteEnum = None
        print(False)

    # Generates the select/option for meal feature
    features = mongo.db.feature.find()

    try:
        if request.method == "POST" and session['editRecipe']:
            time = [request.form.get("prepTime"), request.form.get("cookTime"), request.form.get("totalTime")]
            ingredients = []
            steps = []

            recipeStepsTotal = (request.form.get("recipeStepsTotal"))
            recipeStepsTotal = int(recipeStepsTotal)
            for step in range(1, recipeStepsTotal + 1):
                recipeStep = "recipeSteps-" + str(step)
                # Skip columns that are empty
                if request.form.get(recipeStep) == "":
                    continue
                steps += [request.form.get(recipeStep)]
        #        print(test)
        #        print(request.form.get(test))

            recipeIngredientsTotal = request.form.get("recipeIngredientsTotal")
            recipeIngredientsTotal = int(recipeIngredientsTotal)
            for step in range(1, recipeIngredientsTotal + 1):
                ingredientStep = "recipeIngredients-" + str(step)
                # Skip columns that are empty
                if request.form.get(ingredientStep) == "":
                    continue
                ingredients += [request.form.get(ingredientStep)]
        #        print(test)
        #        print(request.form.get(test))

            if recipeInfo["avatar"]:
                delPrevImg = recipeInfo["avatar_id"]
                mongo.db.fs.chunks.delete_many({"files_id": ObjectId(delPrevImg)})
                mongo.db.fs.files.delete_many({"_id": ObjectId(delPrevImg)})

            # Code customized from Pretty Printed
            # https://www.youtube.com/watch?v=DsgAuceHha4
            avatar = request.files['avatar']
            # format filename and then file
            mongo.save_file(request.form.get("avatar_name"), avatar)
            imageDict = mongo.db.fs.files.find_one({"filename": request.form.get("avatar_name")})

            edit_recipe = {
                "name": request.form.get("recipeName"),
                "feature": request.form.get("feature"),
                "ingredients": ingredients,
                "steps": steps,
                "time": time,
                "text": request.form.get("recipeDescription"),
                "history": request.form.get("recipeHistory"),
                "date": datetime.datetime.now(),
                "avatar": request.form.get("avatar_name"),
                "avatar_id": imageDict["_id"],
                "created_by": session["user"]
            }

            mongo.db.recipes.update({"_id": ObjectId(recipeInfo["_id"])}, edit_recipe)
            return redirect(url_for("recipe", recipeId=recipeInfo["_id"]))

    except KeyError:
        print("Im not an edit recipe, Im a add new recipe")

    if request.method == "POST":
        time = [request.form.get("prepTime"), request.form.get("cookTime"), request.form.get("totalTime")]
        ingredients = []
        steps = []

        recipeStepsTotal = (request.form.get("recipeStepsTotal"))
        recipeStepsTotal = int(recipeStepsTotal)
        for step in range(1, recipeStepsTotal + 1):
            recipeStep = "recipeSteps-" + str(step)
            steps += [request.form.get(recipeStep)]
    #        print(test)
    #        print(request.form.get(test))

        recipeIngredientsTotal = request.form.get("recipeIngredientsTotal")
        recipeIngredientsTotal = int(recipeIngredientsTotal)
        for step in range(1, recipeIngredientsTotal + 1):
            ingredientStep = "recipeIngredients-" + str(step)
            ingredients += [request.form.get(ingredientStep)]
    #        print(test)
    #        print(request.form.get(test))

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
            "created_by": session["user"]
        }

    #    print(steps)
    #    print(add_recipe)
        print("Im Creating")
        #mongo.db.recipes.insert_one(add_recipe)
        result = mongo.db.recipes.insert_one(add_recipe)
        print(result.inserted_id)
        testId = result.inserted_id

        return redirect(url_for("recipe", recipeId=testId))

    return render_template(
        "add_edit_recipe.html", features=features, recipeInfo=recipeInfo,
        recipeIngEnum=recipeIngEnum, recipeSteEnum=recipeSteEnum)


if __name__ == "__main__":
    app.run(host=os.environ.get("IP"),
            port=int(os.environ.get("PORT")),
            debug=True)
