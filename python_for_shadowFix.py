# Returns recipe and auto adjusts recent list for logged in users
@app.route("/recipe/<recipeId>", methods=("GET", "POST"))
def recipe(recipeId):
    # --Defensive-- Redirects incase recipe has been removed
    if mongo.db.recipes.find_one({"_id": ObjectId(recipeId)}) is None:
        flash("Sorry this recipe has been removed")
        return(redirect(url_for("profile")))

    # --Loads-- recipe to display
    recipeInfo = mongo.db.recipes.find_one({"_id": ObjectId(recipeId)})



    # Im a test section --- recipe steps count
    recipeTest = mongo.db.recipes.find_one({"_id": ObjectId(recipeId)})
    recipeStepsCounttest = int(len(recipeTest["steps"]))
    recipeStepsCount = []
    test_append = []
    for counter in range(0, recipeStepsCounttest, 4):
        test_append += [counter]
    recipeStepsCount.append(test_append)
    if recipeStepsCounttest != recipeStepsCount[0][-1]:
        diff = recipeStepsCounttest - recipeStepsCount[0][-1]
        test_append = []
        for counter_append in range(1, diff + 1):
            test_append += [counter_append]
        test_append = [int((test_append[-1] * 4) - 1)]
        recipeStepsCount.append(test_append)

    # Im a test section --- recipe ingredients count
    recipeTest = mongo.db.recipes.find_one({"_id": ObjectId(recipeId)})
    recipeStepsCounttest = int(len(recipeTest["ingredients"]))
    recipeIngredientsCount = []
    test_append = []
    for counter in range(0, recipeStepsCounttest, 4):
        test_append += [counter]
    recipeIngredientsCount.append(test_append)
    if recipeStepsCounttest != recipeIngredientsCount[0][-1]:
        diff = recipeStepsCounttest - recipeIngredientsCount[0][-1]
        test_append = []
        for counter_append in range(1, diff + 1):
            test_append += [counter_append]
        test_append = [int((test_append[-1] * 4) - 1)]
        recipeIngredientsCount.append(test_append)




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

    # --Loads-- ingredients of recipe
    recipeIngredients = list(enumerate(recipeInfo["ingredients"]))

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
        chef=chef, 
        recipeSteps=recipeSteps, recipeIngredients=recipeIngredients,
        recipeStepsCount=recipeStepsCount,
        recipeIngredientsCount=recipeIngredientsCount)