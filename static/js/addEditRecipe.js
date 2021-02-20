var arrayIngredientLength = document.getElementsByClassName("ingredientAddRemoveLocation")[0].querySelectorAll("input").length;
document.getElementById("recipeIngredientsTotal").options[0].value = arrayIngredientLength;
document.getElementById("recipeIngredientsTotal").options[0].textContent = arrayIngredientLength;

// ingredient Add Button -- Dynamically adds extra boxes for user input for recipe ingredients
document.querySelector(".recipeAddButton").addEventListener("click", function() {
    // Variables
    var addLocation = document.getElementsByClassName("ingredientAddRemoveLocation")[0];
    arrayIngredientLength++;
    var createDivCol = document.createElement("div");
    var createDivRow = document.createElement("div");
    var createSpan = document.createElement("span");
    var createInput = document.createElement("input");

    document.getElementById("recipeIngredientsTotal").options[0].value = arrayIngredientLength;
    document.getElementById("recipeIngredientsTotal").options[0].textContent = arrayIngredientLength;

   // document.getElementById("recipeIngredientsTotal").option.textContent = arrayIngredientLength

    // Add content to span node
    createSpan.textContent = arrayIngredientLength + ". ";
    // Creates external div with bootstrap col value
    addLocation.appendChild(createDivCol);
    addLocation.lastChild.setAttribute("class","col-6 step-ingredient-number");
    // Sets Variable for div injection location
    var innerDivLoc = addLocation.getElementsByTagName("div").length;
    // Creates internal div with bootstrap row value
    addLocation.getElementsByTagName("div")[innerDivLoc-1].appendChild(createDivRow);
    addLocation.getElementsByTagName("div")[innerDivLoc-1].lastChild.setAttribute("class","row no-gutters");
    // Creates span with ingredient # and bootstrap col value
    addLocation.getElementsByTagName("div")[innerDivLoc].appendChild(createSpan);
    addLocation.getElementsByTagName("div")[innerDivLoc].lastChild.setAttribute("class", "col-1");
//    addLocation.getElementsByTagName("div")[innerDivLoc].lastChild.setAttribute("style", "text-align: end;");
    // Creates input with form information and bootstrap col value
    addLocation.getElementsByTagName("div")[innerDivLoc].appendChild(createInput);
    addLocation.getElementsByTagName("div")[innerDivLoc].lastChild.setAttribute("class", "col-11");
    addLocation.getElementsByTagName("div")[innerDivLoc].lastChild.setAttribute("type","text");
    addLocation.getElementsByTagName("div")[innerDivLoc].lastChild.setAttribute("id","recipeIngredients-" + arrayIngredientLength);
    addLocation.getElementsByTagName("div")[innerDivLoc].lastChild.setAttribute("name","recipeIngredients-" + arrayIngredientLength);

    //addLocation.appendChild(createSpan);
    //addLocation.lastChild.setAttribute("class", "col-1")
    //addLocation.lastChild.setAttribute("style", "text-align: end;")
    //addLocation.appendChild(createInput);
    //addLocation.lastChild.setAttribute("type","text");
    //addLocation.lastChild.setAttribute("id","recipeIngredients-" + arrayIngredientLength);
    //addLocation.lastChild.setAttribute("name","recipeIngredients-" + arrayIngredientLength);
    //addLocation.lastChild.setAttribute("class", "col-5");
})

//ingredient remove button
document.querySelector(".recipeRemoveButton").addEventListener("click", function() {
    var removeLocation = document.getElementsByClassName("ingredientAddRemoveLocation")[0];
    if (arrayIngredientLength > 0){
        childTotal = document.getElementsByClassName("ingredientAddRemoveLocation")[0].children.length
        removeLocation.children[childTotal-1].remove();
        arrayIngredientLength--;
        document.getElementById("recipeIngredientsTotal").options[0].value = arrayIngredientLength;
        document.getElementById("recipeIngredientsTotal").options[0].textContent = arrayIngredientLength;
    }
})

//step add button
var arrayStepLength = document.getElementsByClassName("stepAddRemoveLocation")[0].querySelectorAll("input").length;
document.getElementById("recipeStepsTotal").options[0].value = arrayStepLength;
document.getElementById("recipeStepsTotal").options[0].textContent = arrayStepLength;

document.querySelector(".stepAddButton").addEventListener("click", function() {
    // Variables
    var addLocation = document.getElementsByClassName("stepAddRemoveLocation")[0];
    arrayStepLength++;
    var createDivCol = document.createElement("div");
    var createDivRow = document.createElement("div");
    var createSpan = document.createElement("span");
    var createInput = document.createElement("input");

    document.getElementById("recipeStepsTotal").options[0].value = arrayStepLength;
    document.getElementById("recipeStepsTotal").options[0].textContent = arrayStepLength;

    // Add content to span node
    createSpan.textContent = arrayStepLength + ". ";
    // Creates external div with bootstrap col value
    addLocation.appendChild(createDivCol);
    addLocation.lastChild.setAttribute("class","col-6 step-ingredient-number");
    // Sets Variable for div injection location
    var innerDivLoc = addLocation.getElementsByTagName("div").length;
    // Creates internal div with bootstrap row value
    addLocation.getElementsByTagName("div")[innerDivLoc-1].appendChild(createDivRow);
    addLocation.getElementsByTagName("div")[innerDivLoc-1].lastChild.setAttribute("class","row no-gutters");
    // Creates span with ingredient # and bootstrap col value
    addLocation.getElementsByTagName("div")[innerDivLoc].appendChild(createSpan);
    addLocation.getElementsByTagName("div")[innerDivLoc].lastChild.setAttribute("class", "col-1");
//    addLocation.getElementsByTagName("div")[innerDivLoc].lastChild.setAttribute("style", "text-align: end;");
    // Creates input with form information and bootstrap col value
    addLocation.getElementsByTagName("div")[innerDivLoc].appendChild(createInput);
    addLocation.getElementsByTagName("div")[innerDivLoc].lastChild.setAttribute("class", "col-11");
    addLocation.getElementsByTagName("div")[innerDivLoc].lastChild.setAttribute("type","text");
    addLocation.getElementsByTagName("div")[innerDivLoc].lastChild.setAttribute("id","recipeSteps-" + arrayStepLength);
    addLocation.getElementsByTagName("div")[innerDivLoc].lastChild.setAttribute("name","recipeSteps-" + arrayStepLength);



//    addLocation.appendChild(createInput);
//    addLocation.lastChild.setAttribute("type", "text");
//    addLocation.lastChild.setAttribute("id", "recipesteps-" + arrayStepLength);
 //   addLocation.lastChild.setAttribute("name", "recipesteps-" + arrayStepLength);
})

//step remove button
document.querySelector(".stepRemoveButton").addEventListener("click", function () {
    var removeLocation = document.getElementsByClassName("stepAddRemoveLocation")[0];
    if (arrayStepLength>0){
        childTotal = document.getElementsByClassName("stepAddRemoveLocation")[0].children.length
        removeLocation.children[childTotal-1].remove();
        arrayStepLength--;
        document.getElementById("recipeStepsTotal").options[0].value = arrayStepLength;
        document.getElementById("recipeStepsTotal").options[0].textContent = arrayStepLength;
    }
})

document.getElementById("custom-button").addEventListener("click", function() {
    document.getElementById("recipeIngredientsTotal").removeAttribute("disabled");
    document.getElementById("recipeStepsTotal").removeAttribute("disabled");
})

// 