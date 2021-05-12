// ---- General ----
// ----Removes all flash messages after 7 seconds
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


// ----edituserinfo ----
// Reveal new password button
// Defensive code to keep users from starting the validation of new passwords
var revealPassword = document.getElementsByClassName("hidePassword");
revealPassword[0].addEventListener("click", function() {
    setTimeout(function() {
        revealPassword[0].classList.add("make-invis");
        revealPassword[1].classList.remove("make-invis");
        revealPassword[2].classList.remove("make-invis");
    },500);
});

// ---- Apply Random Avatar Name to Avatar Image
// Adds randomly generated image name if new image present
document.getElementById("custom-button").addEventListener("click", function() {
    document.getElementById("avatar_name").setAttribute("value", imageName);
    if (document.getElementById("avatar").value != ""){
        document.getElementById("avatar_file_valid").value = true;
    }
});

//--------------------------------------------------------update validation and change variables  -------------------------------------------------

// ---- Password Validation ----
// ---- Validation ----
// ----Validates matching passwords -- passwordCheck1 and passwordCheck2
let passwordCheck1 = document.getElementById("passwordCheck1"); // Compare location 1
let passwordCheck2 = document.getElementById("passwordCheck2"); // Compare location 2
var findPasswordComapre = document.querySelectorAll(".passwordCompare");
findPasswordComapre.forEach(selectPasswordComapre);
function selectPasswordComapre(comparePassLoc) {
    comparePassLoc.addEventListener("keyup", function () {
        let passCheck1Val = passwordCheck1.parentElement.getElementsByTagName("p")[1];
        let passCheck2Val = passwordCheck2.parentElement.getElementsByTagName("p")[1];
        // Compares passwordCheck1 and passwordCheck2, if they match it remove invalid bubble
        if(passwordCheck1.value == passwordCheck2.value){
            passCheck1Val.classList.add("make-invis");
            passCheck2Val.classList.add("make-invis");
        }else{ // Adds invalid bubble if passwords dont match
            passCheck1Val.classList.remove("make-invis");
            passCheck2Val.classList.remove("make-invis");
        }
        finalValidation(".formValidation");
    });
}

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



// ---- Base Validation starting point
// basic (start) validation function
function baseValidation (inputSelector, validationSelector, userInputType) {
    var findPasswords = document.querySelectorAll(inputSelector);
    findPasswords.forEach(selectPasswords);
    function selectPasswords(baseVal){
        let baseValPara = baseVal.parentElement.getElementsByTagName("p");

        // Makes validation bubble visible on focus 
        baseVal.addEventListener("focus", function() {
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
        baseVal.addEventListener("blur", function() {
            baseVal.parentElement.getElementsByTagName("div")[0].classList.add("make-invis");
        });

        // Applies validation check on every keyup stroke
        baseVal.addEventListener("keyup", function () {
            // Replaces all spaces with '_'
            if(validationSelector !== "text"){
                if(baseVal.value.match(matchTypeSpaces)){
                    baseVal.value = baseVal.value.replace(matchTypeSpaces, "_");
                } 
            }
            
            // Checks for acceptiable characters
            for (i=0; i< baseVal.value.length; i++){
                char = baseVal.value[i]
                if (validationSelector === "text"){
                    // console.log(char.match(matchTypeGoodCharacter))
                    // console.log(char.match(matchTypeNumber))
                    // console.log(char.match(matchTypeLower))
                    // console.log(char.match(matchTypeUpper))
                    // console.log(char.match(matchTypeTextCharacter))
                    // console.log("Im inside text check")
                    // console.log(char)
                    // console.log(baseVal.value.length)
                    if (char.match(matchTypeGoodCharacter) == null && char.match(matchTypeTextCharacter) == null && char.match(matchTypeUpper) == null && char.match(matchTypeLower) == null  && char.match(matchTypeNumber) == null) {
                        console.log(char + " this broke me")
                        baseValPara[2].classList.remove("make-invis");
                        break
                    } else {
                        baseValPara[2].classList.add("make-invis");
                    }
                } else {
                    console.log("Imoutside text check")
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

                // if passwordcompare

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

        });
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

// ----button  for new password ----
let jsButtonPasswordFind = document.querySelectorAll(".custom-js-button-password");
jsButtonPasswordFind.forEach(jsButtonPasswordSelect);
function jsButtonPasswordSelect(passwordButton) {
    passwordButton.addEventListener("click", function(pushPasswordButton){
        passwordButton.classList.add("custom-button-press-outer");
        passwordButton.getElementsByTagName("p")[0].classList.add("custom-button-press");
    });
}