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

// ---- Apply Random Avatar Name to Avatar Image
// Adds randomly generated avatar name if new image present
document.getElementById("custom-button").addEventListener("click", function() {
    document.getElementById("avatar_name").setAttribute("value", imageName);
    // If user selected a image adds changes status to true
    if (document.getElementById("avatar").value != ""){
        document.getElementById("avatar_file_valid").value = true;
    }
});

// ---- Validation ----
// Compares these id targets: passwordCheck1 and passwordCheck2 and adds/removes invalid commit
let passwordCheck1 = document.getElementById("passwordCheck1"); // Compare location 1
let passwordCheck2 = document.getElementById("passwordCheck2"); // Compare location 2
var findPasswordComapre = document.querySelectorAll(".passwordCompare");
findPasswordComapre.forEach(selectPasswordComapre);
function selectPasswordComapre(comparePassLoc) {
    comparePassLoc.addEventListener("keyup", function () {
        let passCheck1Val = passwordCheck1.parentElement.getElementsByTagName("p")[1];  // Location of passwordCheck1 match description
        let passCheck2Val = passwordCheck2.parentElement.getElementsByTagName("p")[1];  // Location of passwordCheck2 match description
        // Adds/Removes password compare bubble
        if(passwordCheck1.value == passwordCheck2.value){
            passCheck1Val.classList.add("make-invis");
            passCheck2Val.classList.add("make-invis");
        }else{
            passCheck1Val.classList.remove("make-invis");
            passCheck2Val.classList.remove("make-invis");
        }
        // Runs final validation for password compare
        finalValidation(".formValidation");
    });
}

// Validation REGEX
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

        var currentFormValid = true; // Sets macro form validation setting

        let checkPLength = finalVal.parentElement.getElementsByTagName("p");  // Finds all p's to iteration validation over
        // Searches form for invalid input and sets Global/Macro validation
        for (let i=0; i< checkPLength.length; i++){
            let validCheck = finalVal.parentElement.getElementsByTagName("p")[i].classList.contains("make-invis");
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
            finalVal.classList.remove("form-invalid-view");
        } else {
            // Reveals parent validation container of clicked item if form invalidates
            if (document.activeElement == finalVal){
                finalVal.parentElement.getElementsByTagName("div")[0].classList.remove("make-invis");
            }
            finalVal.parentElement.getElementsByTagName("div")[0].classList.remove("form-is-valid");
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
            var validCheck = true;  // Presets valitation to valid
            let checkPLengthTemp = baseVal.parentElement.getElementsByTagName("p");  // Finds all p's to iteration validation over
            // Enables validation bubble according to Macro Validation
            for (let i=0; i< checkPLengthTemp.length; i++){
                validCheck = baseVal.parentElement.getElementsByTagName("p")[i].classList.contains("make-invis");  // Sets variable according to if its valid
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
            for (let i=0; i< baseVal.value.length; i++){
                var char = baseVal.value[i];  // Character being checked
                if (validationSelector === "text" || validationSelector === "recipeGeneral" ){
                // Checks for improper characters and sets validation
                    if (char.match(matchTypeGoodCharacter) == null && char.match(matchTypeTextCharacter) == null && char.match(matchTypeUpper) == null && char.match(matchTypeLower) == null  && char.match(matchTypeNumber) == null) {
                        baseValPara[2].classList.remove("make-invis");
                        break;
                    } else {
                        baseValPara[2].classList.add("make-invis");
                    }
                } else if (validationSelector === "time") {
                    if (char.match(matchTypeNumber) == null) {
                        baseValPara[2].classList.remove("make-invis");
                        break;
                    } else {
                        baseValPara[2].classList.add("make-invis");
                    }
                } else{
                    if (char.match(matchTypeGoodCharacter) == null && char.match(matchTypeUpper) == null && char.match(matchTypeLower) == null && char.match(matchTypeNumber) == null) {
                        baseValPara[2].classList.remove("make-invis");
                        break;
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
    // Validates according to file size
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

// ----button  for new password ----
let jsButtonPasswordFind = document.querySelectorAll(".custom-js-button-password");
jsButtonPasswordFind.forEach(jsButtonPasswordSelect);
function jsButtonPasswordSelect(passwordButton) {
    passwordButton.addEventListener("click", function(){
        passwordButton.classList.add("custom-button-press-outer");
        passwordButton.getElementsByTagName("p")[0].classList.add("custom-button-press");
    });
}

// Reveals new password section
// Defensive code to keep users from starting the validation of new passwords
var revealPassword = document.getElementsByClassName("hidePassword");
revealPassword[0].addEventListener("click", function() {
    setTimeout(function() {
        revealPassword[0].classList.add("make-invis");
        revealPassword[1].classList.remove("make-invis");
        revealPassword[2].classList.remove("make-invis");
    },500);
});