import os
from flask import (
    Flask, flash, render_template,
    redirect, request, session, url_for)
from flask_pymongo import PyMongo
#from pymongo import MongoClient  #
#import gridfs  #
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
    # Loads carousel items
    features = list(mongo.db.feature.find())

    # Loads recipe of the day
    raccoonrecipe = list(mongo.db.recipes.find({"_id": ObjectId("601aef906fa63479d64827f1")}))  # --------------------- CHANGE ME TO SOMETHING LESS HARDCODE

    # Finds, splits and loads cook time data from recipe of the day
    time = raccoonrecipe[0]["time"].split(",")

    # finds and loads chefs information from recipe of the day
    chef = mongo.db.users.find_one(
        {"name": raccoonrecipe[0]["created_by"]})['bio']

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
        time=time, chef=chef)


@app.route("/logout")
def logout():
    # Removes session for user
    session.pop("user")
    flash("You've been logged out!")
    return redirect(url_for("index"))


@app.route("/profile", methods=("GET", "POST"))
def profile():
    # Loads user Info
    chef_info = list(mongo.db.users.find({"email": session['user']}))

    # Find user selected favorites by '_id' and add them to a list
    favorites = []
    favoriteId = []
    userFavorites = (mongo.db.users.find({"email": session['user']}))
    for fav in userFavorites:
        for fa in fav["favorites"]:
            favorite = mongo.db.recipes.find_one({"_id": ObjectId(fa)})
            favorites += [favorite["name"]]
            favoriteId += [favorite["_id"]]

    favorites = enumerate(favorites)

    # Find Chef submitted recipies, change them into
    # a list, and give each iteration a number
    submittedRecipes = enumerate(list(mongo.db.recipes.find(
        {"created_by": session['user']})))

    # Find ten previously user viewed recipies
    recents = []
    userRecents = mongo.db.users.find({"email": session['user']})
    for recent in userRecents:
        for recentId in recent["recent"]:
            ids = mongo.db.recipes.find_one({"_id": ObjectId(recentId)})
            recents += [ids["name"]]

    recents = enumerate(recents)

    # Loads carousel items
    features = list(mongo.db.feature.find())

    return render_template(
        "profile.html", chef_info=chef_info,
        features=features, submittedRecipes=submittedRecipes,
        favorites=favorites, favoriteId=favoriteId, recents=recents)


@app.route("/recipe/<recipeId>")
def recipe(recipeId):
    # Finds recipe to display
    recipeInfo = mongo.db.recipes.find_one({"_id": ObjectId(recipeId)})

    # Finds the splits time info into a list
    time = recipeInfo["time"].split(",")

    # Finds ingredients and sets it to its own list
    ingredients = recipeInfo["ingredients"]

    # Finds steps and sets it to its own list
    steps = enumerate(recipeInfo["steps"])
    return render_template("recipe.html", recipeInfo=recipeInfo, time=time, ingredients=ingredients, steps=steps)


# @app.route('/')
# def index():
#    return '''
#        <form method="POST" action="/create" enctype="multipart/form-data">
#            <input type="text" name="username">
#            <input type="file" name="profile_image">
#            <input type="submit">
#        </form>
#    '''


# @app.route('/create', methods=['POST'])
# def create():
#    if 'profile_image' in request.files:
#        profile_image = request.files['profile_image']
#        # first is file name second is file data
#        mongo.save_file(profile_image.filename, profile_image)
#        mongo.db.users.insert(
#           {'username': request.form.get('username'),
#           'profile_image_name': profile_image.filename})
#    return "Holy icosahedron!"


if __name__ == "__main__":
    app.run(host=os.environ.get("IP"),
            port=int(os.environ.get("PORT")),
            debug=True)
