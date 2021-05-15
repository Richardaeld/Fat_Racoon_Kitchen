//form REGEX
const matchTypeUpper = /[A-Z]/;
const matchTypeLower = /[a-z]/;
const matchTypeNumber = /[0-9]/;
const matchTypeGoodCharacter = /[!|@|#|%|&|*|_|+|=|?|.|'|/|-]/;
const matchTypeTextCharacter = /[,|"| ]/;
const matchTypeSpaces =  /[ ]/g; // Follow with g to make global
const matchTypeAtSign = /[@]/;
const matchTypeDotCom = /.com/;
const matchTypeDotEdu = /.edu/;
const matchTypeDotNet = /.net/;
const matchTypeDotOrg = /.org/;

var formIsValid = false;  // Presets validation for initial run

// ----- Final Validation check
// Adds/Removes disabled from submit button according to invalids found on form
// Adds/Removes parent validation container to be visible or invisible for invalid commits
// Adds/Removes invalid color to input container
function finalValidation(validationLoc) {
    let findFormInputs = document.querySelectorAll(validationLoc);
    findFormInputs.forEach(selectFormInputs);
    function selectFormInputs(finalVal) {

        currentFormValid = true // Sets macro form validation setting

        let checkPLength = finalVal.parentElement.getElementsByTagName("p");  // Finds all p's to iteration validation over
        // Searches form for invalid input and sets Global/Macro validation
        for (let i=0; i< checkPLength.length; i++){
            let validCheck = finalVal.parentElement.getElementsByTagName("p")[i].classList.contains("make-invis")
            if(validCheck == false){
                formIsValid = false;
                currentFormValid = false;
            }
        }

        // Adds/Removes disable to submit button according to validation (Global Validation)
        if(formIsValid) {
            document.getElementById("custom-button").removeAttribute("disabled");
        } else {
            document.getElementById("custom-button").setAttribute("disabled", "");
        }
        // Adds/Removes invalid color
        // Adds/Removes parent validation container's abaility to display (Macro Validation)
        if (currentFormValid) {
            finalVal.parentElement.getElementsByTagName("div")[0].classList.add("form-is-valid");
            finalVal.removeAttribute("invalid");
            finalVal.classList.remove("form-invalid-view");
        } else {
            // Reveals parent validation container of clicked item if form invalidates
            if (document.activeElement == finalVal){
                finalVal.parentElement.getElementsByTagName("div")[0].classList.remove("make-invis")
            }
            finalVal.parentElement.getElementsByTagName("div")[0].classList.remove("form-is-valid");
            finalVal.setAttribute("invalid", "");
            finalVal.classList.add("form-invalid-view"); 
        }
    }
}

// ---- Base Validation starting point
// basic (start) validation function
function baseValidation (inputSelector, validationSelector) {
    var findPasswords = document.querySelectorAll(inputSelector);
    findPasswords.forEach(selectPasswords);
    function selectPasswords(baseVal){
        let baseValPara = baseVal.parentElement.getElementsByTagName("p");  // Finds the location of the invalid commits

        // Makes validation bubble visible on focus 
        baseVal.addEventListener("focus", function() {
            validCheck = true  // Presets valitation to valid
            let checkPLengthTemp = baseVal.parentElement.getElementsByTagName("p");  // Finds all p's to iteration validation over
            // Enables validation bubble according to Macro Validation
            for (let i=0; i< checkPLengthTemp.length; i++){
                validCheck = baseVal.parentElement.getElementsByTagName("p")[i].classList.contains("make-invis")  // Sets variable according to if its valid
                // Sets Macro Validation variable
                if(validCheck == false){
                    formIsValid = false;
                }
            }
            // Disables validation bubble according to Macro Validation
            if (formIsValid == false) {
                baseVal.parentElement.getElementsByTagName("div")[0].classList.remove("make-invis");
            }
        });

        // Hides validation bubble on blur
        baseVal.addEventListener("blur", function() {
            baseVal.parentElement.getElementsByTagName("div")[0].classList.add("make-invis");
        });

        // Applies validation check on every keyup stroke
        baseVal.addEventListener("keyup", baseValidationCheck);
        baseVal.addEventListener("click", baseValidationCheck);
        function baseValidationCheck() {
            if(validationSelector !== "text" && validationSelector !=="recipeGeneral" && validationSelector !== "time"){
                // Replaces all spaces with '_'
                if(baseVal.value.match(matchTypeSpaces)){
                    baseVal.value = baseVal.value.replace(matchTypeSpaces, "_");
                } 
            }

            // Checks all individual characters for valid character input
            for (i=0; i< baseVal.value.length; i++){
                char = baseVal.value[i]  // Character being checked
                if (validationSelector === "text" || validationSelector === "recipeGeneral" ){
                // Checks for improper characters and sets validation
                    if (char.match(matchTypeGoodCharacter) == null && char.match(matchTypeTextCharacter) == null && char.match(matchTypeUpper) == null && char.match(matchTypeLower) == null  && char.match(matchTypeNumber) == null) {
                        baseValPara[2].classList.remove("make-invis");
                        break
                    } else {
                        baseValPara[2].classList.add("make-invis");
                    }
                } else if (validationSelector === "time") {
                    if (char.match(matchTypeNumber) == null) {
                        baseValPara[2].classList.remove("make-invis");
                        break
                    } else {
                        baseValPara[2].classList.add("make-invis");
                    }
                } else{
                    if (char.match(matchTypeGoodCharacter) == null && char.match(matchTypeUpper) == null && char.match(matchTypeLower) == null && char.match(matchTypeNumber) == null) {
                        baseValPara[2].classList.remove("make-invis");
                        break
                    } else {
                        baseValPara[2].classList.add("make-invis");
                    }
                }
            }

            // Validation for text character total
            if(validationSelector === "text"){
                if(baseVal.value.length >= 0 && baseVal.value.length <= 400){
                    baseValPara[0].classList.add("make-invis");
                }else{
                    baseValPara[0].classList.remove("make-invis");
                }
            // Validation for recipeGeneral character total
            } else if(validationSelector === "recipeGeneral"){
                if(baseVal.value.length >= 3 && baseVal.value.length <= 400){
                    baseValPara[0].classList.add("make-invis");
                }else{
                    baseValPara[0].classList.remove("make-invis");
                }
            } else if (validationSelector === "time"){
                // Validates if correct amount of characters present
                if(baseVal.value.length > 0 && baseVal.value.length < 4){
                    baseValPara[0].classList.add("make-invis");
                } else {
                    baseValPara[0].classList.remove("make-invis");
                }
                // Validates for name/username
            } else if (validationSelector === "name"){
                // Validates if correct amount of characters present
                if(baseVal.value.length >= 4 && baseVal.value.length <= 100){
                    baseValPara[0].classList.add("make-invis");
                } else {
                    baseValPara[0].classList.remove("make-invis");
                }
            // Validation for password
            } else if (validationSelector === "password"){    
                // Validates the form if correct amount of upper character, total characters, numbers and total characters are found
                if(baseVal.value.match(matchTypeUpper) && baseVal.value.match(matchTypeLower) && baseVal.value.match(matchTypeNumber) && baseVal.value.length >= 8 && baseVal.value.length <= 20){
                    baseValPara[0].classList.add("make-invis");
                }else{
                    baseValPara[0].classList.remove("make-invis");
                }
            // Validation for email
            } else if(validationSelector === "email") {
                // Validates for total characters found
                if (baseVal.value.length >= 4 && baseVal.value.length <= 255){
                    baseValPara[0].classList.add("make-invis");
                } else {
                    baseValPara[0].classList.remove("make-invis");
                }

                // Validates for email suffix ('.com', '.edu', '.net') and '@'
                let emailLength = baseVal.value.length;
                if  (emailLength >= 4 ){
                    var checkEmailValue = "";   // Presets string to add suffix email to
                    // Uses last 4 digits to check for suffix
                    for (let i = 3; i >= 0; i--){
                        checkEmailValue += baseVal.value[(emailLength - 1) - i];
                    }
                    if (checkEmailValue.match(matchTypeDotCom)){ // checks for .com
                        baseValPara[1].classList.add("make-invis");
                    } else if (checkEmailValue.match(matchTypeDotEdu)){ // checks for .edu
                        baseValPara[1].classList.add("make-invis");
                    } else if (checkEmailValue.match(matchTypeDotNet)) {// checks for .net
                        baseValPara[1].classList.add("make-invis");
                    } else if (checkEmailValue.match(matchTypeDotOrg)) {// checks for .org
                        baseValPara[1].classList.add("make-invis");
                    } else {
                        baseValPara[1].classList.remove("make-invis");
                    }

                    if (baseVal.value.match(matchTypeAtSign) == null) { // Checks for @
                        baseValPara[1].classList.remove("make-invis");
                    }
                }
            }
            // Final validation of form
            // Not STD, finalValidation(".formValidation") call for addEditRecipe.js and editUserInfo.js ONLY
            formIsValid = true;
            finalValidation(".formValidation");
        }
    }
}

// Text validation
baseValidation(".textValidation", "text");
// Email validation
baseValidation(".emailValidation", "email");
// Name validation
baseValidation(".nameValidation", "name");
// Password validation
baseValidation(".passwordSets", "password");
// Recipe general content validation
baseValidation(".recipeGeneralValidation", "recipeGeneral");
// Recipe time validation
baseValidation(".timeValidation", "time");
// Recipe steps validation
baseValidation(".stepsValidation", "steps");

// Adds validation to dynamic input/textareas
function addValidation (validationLoc, validationSelector) {
        let valLocPara = validationLoc.parentElement.getElementsByTagName("p");  // Finds the location of the invalid commits
        // Makes validation bubble visible on focus 
        validationLoc.addEventListener("focus", function () {
            validCheck = true  // Presets valitation to valid
            let checkPLengthTemp = validationLoc.parentElement.getElementsByTagName("p");  // Finds all p's to iterate validation over
            
            // Enables validation bubble according to Macro Validation
            for (let i=0; i< checkPLengthTemp.length; i++){
                // Sets a validation variable as it checks over all possible invalidation points
                validCheck = validationLoc.parentElement.getElementsByTagName("p")[i].classList.contains("make-invis")  // Sets variable according to if its valid
                // Sets Macro Validation variable
                if(validCheck == false){
                    formIsValid = false;
                }
            }
            // Disables validation bubble according to Macro Validation
            if (formIsValid == false) {
                validationLoc.parentElement.getElementsByTagName("div")[0].classList.remove("make-invis");
            }
        });
        // Hides validation bubble on blur
        validationLoc.addEventListener("blur", invisInvalidation)
        function invisInvalidation() {
            validationLoc.parentElement.getElementsByTagName("div")[0].classList.add("make-invis");
        }
        // Applies validation check on every keyup stroke
        validationLoc.addEventListener("keyup", validateOnKeyStroke)
        function validateOnKeyStroke () {
            // Iterates over all individual input characters
            for (i=0; i< validationLoc.value.length; i++){
                char = validationLoc.value[i]  // Character being checked
                // Checks for improper characters and sets validation
                if (char.match(matchTypeGoodCharacter) == null && char.match(matchTypeTextCharacter) == null && char.match(matchTypeUpper) == null && char.match(matchTypeLower) == null  && char.match(matchTypeNumber) == null) {
                    valLocPara[2].classList.remove("make-invis");
                    break
                } else {
                    valLocPara[2].classList.add("make-invis");
                }
            }

            // Validation for text character total
            if(validationSelector === "text"){
                if(validationLoc.value.length >= 0 && validationLoc.value.length <= 400){
                    valLocPara[0].classList.add("make-invis");
                }else{
                    valLocPara[0].classList.remove("make-invis");
                }
            // Validation for recipeGeneral character total
            } else if (validationSelector === "recipeGeneral"){
                if(validationLoc.value.length >= 3 && validationLoc.value.length <= 400){
                    valLocPara[0].classList.add("make-invis");
                }else{
                    valLocPara[0].classList.remove("make-invis");
                }
            }
            // final validation of form
            // Not STD, finalValidation(".formValidation") call for addEditRecipe.js and editUserInfo.je ONLY
            formIsValid = true;
            finalValidation(".formValidation");
        }
    }

// ---- General ----
// ----Removes all flash messages after 10 seconds
if (document.getElementById("flash").getElementsByTagName("div")[0]){
    setTimeout( function () {
        let flashRm = document.querySelectorAll(".flash").length;
        for (let flashCount = 0; flashCount < flashRm; flashCount++){
            var divRemove = document.getElementsByClassName("flash")[0];
            divRemove.remove();
        }
    },10000);
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

// ---- Changes Total Time acording to prep and cook times being changed
var findTime = document.querySelectorAll(".time");
findTime.forEach(useTime);
function useTime(updateTime){
    updateTime.addEventListener("change", function () {
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

        // Creation of elements and adding of content into new step/ingredient content
        let createContainer = document.createElement("div");
        createContainer.className = "step-ingredient-spacing";
        let createH6 = document.createElement("h6");
        createH6.classList = "reduce-h6"
        let validationDiv = document.createElement("div")
        validationDiv.classList = "invalid-form form-is-valid make-invis"
        let val1P = document.createElement("p")
        val1P.textContent = "Must be between 3 and 400 characters"
        val1P.classList = "make-invis remove-p-margin"
        let val2P = document.createElement("p")
        val2P.textContent = ""
        val2P.classList = "make-invis remove-p-margin"
        let val3P = document.createElement("p")
        val3P.textContent = "Can only contain a-z, A-Z, 0-9, and !@#%&*_+-=?.'/" + '",';
        val3P.classList = "make-invis remove-p-margin"
        let createInput = document.createElement(inputOrTextarea);
        createInput.className = "formValidation recipeGeneralValidation"; //col-10
        createInput.id = arrayClass + arrayIngredientLength;
        createInput.name = arrayClass + arrayIngredientLength;
        createInput.type = "text";
        // Adds extra classes if textarea
        if(inputOrTextarea == "textarea"){
            createH6.textContent =  "Step " + arrayIngredientLength;
            createInput.rows = "3";
            createInput.cols = "20";
        } else {
            createH6.textContent = "Ingredient " + arrayIngredientLength;
        }

        // Creates inital box
        addRemoveLocation.appendChild(createContainer);
        // Creates Variable for insert location and inserts complete box structure
        let innerDivLoc = addRemoveLocation.getElementsByTagName("div").length;
        addRemoveLocation.getElementsByTagName("div")[innerDivLoc-1].appendChild(createH6);
        addRemoveLocation.getElementsByTagName("div")[innerDivLoc-1].appendChild(createInput);
        addRemoveLocation.getElementsByTagName("div")[innerDivLoc-1].appendChild(validationDiv);
        addRemoveLocation.getElementsByTagName("div")[innerDivLoc].appendChild(val1P);
        addRemoveLocation.getElementsByTagName("div")[innerDivLoc].appendChild(val2P);
        addRemoveLocation.getElementsByTagName("div")[innerDivLoc].appendChild(val3P);
        // Adds Validation to newly created container
        addValidation(addRemoveLocation.getElementsByTagName("div")[innerDivLoc-1].getElementsByTagName(inputOrTextarea)[0], "recipeGeneral")
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
// If new avatar image present adds randomly generated avatar name
document.getElementById("custom-button").addEventListener("click", function() {
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
// ---- Button (Non-form submit buttons) ----
let jsButtonFind = document.querySelectorAll(".custom-js-button");
jsButtonFind.forEach(jsButtonSelect);
function jsButtonSelect(button) {
    button.addEventListener("click", function(){
        button.classList.add("custom-button-press-outer");
        button.getElementsByClassName("sticky-note-inner-div")[0].classList.add("custom-button-press");
        if(button.id == "deleteModal"){
            setTimeout(function(){
                button.classList.remove("custom-button-press-outer");
                button.getElementsByClassName("sticky-note-inner-div")[0].classList.remove("custom-button-press");
            },3000);
        }
    });
}
// ---- Button (form submit buttons) ----
document.getElementById("custom-button").addEventListener("click", function () {
    document.getElementById("custom-button").classList.add("custom-button-press");
});
