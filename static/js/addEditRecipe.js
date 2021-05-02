// ---- General ----
// ----Removes all flash messages after 7 seconds
if (document.getElementById("flash").getElementsByTagName("div")[0]){
    setTimeout( function () {
        let flashRm = document.querySelectorAll(".flash").length;
        for (let flashCount = 0; flashCount < flashRm; flashCount++){
            var divRemove = document.getElementsByClassName("flash")[0];
            divRemove.remove();
        }
    },7000);
}

// ----Social link animation
// Function to make social links have rippling liquid effect with dipping ice
function makeRipples (targetLink) {
    let targetLiquid = targetLink.getElementsByTagName("span")[0];
    let targetIce = targetLink.getElementsByTagName("i")[0];
    // Start animation
    targetIce.classList.add("dipping-ice");
    targetLiquid.classList.add("create-ripple");
    // Reset animation after 3 seconds
    setTimeout(function () {
        targetIce.classList.remove("dipping-ice");
        targetLiquid.classList.remove("create-ripple");
    },3500);
}

//Adds ripple effect to mouse over event listeners for social links
var findLinks = document.querySelectorAll(".social-position");
findLinks.forEach(selectLinks);
function selectLinks (link) {
    // for mouse users
    link.addEventListener("mouseenter", function() {
        makeRipples (link);
    });
    // for touch screen users
    link.addEventListener("touchmove", function() {
        makeRipples (link);
    },{passive:true});
}


// ----addeditrecipe ----
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
    });
}

// ---- Create/Remove boxes for user input of ingredients/steps
function createRemoveFormBoxes(addRemoveLoc, totalLocId, addButton, arrayClass, removeButton, inputOrTextarea, totalItemsLocation, countStepsIngreds) {
    let arrayIngredientLength = document.querySelectorAll(countStepsIngreds).length; // Counts number of present boxes
    let totalLoc = document.getElementById(totalLocId).getElementsByTagName("span")[0]; // User visible box number counter location
    let addRemoveLocation = document.getElementsByClassName(addRemoveLoc)[0]; // Parent of all boxes to be added/removed

    // Updates box counters for form input and user experience
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
        createDivRow.className = "row no-gutters align-items-center step-ingredient-spacing step-ingredient-input";
        let createSpan = document.createElement("span");
        // createSpan.className = "";
        let createSpanP = document.createElement("p");
        createSpanP.textContent = arrayIngredientLength + ". ";
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
        addRemoveLocation.getElementsByTagName("div")[innerDivLoc].getElementsByTagName("span")[0].appendChild(createSpanP);
        addRemoveLocation.getElementsByTagName("div")[innerDivLoc].appendChild(createInput);
    });

    // Removes last box in list and updates total box count when remove button is clicked
    document.querySelector(removeButton).addEventListener("click", function() {
        // Defensive, forces users to keep a single box on page
        if (arrayIngredientLength > 1){
            let  childTotal = addRemoveLocation.children.length;
            addRemoveLocation.children[childTotal-1].remove();
            // Updates box count variable and counters
            arrayIngredientLength--;
            updateBoxCounters();
        }
    });
}
//Creates functionality for ingredient add/remove buttons
createRemoveFormBoxes("ingredientAddRemoveLocation", "ingredientNumber", ".recipeAddButton", "ingredients-", ".recipeRemoveButton", "input", "ingredientsTotal" ,".countIngredients");
//Creates functionality for step add/remove buttons
createRemoveFormBoxes("stepAddRemoveLocation", "stepNumber", ".stepAddButton", "steps-", ".stepRemoveButton", "textarea", "stepsTotal", ".countSteps");

// Removes disabled attribute tag when submit button is pushed so information can be accessed
// If new avatar image present sdds randomly generated image name
document.getElementById("custom-button").addEventListener("click", function(submitForm) {
    document.getElementById("avatar_name").setAttribute("value", imageName);
    document.getElementById("time3").removeAttribute("disabled");
    // If new avatar present gives it a random generation name
    if (document.getElementById("avatar").value != ""){
        document.getElementById("avatar_file_valid").value = true;
    }
});


// ----avatar validation ----
// ---- Create Random Avatar name
// Creates a random string for image name assignment
const characterLibrary = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_@!&,?0123456789";
const characterLibraryLength = characterLibrary.length;
var imageName = "";
// Creates a random 20 character Image name
for (let i=0; i<20; i++){
    let characterLibraryIndex = Math.floor(Math.random()*(characterLibraryLength));
    imageName += characterLibrary[characterLibraryIndex];
}

// ---- Avatar Image Validation
// Check file size
document.getElementById("avatar").addEventListener("change", function() {
    let loc = document.getElementById("avatar");
    let fileSize = loc.files[0].size;
    // Validates according to filsize
    if (fileSize > 500000) {
        loc.value = null;
        loc.classList.add("invalid");
        document.getElementById("avatar_valid").classList.remove("make-invis");
    } else if (fileSize < 500000 && loc.classList.contains("invalid")){
        loc.classList.remove("invalid");
        document.getElementById("avatar_valid").classList.add("make-invis");
    }
});


// ----button ----
let jsButtonFind = document.querySelectorAll(".custom-js-button");
jsButtonFind.forEach(jsButtonSelect);
function jsButtonSelect(button) {
    button.addEventListener("click", function(pushButton){
        button.classList.add("custom-button-press-outer");
        button.getElementsByClassName("sticky-note-inner-div")[0].classList.add("custom-button-press");
        if(button.id == "deleteModal"){
            setTimeout(function(unpushButton){
                button.classList.remove("custom-button-press-outer");
                button.getElementsByClassName("sticky-note-inner-div")[0].classList.remove("custom-button-press");
            },3000);
        }
    });
}