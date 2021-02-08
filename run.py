import os
from flask import (
    Flask, flash, render_template,
    redirect, request, session, url_for)
from flask_pymongo import PyMongo
#from pymongo import MongoClient  #
#import gridfs  #
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


#@app.route('/')
#def index():
#    return '''
#        <form method="POST" action="/create" enctype="multipart/form-data">
#            <input type="text" name="username">
#            <input type="file" name="profile_image">
#            <input type="submit">
#        </form>
#    '''


#@app.route('/create', methods=['POST'])
#def create():
#    if 'profile_image' in request.files:
#        profile_image = request.files['profile_image']
#        # first is file name second is file data
#        mongo.save_file(profile_image.filename, profile_image)
#        mongo.db.users.insert({'username': request.form.get('username'), 'profile_image_name': profile_image.filename})
#    return "Holy icosahedron!"



if __name__ == "__main__":
    app.run(host=os.environ.get("IP"),
            port=int(os.environ.get("PORT")),
            debug=True)
