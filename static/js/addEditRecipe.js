// ingredient Add Button
var arrayIngredientLength = 0
document.querySelector(".recipeAddButton").addEventListener("click", function() {
    var addLocation = document.getElementsByClassName("ingredientAddRemoveLocation")[0];
    //var attName = addLocation.getElementsByTagName("input")[arrayLength].getAttribute("id");
    //attName = attName.split('-')[1]
    //attName++
    arrayIngredientLength++
   // console.log(attName)
   //console.log(addLocation.firstChild.getAttribute(id))
    var createInput = document.createElement("input");
    addLocation.appendChild(createInput);
    addLocation.lastChild.setAttribute("type","text")
    addLocation.lastChild.setAttribute("id","recipeIngredients-" + arrayIngredientLength)
    addLocation.lastChild.setAttribute("name","recipeIngredients-" + arrayLearrayIngredientLengthngth)
})

//ingredient remove button
document.querySelector(".recipeRemoveButton").addEventListener("click", function() {
    var removeLocation = document.getElementsByClassName("ingredientAddRemoveLocation")[0];
    if (arrayIngredientLength > 0){
        removeLocation.lastChild.remove();
        arrayIngredientLength--;
    }
})

//step add button
var arrayStepLength = 0;
document.querySelector(".stepAddButton").addEventListener("click", function() {
    var addLocation = document.getElementsByClassName("stepAddRemoveLocation")[0];
    arrayStepLength++
    var createInput = document.createElement("input");
    addLocation.appendChild(createInput);
    addLocation.lastChild.setAttribute("type", "text");
    addLocation.lastChild.setAttribute("id", "recipesteps-" + arrayStepLength);
    addLocation.lastChild.setAttribute("name", "recipesteps-" + arrayStepLength);
})

//step remove button
document.querySelector(".stepRemoveButton").addEventListener("click", function () {
    var removeLocation = document.getElementsByClassName("stepAddRemoveLocation")[0];
    if (arrayStepLength>0){
        removeLocation.lastChild.remove();
        arrayStepLength--;
    }
})