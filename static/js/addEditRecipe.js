// ---- Changing Total Time
var findTime = document.querySelectorAll(".time");
findTime.forEach(useTime);
function useTime(item, index){
    item.addEventListener("change", function () {
        let time1 = document.getElementById("prepTime").value;
        console.log(time1)
        let time2 = document.getElementById("cookTime").value;
        console.log(document.getElementById("totalTime").value)

        document.getElementById("totalTime").value = parseInt(time1) + parseInt(time2);
    })
}

// ---- Create/Remove boxes for user input of ingredients/steps
function createRemoveFormBoxes(addRemoveLoc, totalLocId, addButton, arrayClass, removeButton, inputOrTextarea, totalItemsLocation, countStepsIngreds) {
    let arrayIngredientLength = document.querySelectorAll(countStepsIngreds).length;
    //let totalLoc = document.getElementById(totalLocId).options[0]; //-----------------------------------number location
    let totalLoc = document.getElementById(totalLocId).getElementsByTagName("span")[0]; //-----------------------------------number location
    let addRemoveLocation = document.getElementsByClassName(addRemoveLoc)[0];
    totalLoc.value = arrayIngredientLength;
    totalLoc.textContent = arrayIngredientLength;
    document.getElementById(totalItemsLocation).value = arrayIngredientLength;

    // ingredient Add Button -- Dynamically adds extra boxes for user input for recipe ingredients
    document.querySelector(addButton).addEventListener("click", function() {
        // Increases box count variable
        arrayIngredientLength++;
        // Creation of elements and adding of content
        let createDivCol = document.createElement("div");
        createDivCol.className = "col-12 col-md-6"
        let createDivRow = document.createElement("div");
        createDivRow.className = "row no-gutters align-items-center step-ingredient-spacing"
        let createSpan = document.createElement("span");
        createSpan.textContent = arrayIngredientLength + ". ";
        createSpan.className = ""
        let createInput = document.createElement(inputOrTextarea);

        createInput.className = "col-11"
        createInput.id = arrayClass + arrayIngredientLength
        createInput.name = arrayClass + arrayIngredientLength
        createInput.type = "text"
        if(inputOrTextarea == "textarea"){
            createInput.rows = "3"
            createInput.cols = "20"
        }

        // sets Value of select for user to see the number of availiable boxes
        totalLoc.value = arrayIngredientLength;
        totalLoc.textContent = arrayIngredientLength;
        document.getElementById(totalItemsLocation).value = arrayIngredientLength

        // Creates boxes with structure div(div(span, input))
        addRemoveLocation.appendChild(createDivCol);
        // Sets Variable for div injection location
        let innerDivLoc = addRemoveLocation.getElementsByTagName("div").length;
        addRemoveLocation.getElementsByTagName("div")[innerDivLoc-1].appendChild(createDivRow);
        addRemoveLocation.getElementsByTagName("div")[innerDivLoc].appendChild(createSpan);
        addRemoveLocation.getElementsByTagName("div")[innerDivLoc].appendChild(createInput);
    })
    // Removes boxes
    document.querySelector(removeButton).addEventListener("click", function() {
        if (arrayIngredientLength > 1){
            childTotal = addRemoveLocation.children.length
            addRemoveLocation.children[childTotal-1].remove();
            // Decreases box count variable
            arrayIngredientLength--;
            // sets Value of select for user to see the number of availiable boxes
            totalLoc.value = arrayIngredientLength;
            totalLoc.textContent = arrayIngredientLength;
            document.getElementById(totalItemsLocation).value = arrayIngredientLength
        }
    })
}

//createRemoveFormBoxes("ingredientAddRemoveLocation", "recipeIngredientsTotal", ".recipeAddButton", "recipeIngredients-", ".recipeRemoveButton");
createRemoveFormBoxes("ingredientAddRemoveLocation", "ingredientNumber", ".recipeAddButton", "recipeIngredients-", ".recipeRemoveButton", "input", "recipeIngredientsTotal" ,".countIngredients");
createRemoveFormBoxes("stepAddRemoveLocation", "stepNumber", ".stepAddButton", "recipeSteps-", ".stepRemoveButton", "textarea", "recipeStepsTotal", ".countSteps");

// Removes disabled attribute tag when submit button is pushed (so form can be read)
// Adds randomly generated image name
document.getElementById("custom-button").addEventListener("click", function() {
    //document.getElementById("recipeIngredientsTotal").removeAttribute("disabled");
    //document.getElementById("recipeStepsTotal").removeAttribute("disabled");
    document.getElementById("avatar_name").setAttribute("value", imageName);
    document.getElementById("totalTime").removeAttribute("disabled")
    if (document.getElementById("avatar").value != ""){
        document.getElementById("avatar_file_valid").value = true;
    }
})

// ---- Avatar validation information
// Creates a random string for image name assignment
const characterLibrary = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_@!&,?0123456789"
const characterLibraryLength = characterLibrary.length;
var imageName = ""
for (let i=0; i<20; i++){
    let characterLibraryIndex = Math.floor(Math.random()*(characterLibraryLength));
    imageName += characterLibrary[characterLibraryIndex];
}



// Check file size
document.getElementById("avatar").addEventListener("change", function() {
    let loc = document.getElementById("avatar")
    let fileSize = loc.files[0].size;
    if (fileSize > 500000) {
        loc.value = null;
        loc.classList.add("invalid");
        document.getElementById("avatar_valid").classList.remove("make-invis");
    } else if (fileSize < 500000 && loc.classList.contains("invalid")){
        loc.classList.remove("invalid");
        document.getElementById("avatar_valid").classList.add("make-invis");
    }
})