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
    for fav in userFavorites:
        for fa in fav["favorites"]:
            favorite = mongo.db.recipes.find_one({"_id": ObjectId(fa)})
            if favorite:
                favorites += [favorite["name"]]
                favoriteId += [favorite["_id"]]

    favorites = enumerate(favorites)

    # Find ten previously user viewed recipies
    recents = []
    recentId = []
    userRecents = (mongo.db.users.find({"email": session['user']}))
    for rec in userRecents:
        for re in rec["recent"]:
            recent = mongo.db.recipes.find_one({"_id": ObjectId(re)})
            if recent:
                recents += [recent["name"]]
                recentId += [recent["_id"]]

    recents = enumerate(recents)

    # Loads carousel items
    features = list(mongo.db.feature.find())

    return render_template(
        "profile.html", chef_info=chef_info,
        features=features,
        submitteds=submitteds, submittedId=submittedId,
        favorites=favorites, favoriteId=favoriteId,
        recents=recents, recentId=recentId)


@app.route("/recipe/<recipeId>")
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
    return render_template("recipe.html", recipeInfo=recipeInfo, time=time, ingredients=ingredients, steps=steps)


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

        # Code customized from Pretty Printed
        # https://www.youtube.com/watch?v=DsgAuceHha4
        avatar = request.files['avatar']
        mongo.save_file(avatar.filename, avatar)

        edit_recipe = {
            "name": request.form.get("recipeName"),
            "feature": request.form.get("feature"),
            "ingredients": ingredients,
            "steps": steps,
            "time": time,
            "text": request.form.get("recipeDescription"),
            "history": request.form.get("recipeHistory"),
            "date": datetime.datetime.now(),
            "avatar": avatar.filename,
            "created_by": session["user"]
        }
        mongo.db.recipes.update({"_id": ObjectId(recipeInfo["_id"])}, edit_recipe)
        return redirect(url_for("profile"))

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
        mongo.db.recipes.insert_one(add_recipe)
        return redirect(url_for("profile"))

    return render_template(
        "add_edit_recipe.html", features=features, recipeInfo=recipeInfo,
        recipeIngEnum=recipeIngEnum, recipeSteEnum=recipeSteEnum)


if __name__ == "__main__":
    app.run(host=os.environ.get("IP"),
            port=int(os.environ.get("PORT")),
            debug=True)
