import os
from flask import (
    Flask, flash, render_template,
    redirect, request, session, url_for)
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
if os.path.exists("env.py"):
    import env


app = Flask(__name__)


app.config["MONGO_DBNAME"] = os.environ.get("MONGO_DBNAME")
app.config["MONGO_URI"] = os.environ.get("MONGO_URI")
app.secret_key = os.environ.get("SECRET_KEY")


mongo = PyMongo(app)


@app.route("/")
def index():
    # Loads carousel items
    features = list(mongo.db.feature.find())
    # Loads recipe of the day
    raccoonrecipe = list(mongo.db.recipes.find())
    # Finds, splits and loads cook time data from recipe of the day
    time = raccoonrecipe[0]["time"].split(",")
    # finds and loads chefs information from recipe of the day
    chef = mongo.db.users.find_one({"name": raccoonrecipe[0]["created_by"]})['bio']
    return render_template(
        "index.html",
        features=features,
        raccoonrecipe=raccoonrecipe,
        time=time,
        chef=chef)


if __name__ == "__main__":
    app.run(host=os.environ.get("IP"),
            port=int(os.environ.get("PORT")),
            debug=True)
