import os  #308 total 562 day4 # 321 total 583 day 3 # 403 day2
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
import rae  # Custom library made for this project


app = Flask(__name__)


app.config["MONGO_DBNAME"] = os.environ.get("MONGO_DBNAME")
app.config["MONGO_URI"] = os.environ.get("MONGO_URI")
app.secret_key = os.environ.get("SECRET_KEY")


mongo = PyMongo(app)


# Returns Landing page
@app.route("/")
def index():
    head_chef = mongo.db.users.find_one({"username": "fat_raccoon"})
    allRecipes = list(mongo.db.recipes.find(
        {"created_by": "fat_raccoon"}, {"ingredients": 0, "steps": 0}))
    features = list(mongo.db.feature.find())
    return render_template(
        "index.html", features=features, chef=head_chef,
        random_recipe=rae.create_random_recipe_lists(0, allRecipes),
        card_carousel=rae.match_mongo_cursors(
            features, "name", allRecipes, "feature"),
        classics=rae.create_random_recipe_lists(
            3, rae.search_bool_return("grandparent")))


# Logins user in or creates a new user account
@app.route("/login", methods=("GET", "POST"))
def login():
    user = rae.check_mongo_user_unique(True, "email", "email")
    password = rae.check_user_password(user[2])
    if not user[0] and password:
        session["user"] = request.form.get("email").lower()
        flash(f"Welcome back, {user[2]['username'].title()}!")
        return redirect(url_for("profile", username=session['user']))
    else:
        flash("login credentials incorrect!")
        return redirect(url_for("index"))


# Logins user in or creates a new user account
@app.route("/create", methods=("GET", "POST"))
def create():
    username = rae.check_mongo_user_unique(True, "username", "username")
    useremail = rae.check_mongo_user_unique(True, "email", "email")
    user_input_unique = rae.check_boolean(
        [[username[0], username[1]], [useremail[0], useremail[1]]])
    if not user_input_unique[0]:
        flash(f"{user_input_unique[1].title()} has already been taken")
        return redirect(url_for("index"))
    dictionary = mongo.db.blank.find_one({"username": "user"}, {"_id": 0})
    rae.get_form_items(["username", "email"], dictionary, True)
    rae.create_new_password("password", "passwordCheck", dictionary)
    dictionary.update(dict(date=datetime.datetime.now(), admin=False))
    mongo.db.users.insert_one(dictionary)
    session["user"] = request.form.get("email").lower()
    flash("Welcome to the Fat Raccoon Family!")
    return redirect(url_for("profile", username=session['user']))


# Removes user's session
@app.route("/logout")
def logout():
    session.pop("user")
    flash("You've been logged out!")
    return redirect(url_for("index"))


# Returns users personal profile
@app.route("/profile", methods=("GET", "POST"))
def profile():
    userInfo = rae.check_mongo_user_unique(False, "email", session["user"])
    if not userInfo[0]:
        return render_template(
            "profile.html", chef_info=userInfo[2],
            favorites=rae.create_user_recipe_list("favorites", userInfo[2]),
            recents=rae.create_user_recipe_list("recents", userInfo[2]),
            uploaded=list(enumerate(mongo.db.recipes.find(
                {"created_by": userInfo[2]["username"]},
                {"name": 1}).sort("date", -1))))
    else:
        flash("Your session has ended please login again")
        session.pop("user")
        return redirect(url_for("index"))


# Changes favorite status of recipe and returns user to recipe's page
@app.route("/recipe/<recipeId>/<favoriteChange>", methods=("GET", "POST"))
def addFavorite(recipeId, favoriteChange):
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
        favoriteRecipe=favoriteChange, userInfo=userInfo,
        recipeSteps=list(enumerate(recipeInfo["steps"])))


# Returns recipe and auto adjusts recent list for logged in users
@app.route("/recipe/<recipeId>", methods=("GET", "POST"))
def recipe(recipeId):
    # --Defensive-- Redirects incase recipe has been removed
    if mongo.db.recipes.find_one({"_id": ObjectId(recipeId)}) is None:
        flash("Sorry this recipe has been removed")
        return(redirect(url_for("profile")))
    recipeInfo = mongo.db.recipes.find_one({"_id": ObjectId(recipeId)})
    try:
        if session["user"]:
            # --Loads-- user information, if favorite, and updates recents list
            userInfo = mongo.db.users.find_one({"email": session['user']})
            favoriteRecipe = not rae.check_for_dups(
                userInfo["favorites"], recipeInfo["_id"])[0]
            viewed = [new_rec for new_rec in userInfo[
                "recents"] if new_rec != recipeInfo["_id"]]
            viewed.insert(0, recipeInfo["_id"])
            viewed = viewed[0:10]
            rae.update_mongo("user", userInfo["_id"], dict(recents=viewed))
    except KeyError:
        userInfo = ""
        favoriteRecipe = "None"
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
    recipeInfo = mongo.db.recipes.find_one({"_id": ObjectId(recipe_id)})
    rae.delete_avatar(recipeInfo["avatar_id"])
    flash(f"You've removed your recipe, {recipeInfo['created_by'].title()}")
    mongo.db.recipes.delete_one({"_id": ObjectId(recipe_id)})
    return redirect(url_for("profile"))


@app.route("/add_edit_recipe/<recipeId>", methods=("GET", "POST"))
def add_edit_recipe(recipeId):
    userInfo = mongo.db.users.find_one({"email": session["user"]})
    features = mongo.db.feature.find()
    if recipeId == "new":
        recipeId = ObjectId()
        recipeInfo = mongo.db.recipes.find_one(
            {"_id": ObjectId("607910a5ea7008965f0bf5d3")})
    else:
        recipeInfo = (mongo.db.recipes.find_one({"_id": ObjectId(recipeId)}))
    return render_template(
        "add_edit_recipe.html", features=features, recipeInfo=recipeInfo,
        recipeIngEnum=list(enumerate(recipeInfo["ingredients"])),
        recipeSteEnum=list(enumerate(recipeInfo["steps"])),
        admin=userInfo["admin"], recipeId=recipeId, username=userInfo["username"])


@app.route("/upload_recipe/<recipeId>/<username>", methods=("GET", "POST"))
def upload_recipe(recipeId, username):
    dictionary = {}
    rae.get_form_items(["name", "feature", "text"], dictionary, False)
    rae.get_form_list("timeTotal", 0, "time", dictionary)
    rae.get_form_list("stepsTotal", 1, "steps", dictionary)
    rae.get_form_list("ingredientsTotal", 1, "ingredients", dictionary)
    dictionary["date"] = datetime.datetime.now()
    rae.get_form_bool(["lazy", "grandparent"], dictionary)
    # --Updates-- Avatar if new image present
    recipeInfo = mongo.db.recipes.find_one({"_id": ObjectId(recipeId)})
    if len([avatar for avatar in recipeInfo.keys() if avatar == "avatar"]) > 0:
        rae.update_avatar("avatar_file_valid", recipeInfo["avatar_id"], dictionary)
    if not rae.check_mongo_recipe_exists(recipeId)[0]:
        dictionary["created_by"] = username
        dictionary["_id"] = ObjectId(recipeId)
        mongo.db.recipes.insert_one(dictionary)
    else:
        rae.update_mongo("recipe", recipeId, dictionary)
    return redirect(url_for("recipe", recipeId=recipeId))


# Returns a page for users to edit their user info
@app.route("/profile/edit", methods=("GET", "POST"))
def edit_user_info():
    userInfo = mongo.db.users.find_one({"email": session["user"]})
    if request.method == "POST":
        dictionary = {}
        # --Update/Validate-- username and email if different and validate
        if not rae.form_check_diff(userInfo, "username", "username") or (
                not rae.form_check_diff(userInfo, "email", "email")):
            return (redirect(url_for("edit_user_info")))
        if rae.check_user_password(userInfo):
            rae.get_form_items(["username", "email"], dictionary, True)
            rae.get_form_items(["bio"], dictionary, False)
            # --Updates-- Replaces Avatar and password if present
            rae.update_avatar(
                "avatar_file_valid", userInfo["avatar_id"], dictionary)
            if request.form.get("passwordCheck2") != "":
                rae.create_new_password(
                    "password", "passwordCheck2", dictionary)
            # --Uploads-- mongo with new dictionary
            flash("Profile updated successfully!")
            rae.update_mongo("user", userInfo["_id"], dictionary)
            return(redirect(url_for("profile")))
        else:
            flash("Current password does not match your login password")
            flash("Could not update your profile")
            return(redirect(url_for("edit_user_info")))
    return render_template("edit_user_info.html", userInfo=userInfo)


# Returns all recipes that match feature argument
@app.route("/recipe_list/<feature>")
def recipe_list(feature):
    return render_template(
        "recipe_list.html", feature=feature,
        allrecipes=list(mongo.db.recipes.find(
            {"feature": feature}, {"name": 1, "time": 1})))


# Retuens lessons page
@app.route("/lessons")
def lessons():
    return render_template("lessons.html")


# Returns all recipes paired by their feature
@app.route("/all_recipes")
def all_recipes():
    return render_template(
        "all_recipes.html", allFeatures=enumerate(mongo.db.feature.find()),
        allRecipes=list(mongo.db.recipes.find(
            {}, {"name": 1, "feature": 1, "time": 1})))


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


# Returns a search based on users favorites or recents lists
@app.route("/search_user_recipes/<search>", methods=("POST", "GET"))
def search_user_recipes(search):
    userInfo = rae.call_user()
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
