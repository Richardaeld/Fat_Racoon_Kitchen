//--------------------------------------------------------update validation and change variables  -------------------------------------------------


// ---- Form Validation for passwords
//form REGEX
// const matchAcceptedInput = /[]/;
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
// Sets or removes invalid bubble and invalid attributes
function finalValidation(validationLoc) {

    let findFormInputs = document.querySelectorAll(validationLoc);
    findFormInputs.forEach(selectFormInputs);
    function selectFormInputs(finalVal) {

        currentFormValid = true // Sets macro form validation setting

        let checkPLength = finalVal.parentElement.getElementsByTagName("p");  // Finds all p's to iteration validation over
        //enables and disables validation bubble according to if input is valid or not
        for (let i=0; i< checkPLength.length; i++){
            let validCheck = finalVal.parentElement.getElementsByTagName("p")[i].classList.contains("make-invis")
            if(validCheck == false){
                formIsValid = false;
                currentFormValid = false;
            }
        }

        // Validates on global form
        if(formIsValid) {
            document.getElementById("custom-button").removeAttribute("disabled");
        } else {
            document.getElementById("custom-button").setAttribute("disabled", "");
        }
        // Validates on macro level
        if (currentFormValid) {
            finalVal.parentElement.getElementsByTagName("div")[0].classList.add("form-is-valid");
            finalVal.removeAttribute("invalid");
            finalVal.classList.remove("form-invalid-view");
        } else {
            // Reveals box if form invalidates
            if (document.activeElement == finalVal){
                finalVal.parentElement.getElementsByTagName("div")[0].classList.remove("make-invis")
            }
            finalVal.parentElement.getElementsByTagName("div")[0].classList.remove("form-is-valid");
            finalVal.setAttribute("invalid", "");
            finalVal.classList.add("form-invalid-view"); 
        }
    }
}



// ---------------------------------------------add responsiveness to dynamic forms
        
function addValidation (validationLoc, validationSelector) {
        let valLocPara = validationLoc.parentElement.getElementsByTagName("p");
        // Makes validation bubble visible on focus 
        validationLoc.addEventListener("focus", function (stopme) {
            validCheck = true
            let checkPLengthTemp = validationLoc.parentElement.getElementsByTagName("p");  // Finds all p's to iteration validation over
            
            //enables and disables validation bubble according to if input is valid or not
            for (let i=0; i< checkPLengthTemp.length; i++){
                // Sets a validation variable as it checks over all possible invalidation points
                validCheck = validationLoc.parentElement.getElementsByTagName("p")[i].classList.contains("make-invis")
                if(validCheck == false){
                    formIsValid = false;
                }
            }

            if (formIsValid == false) {
                validationLoc.parentElement.getElementsByTagName("div")[0].classList.remove("make-invis");
            }
        });



        // Makes validation bubble hidden on blur
        validationLoc.addEventListener("blur", invisInvalidation)
        function invisInvalidation() {
            validationLoc.parentElement.getElementsByTagName("div")[0].classList.add("make-invis");
        }


        // Applies validation check on every keyup stroke
        validationLoc.addEventListener("keyup", validateOnKeyStroke)
        function validateOnKeyStroke () {
            // Checks for acceptiable characters
            for (i=0; i< validationLoc.value.length; i++){
                char = validationLoc.value[i]
                if (char.match(matchTypeGoodCharacter) == null && char.match(matchTypeTextCharacter) == null && char.match(matchTypeUpper) == null && char.match(matchTypeLower) == null  && char.match(matchTypeNumber) == null) {
                    valLocPara[2].classList.remove("make-invis");
                    break
                } else {
                    valLocPara[2].classList.add("make-invis");
                }
            }

            // Validation for text
            if(validationSelector === "text"){
                if(validationLoc.value.length >= 0 && validationLoc.value.length <= 400){
                    valLocPara[0].classList.add("make-invis");
                }else{
                    valLocPara[0].classList.remove("make-invis");
                }
            }

            // Validation for general recipe text
            if(validationSelector === "recipeGeneral"){
                if(validationLoc.value.length >= 5 && validationLoc.value.length <= 100){
                    valLocPara[0].classList.add("make-invis");
                }else{
                    valLocPara[0].classList.remove("make-invis");
                }
            }

            // final validation of form
            formIsValid = true;
            finalValidation(".formValidation");

        }
    }


// ---------------------------------------------------------------------------------





// ---- Base Validation starting point
// basic (start) validation function
function baseValidation (inputSelector, validationSelector, userInputType) {
    var findPasswords = document.querySelectorAll(inputSelector);
    findPasswords.forEach(selectPasswords);
    function selectPasswords(baseVal){
        let baseValPara = baseVal.parentElement.getElementsByTagName("p");

        // Makes validation bubble visible on focus 
        baseVal.addEventListener("focus", function (stopme) {
            validCheck = true
            let checkPLengthTemp = baseVal.parentElement.getElementsByTagName("p");  // Finds all p's to iteration validation over
            
            //enables and disables validation bubble according to if input is valid or not
            for (let i=0; i< checkPLengthTemp.length; i++){
                // Sets a validation variable as it checks over all possible invalidation points
                validCheck = baseVal.parentElement.getElementsByTagName("p")[i].classList.contains("make-invis")
                if(validCheck == false){
                    formIsValid = false;
                }
            }

            if (formIsValid == false) {
                baseVal.parentElement.getElementsByTagName("div")[0].classList.remove("make-invis");
            }
        });

        // Makes validation bubble hidden on blur
        baseVal.addEventListener("blur", invisInvalidation)
        function invisInvalidation() {
            baseVal.parentElement.getElementsByTagName("div")[0].classList.add("make-invis");
        }

        // Applies validation check on every keyup stroke
        baseVal.addEventListener("keyup", validateOnKeyStroke)
        function validateOnKeyStroke () {
            // Replaces all spaces with '_'
            if(validationSelector !== "text" && validationSelector !== "recipeGeneral"){
                if(baseVal.value.match(matchTypeSpaces)){
                    baseVal.value = baseVal.value.replace(matchTypeSpaces, "_");
                } 
            }
            
            // Checks for acceptiable characters
            for (i=0; i< baseVal.value.length; i++){
                char = baseVal.value[i]
                if (validationSelector === "text" || validationSelector === "recipeGeneral"){
                    if (char.match(matchTypeGoodCharacter) == null && char.match(matchTypeTextCharacter) == null && char.match(matchTypeUpper) == null && char.match(matchTypeLower) == null  && char.match(matchTypeNumber) == null) {
                        baseValPara[2].classList.remove("make-invis");
                        break
                    } else {
                        baseValPara[2].classList.add("make-invis");
                    }
                } else {
                    if (char.match(matchTypeGoodCharacter) == null && char.match(matchTypeUpper) == null && char.match(matchTypeLower) == null && char.match(matchTypeNumber) == null) {
                        baseValPara[2].classList.remove("make-invis");
                        break
                    } else {
                        baseValPara[2].classList.add("make-invis");
                    }
                }
            }

            // Validation for text
            if(validationSelector === "text"){
                if(baseVal.value.length >= 0 && baseVal.value.length <= 400){
                    baseValPara[0].classList.add("make-invis");
                }else{
                    baseValPara[0].classList.remove("make-invis");
                }
            }

            // Validation for text
            if(validationSelector === "recipeGeneral"){
                if(baseVal.value.length >= 5 && baseVal.value.length <= 100){
                    baseValPara[0].classList.add("make-invis");
                }else{
                    baseValPara[0].classList.remove("make-invis");
                }
            }

            // Validation for password
            if(validationSelector === "password"){

                // Validates the form if correct amount of upper character, total characters and number are found
                if(baseVal.value.match(matchTypeUpper) && baseVal.value.match(matchTypeLower) && baseVal.value.match(matchTypeNumber) && baseVal.value.length >= 8 && baseVal.value.length <= 20){
                    baseValPara[0].classList.add("make-invis");
                }else{
                    baseValPara[0].classList.remove("make-invis");
                }

            // Validation for email
            } else if(validationSelector === "email") {

                // Validates for length
                if (baseVal.value.length >= 4 && baseVal.value.length <= 255){
                    baseValPara[0].classList.add("make-invis");
                } else {
                    baseValPara[0].classList.remove("make-invis");
                }

                // Validates for email suffix ('.com', '.edu', '.net') and '@'
                let emailLength = baseVal.value.length;
                if  (emailLength >= 4 ){
                    var checkEmailValue = "";
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

            //Validates for name/username
            } else if (validationSelector === "name"){
                // Validates if correct amount of characters present
                if(baseVal.value.length >= 4 && baseVal.value.length <= 100){
                    baseValPara[0].classList.add("make-invis");
                } else {
                    baseValPara[0].classList.remove("make-invis");
                }
            }

            // final validation of form
            formIsValid = true;
            finalValidation(".formValidation");

        }
    }
}

//----------------------text validation
baseValidation(".textValidation", "text", "keyup"); // keyboard
//----------------------email validation
baseValidation(".emailValidation", "email", "keyup"); // keyboard
//---------------------- name validation
baseValidation(".nameValidation", "name", "keyup"); // keyboard
//----------------------password validation
baseValidation(".passwordSets", "password", "keyup"); // keyboard
//---------------------- recipe name validation
baseValidation(".recipeGeneralValidation", "recipeGeneral", "keyup"); // keyboard



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
        let createContainer = document.createElement("div");
        createContainer.className = "step-ingredient-spacing";
        // let createDivRow = document.createElement("div");
        // createDivRow.className = " "; // row no-gutters align-items-center
        // let createSpan = document.createElement("span");
        // createSpan.className = "col";
        let createH6 = document.createElement("h6");
        createH6.classList = "reduce-to-p"
        let validationDiv = document.createElement("div")
        validationDiv.classList = "invalid-form form-is-valid make-invis"
        let val1P = document.createElement("p")
        val1P.textContent = "Must be between 5 and 100 characters"
        val1P.classList = "make-invis remove-p-margin"
        let val2P = document.createElement("p")
        val2P.textContent = ""
        val2P.classList = "make-invis remove-p-margin"
        let val3P = document.createElement("p")
        val3P.textContent = "Can only contain a-z, A-Z, 0-9, and !@#%&*_+-=?.'/" + '",';
        val3P.classList = "make-invis remove-p-margin"
        // let createSpanP = document.createElement("p");
        // createSpanP.textContent = arrayIngredientLength + ". ";
        let createInput = document.createElement(inputOrTextarea);
        createInput.className = "formValidation recipeGeneralValidation"; //col-10
        createInput.id = arrayClass + arrayIngredientLength;
        createInput.name = arrayClass + arrayIngredientLength;
        createInput.type = "text";
        // Adds extra classes if textarea
        if(inputOrTextarea == "textarea"){
            // createSpanP.textContent =  "Step " + arrayIngredientLength;
            createH6.textContent =  "Step " + arrayIngredientLength;
            createInput.rows = "3";
            createInput.cols = "20";
        } else {
            // createInput.pattern = "[a-zA-z0-9!,*.?=+-_/#%&]+{0,255}"
            // createSpanP.textContent = "Ingredient " + arrayIngredientLength;
            createH6.textContent = "Ingredient " + arrayIngredientLength;
        }

        // Creates inital box
        addRemoveLocation.appendChild(createContainer);
        // Creates Variable for insert location and inserts complete box structure
        let innerDivLoc = addRemoveLocation.getElementsByTagName("div").length;
        // addRemoveLocation.getElementsByTagName("div")[innerDivLoc-1].appendChild(createDivRow);
        // addRemoveLocation.getElementsByTagName("div")[innerDivLoc].appendChild(createSpanP);
        addRemoveLocation.getElementsByTagName("div")[innerDivLoc-1].appendChild(createH6);
        addRemoveLocation.getElementsByTagName("div")[innerDivLoc-1].appendChild(createInput);
        addRemoveLocation.getElementsByTagName("div")[innerDivLoc-1].appendChild(validationDiv);
        addRemoveLocation.getElementsByTagName("div")[innerDivLoc].appendChild(val1P);
        addRemoveLocation.getElementsByTagName("div")[innerDivLoc].appendChild(val2P);
        addRemoveLocation.getElementsByTagName("div")[innerDivLoc].appendChild(val3P);
        // baseVal.addEventListener("focus", function (stopme) {
        
        console.log(addRemoveLocation.getElementsByTagName("div")[innerDivLoc-1].getElementsByTagName(inputOrTextarea)[0])
        addValidation(addRemoveLocation.getElementsByTagName("div")[innerDivLoc-1].getElementsByTagName(inputOrTextarea)[0], "recipeGeneral")


        // stopme.stopPropagation();
        // showInvalidation.stopPropagation();
        // validateOnKeyStroke.stopPropagation();
        // invisInvalidation.stopPropagation();
        // baseValidation(".recipeGeneralValidation", "recipeGeneral", "keyup"); // keyboard
    });
// baseValidation(".recipeGeneralValidation", "recipeGeneral", "keyup"); // keyboard
// validateOnKeyStroke
// invisInvalidation
// showInvalidation
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



