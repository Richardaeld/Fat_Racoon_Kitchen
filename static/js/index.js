// ---- Validation ----
// ----Validates matching passwords
// Compares these id targets: passwordCheck1 and passwordCheck2 and adds/removes invalid commit
let passwordCheck1 = document.getElementById("passwordCheck1"); // Compare location 1
let passwordCheck2 = document.getElementById("passwordCheck2"); // Compare location 2
var findPasswordComapre = document.querySelectorAll(".passwordCompare");
findPasswordComapre.forEach(selectPasswordComapre);
function selectPasswordComapre(comparePassLoc) {
    comparePassLoc.addEventListener("keyup", function () {
        let passCheck1Valid = passwordCheck1.parentElement.getElementsByTagName("p")[1];  // Location of passwordCheck1 match description
        let passCheck2Valid = passwordCheck2.parentElement.getElementsByTagName("p")[1];  // Location of passwordCheck2 match description
        // Adds/Removes password compare bubble
        if(passwordCheck1.value == passwordCheck2.value){
            passCheck1Valid.classList.add("make-invis");
            passCheck2Valid.classList.add("make-invis");
        }else{
            passCheck1Valid.classList.remove("make-invis");
            passCheck2Valid.classList.remove("make-invis");
        }
        // Runs final validation for password compare
        finalValidation(".passwordCompare");
    });
}

// Validation REGEX
const matchTypeUpper = /[A-Z]/;
const matchTypeLower = /[a-z]/;
const matchTypeNumber = /[0-9]/;
const matchTypeGoodCharacter = /[!|@|#|%|&|*|_|+|=|?|.|'|/|-]/;
const matchTypeTextCharacter = /[,|"]/;
const matchTypeSpaces =  /[ ]/g;  // Globally checks for spaces
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
            document.getElementById("custom-button-login").removeAttribute("disabled");
            document.getElementById("custom-button-create").removeAttribute("disabled");
        } else {
            document.getElementById("custom-button-login").setAttribute("disabled", "");
            document.getElementById("custom-button-create").setAttribute("disabled", "");
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
                finalVal.parentElement.getElementsByTagName("div")[0].classList.remove("make-invis");
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
                if (validationSelector === "text" || validationSelector === "recipeGeneral"){
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
                if(baseVal.value.length >= 5 && baseVal.value.length <= 100){
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
            formIsValid = true;
            if(baseVal.classList.contains("loginValidation")){
                finalValidation(".loginValidation");
            } else if (baseVal.classList.contains("createValidation")) {
                finalValidation(".createValidation");
            } 
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

// ---- Login Create Modal ----
// ---- login modal
// Opens/close modal of login/create form
let modal = document.getElementById("modalAside"); // modal
let signInModal = document.querySelectorAll(".login-modal"); // login button
signInModal.forEach(popUpModal);
function popUpModal(openModal){
    openModal.addEventListener("click", function () {
        modal.classList.remove("make-invis");
        document.getElementById("email").focus();
    });
}
// Closes modal if background filter is clicked
document.getElementsByClassName("modal-background")[0].addEventListener("click", function() {
    modal.classList.add("make-invis");
});
// ---- Button create (form submit buttons) ----
// Creates a depressed look if submit button clicked
document.getElementById("custom-button-create").addEventListener("click", function () {
    document.getElementById("custom-button-create").classList.add("custom-button-press");
});
// ---- Button login (form submit buttons) ----
// Creates a depressed look if submit button clicked
document.getElementById("custom-button-login").addEventListener("click", function () {
    document.getElementById("custom-button-login").classList.add("custom-button-press");
});

// ---- Login/Create modal tab selector (login or create)
// Makes the tabs for login/create clickable and switches between login and create account forms
var modaltabs = document.querySelectorAll(".tab");
modaltabs.forEach(tabSelect);
function tabSelect(modalTab) {
    modalTab.addEventListener("click", function () {
        // Removes all user inputed information
        function removeUserInput(){
            for (let removeInputIndex = 0; removeInputIndex < totalCreate; removeInputIndex++){
                let userInputLoc = document.getElementsByClassName("formValidation")[removeInputIndex];
                userInputLoc.value = "";
                userInputLoc.classList.add("form-invalid-view");
                userInputLoc.parentElement.getElementsByTagName("p")[0].classList.remove("make-invis");
            }
        }
        var totalCreate = document.querySelectorAll(".formValidation").length;  // sets length of inputs to be erased 
        // Opens login/create modal and resets user inputs
        if(modalTab.textContent.trim() === "Login"){
            document.getElementById("login-modal").classList.remove("make-invis");
            document.getElementById("custom-button-login").setAttribute("disabled", "");
            document.getElementById("create-modal").classList.add("make-invis");
            removeUserInput();
            document.getElementById("email").focus();
        } else if(modalTab.textContent.trim() === "Create Account"){
            document.getElementById("login-modal").classList.add("make-invis");
            document.getElementById("custom-button-create").setAttribute("disabled", "");
            document.getElementById("create-modal").classList.remove("make-invis");
            document.getElementById("usernameCreate").focus();
        }

    });
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

// ---- Carousel ----
// builds an array of carousel data
var carousel = document.querySelectorAll(".card-carousel");

// Find width of screen and sets amount of carousel boxes
// This function is called by a global event handler and 
// resizes according to the current width of screen further down
var reveal; // Amount of cards to reveal per responsiveness
var carouselArray = []; // Sets array for carousel
function findWidth(){

    // Counts carousel item length, creates an index array, and resets array
    carouselArray = [];
    for(let arrayCount = 0; arrayCount < carousel.length; arrayCount++){
        carouselArray.push(arrayCount);
    }

    let screenWidth;
    screenWidth = document.body.offsetWidth; // Find screen width
    // Sets carousel card amount to be shown
    if (screenWidth > 1200) {
        reveal = 3;
    } else if (screenWidth > 992) {
        reveal = 2;
    } else if (screenWidth > 768){
        reveal = 1;
    } else {
        reveal = 1;
    }

    let visible = document.querySelectorAll(".card-carousel-vis"); // Finds the amount of visible carousel boxes

    // Checks to see if there are visible boxes to be removed
    if (visible.length > 0) {
        // Removes all visible carousel boxes
        for (let removeBoxes = 0; removeBoxes <= visible.length - 1; removeBoxes++) {
            document.querySelector(".card-carousel-vis").classList.remove("card-carousel-vis");
        }
    }
    // Adds in correct amount of carousel boxes -- makes them visible with this class
    for (let addBoxes = 0; addBoxes < reveal; addBoxes++) {
        carousel[addBoxes].classList.add("card-carousel-vis");
        carousel[addBoxes].classList.remove("transition-fade-out");
    }
}

// initial setting of carousel boxes
findWidth();

// Global event handler that catchs any resizing of 
// screen and calls function findwidth
window.addEventListener('resize', findWidth);

// Carousel button function
function carouselButton (button) {
    document.getElementsByClassName(button)[0].addEventListener("click", function () {
        // Adds fade effect to carousel
        for (let removeVisible = 0; removeVisible < reveal; removeVisible++){
            document.getElementsByClassName("card-carousel")[carouselArray[removeVisible]].classList.add("transition-fade-out");
        }
        // Changes carousel after it has faded out
        setTimeout(function() {

            //removes all current visible elements
            for (let removeVisible = 0; removeVisible < reveal; removeVisible++){
                document.getElementsByClassName("card-carousel")[carouselArray[removeVisible]].classList.remove("card-carousel-vis");
                document.getElementsByClassName("card-carousel")[carouselArray[removeVisible]].classList.add("transition-fade-out");
            }
            // Carousel right button
            if (button == "carousel-right")
            for (let buttonRight=0; buttonRight < reveal; buttonRight++){
                let moveCarouselRight = carouselArray.shift();
                carouselArray.push(moveCarouselRight);
            }
            // Carousel left button
            else if (button == "carousel-left")
            for (let buttonLeft = 0; buttonLeft < reveal; buttonLeft++){
                let moveCarouselLeft = carouselArray.pop();
                carouselArray.unshift(moveCarouselLeft);
            }
            // Makes new elements visible
            for (let addVisible = 0; addVisible < reveal; addVisible++){
                document.getElementsByClassName("card-carousel")[carouselArray[addVisible]].classList.add("card-carousel-vis");
                document.getElementsByClassName("card-carousel")[carouselArray[addVisible]].classList.remove("transition-fade-out");
            }
        },500);
    });
}
// Calls carousel to move right
carouselButton("carousel-right");
// Calls carousel to move left
carouselButton("carousel-left");
