// ---- Changes Total Time acording to prep and cook times being changed
var findTime = document.querySelectorAll(".time");
findTime.forEach(useTime);
function useTime(updateTime){
    updateTime.addEventListener("change", function (changeTime) {
        //Finds prep and cook time
        let time1 = document.getElementById("time1").value;
        let time2 = document.getElementById("time2").value;
        // Updates total time by adding prep and cook time
        document.getElementById("time3").value = parseInt(time1) + parseInt(time2);
    })
}

// ---- Create/Remove boxes for user input of ingredients/steps
function createRemoveFormBoxes(addRemoveLoc, totalLocId, addButton, arrayClass, removeButton, inputOrTextarea, totalItemsLocation, countStepsIngreds) {
    let arrayIngredientLength = document.querySelectorAll(countStepsIngreds).length; // Counts number of present boxes
    let totalLoc = document.getElementById(totalLocId).getElementsByTagName("span")[0]; // User visible box number counter location
    let addRemoveLocation = document.getElementsByClassName(addRemoveLoc)[0]; // Parent of all boxes to be added/removed

    // Updates box counters for from input and user UX
    function updateBoxCounters() {
        totalLoc.textContent = arrayIngredientLength;
        document.getElementById(totalItemsLocation).value = arrayIngredientLength;
    }
    // Initial update for counters
    updateBoxCounters();

    // Creates additional boxes when add button is clicked
    document.querySelector(addButton).addEventListener("click", function() {
        // Updates, Increases counter for created box
        arrayIngredientLength++;
        updateBoxCounters();

        // Box structure: div(div(span, input))
        // Creation of elements and adding of content
        let createDivCol = document.createElement("div");
        createDivCol.className = "col-12 col-md-6";
        let createDivRow = document.createElement("div");
        createDivRow.className = "row no-gutters align-items-center step-ingredient-spacing";
        let createSpan = document.createElement("span");
        createSpan.textContent = arrayIngredientLength + ". ";
        createSpan.className = "col-1"
        let createInput = document.createElement(inputOrTextarea);
        createInput.className = "col-11";
        createInput.id = arrayClass + arrayIngredientLength;
        createInput.name = arrayClass + arrayIngredientLength;
        createInput.type = "text";
        // Adds extra classes if textarea
        if(inputOrTextarea == "textarea"){
            createInput.rows = "3";
            createInput.cols = "20";
        }

        // Creates inital box
        addRemoveLocation.appendChild(createDivCol);
        // Creates Variable for insert location and inserts complete box structure
        let innerDivLoc = addRemoveLocation.getElementsByTagName("div").length;
        addRemoveLocation.getElementsByTagName("div")[innerDivLoc-1].appendChild(createDivRow);
        addRemoveLocation.getElementsByTagName("div")[innerDivLoc].appendChild(createSpan);
        addRemoveLocation.getElementsByTagName("div")[innerDivLoc].appendChild(createInput);
    })

    // Removes last box in list and updates total box count when remove button is clicked
    document.querySelector(removeButton).addEventListener("click", function() {
        // Defensive, forces users to keep a single box on page
        if (arrayIngredientLength > 1){
            childTotal = addRemoveLocation.children.length;
            addRemoveLocation.children[childTotal-1].remove();
            // Updates box count variable and counters
            arrayIngredientLength--;
            updateBoxCounters();
        }
    })
}
//Creates functionality for ingredient add/remove buttons
createRemoveFormBoxes("ingredientAddRemoveLocation", "ingredientNumber", ".recipeAddButton", "recipeIngredients-", ".recipeRemoveButton", "input", "recipeIngredientsTotal" ,".countIngredients");
//Creates functionality for step add/remove buttons
createRemoveFormBoxes("stepAddRemoveLocation", "stepNumber", ".stepAddButton", "recipeSteps-", ".stepRemoveButton", "textarea", "recipeStepsTotal", ".countSteps");

// Removes disabled attribute tag when submit button is pushed so information can be accessed
// If new avatar image present sdds randomly generated image name
document.getElementById("custom-button").addEventListener("click", function(submitForm) {
    document.getElementById("avatar_name").setAttribute("value", imageName);
    document.getElementById("time3").removeAttribute("disabled");
    // If new avatar present gives it a random generation name
    if (document.getElementById("avatar").value != ""){
        document.getElementById("avatar_file_valid").value = true;
    }
})
