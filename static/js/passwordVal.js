// ---- Validation ----
// ----Validates matching passwords -- passwordCheck1 and passwordCheck2
let passwordCheck1 = document.getElementById("passwordCheck1"); // Compare location 1
let passwordCheck2 = document.getElementById("passwordCheck2"); // Compare location 2
var findPasswordComapre = document.querySelectorAll(".passwordCompare");
findPasswordComapre.forEach(selectPasswordComapre);
function selectPasswordComapre(comparePassLoc) {
    comparePassLoc.addEventListener("keyup", function () {
        // if(document.getElementById("custom-button").value === "Create" || document.getElementById("custom-button").value === "Update"){
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

            let checkLengthPass = passwordCheck1.parentElement.getElementsByTagName("p");
            let checkLengthPassCheck = passwordCheck2.parentElement.getElementsByTagName("p");

            if (comparePassLoc.classList.contains("createValidation")) {
                finalValidation(".createValidation");

            } else {
                finalValidation(".formValidation");
            }

            // finalValidation(passwordCheck1, checkLengthPass);
            // finalValidation(passwordCheck2, checkLengthPassCheck);
        // }
    });
}

// ---- Form Validation for passwords
//form REGEX
// const matchAcceptedInput = /[]/;
const matchTypeUpper = /[A-Z]/;
const matchTypeLower = /[a-z]/;
const matchTypeNumber = /[0-9]/;
// const matchTypeChatacter = /[.|@|%]/;
const matchTypeBadCharacter = /['|"|$|,]/;
const matchTypeSpaces =  /[ ]/g; // Follow with g to make global
const matchTypeAtSign = /[@]/;
const matchTypeDotCom = /.com/;
const matchTypeDotEdu = /.edu/;
const matchTypeDotNet = /.net/;
const matchTypeDotOrg = /.org/;

var formIsValid = false;
// ----- Final Validation check
// Sets or removes invalid bubble and invalid attributes
function finalValidation(validationLoc) {
    
    let findFormInputs = document.querySelectorAll(validationLoc);
    findFormInputs.forEach(selectFormInputs);
    function selectFormInputs(finalVal) {

        let checkPLength = finalVal.parentElement.getElementsByTagName("p");
        //enables and disables validation bubble according to if input is valid or not
        for (let i=0; i< checkPLength.length; i++){
            // Sets a validation variable as it checks over all possible invalidation points
            if(finalVal.parentElement.getElementsByTagName("p")[i].classList.contains("make-invis") == false){
                formIsValid = false;
            }

            // Makes bubble visible or invisible according to fromIsValid variable
            if(formIsValid){
                finalVal.parentElement.getElementsByTagName("div")[0].classList.add("form-is-valid");
                finalVal.removeAttribute("invalid");
                finalVal.classList.remove("form-invalid-view");
                if (document.getElementById("custom-button-login")){
                    document.getElementById("custom-button-login").removeAttribute("disabled");
                    document.getElementById("custom-button-create").removeAttribute("disabled");
                }else{
                    document.getElementById("custom-button").removeAttribute("disabled");
                }
            } else if(formIsValid == false){
                finalVal.parentElement.getElementsByTagName("div")[0].classList.remove("form-is-valid");
                finalVal.setAttribute("invalid", "");
                finalVal.classList.add("form-invalid-view");
                if(document.getElementById("custom-button-login")){
                    document.getElementById("custom-button-login").setAttribute("disabled", "");
                    document.getElementById("custom-button-create").setAttribute("disabled", "");
                }else{
                    document.getElementById("custom-button").setAttribute("disabled", "");
                }
                break;
            }
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
            baseVal.parentElement.getElementsByTagName("div")[0].classList.remove("make-invis");
        });
        // Makes validation bubble hidden on blur
        baseVal.addEventListener("blur", function() {
            baseVal.parentElement.getElementsByTagName("div")[0].classList.add("make-invis");
        });

        // Applies validation check on every keyup stroke
        baseVal.addEventListener("keyup", function () {
            // Replaces all spaces with _
            if(baseVal.value.match(matchTypeSpaces)){
                baseVal.value = baseVal.value.replace(matchTypeSpaces, "_");
            }
            
            // Checks for improper characters and invalidates if found
            if(baseVal.value.match(matchTypeBadCharacter) != null){
                baseValPara[2].classList.remove("make-invis");
            } else {
                baseValPara[2].classList.add("make-invis");
            }

            // Validation for password
            if(validationSelector === "password"){

                // // Invalidates the form if incorrect amount of upper character, total characters and number are found
                // if(baseVal.value.match(matchTypeUpper) == null || baseVal.value.match(matchTypeLower) == null || baseVal.value.match(matchTypeNumber) == null || baseVal.value.length < 8 || baseVal.value.length > 20){
                //     baseVal.parentElement.getElementsByTagName("p")[0].classList.remove("make-invis");
                // }

                // Validates the form if correct amount of upper character, total characters and number are found
                if(baseVal.value.match(matchTypeUpper) && baseVal.value.match(matchTypeLower) && baseVal.value.match(matchTypeNumber) && baseVal.value.length >= 8 && baseVal.value.length <= 20){
                    baseValPara[0].classList.add("make-invis");
                }else{
                    baseValPara[0].classList.remove("make-invis");
                }

            // Validation for email
            } else if(validationSelector === "email") {
                // Validates for @ 
                if (baseVal.value.match(matchTypeAtSign)) {
                    baseValPara[1].classList.add("make-invis");
                } else {
                    baseValPara[1].classList.remove("make-invis");
                }

                // Validates for email suffix '.com' or '.edu'
                let emailLength = baseVal.value.length;
                if  (emailLength >=4 ){
                    var checkEmailValue = "";
                    // Find last 4 digits
                    for (let i=3; i>=0; i--){
                        checkEmailValue += baseVal.value[(emailLength-1)-i];
                    }
                    if (checkEmailValue.match(matchTypeDotCom)){ // checks for .com
                        baseValPara[1].classList.add("make-invis");
                    }else if (checkEmailValue.match(matchTypeDotEdu)){ // checks for .edu
                        baseValPara[1].classList.add("make-invis");
                    } else if (checkEmailValue.match(matchTypeDotNet)) {// checks for .net
                        baseValPara[1].classList.add("make-invis");
                    }else if (checkEmailValue.match(matchTypeDotOrg)) {// checks for .org
                        baseValPara[1].classList.add("make-invis");
                    }else {
                        baseValPara[1].classList.remove("make-invis");
                    }
                }
            //Validates for name/username
            } else if (validationSelector === "name"){
                // Validates if correct amount of characters present
                if(baseVal.value.length >= 6 && baseVal.value.length <= 30){
                    baseValPara[0].classList.add("make-invis");
                }
                // Invalidates if incorrect amount of characters present
                if(baseVal.value.length < 6 || baseVal.value.length > 30){
                    baseValPara[0].classList.remove("make-invis");
                }
            }

            // final validation of form
            formIsValid = true;
            if(baseVal.classList.contains("loginValidation")){
                finalValidation(".loginValidation");

            } else if (baseVal.classList.contains("createValidation")) {
                finalValidation(".createValidation");

            } else {
                finalValidation(".formValidation");
            }
        });
    }
}

//----------------------email validation
baseValidation(".emailValidation", "email", "keyup"); // keyboard
//baseValidation(".emailValidation", "email", "touchstart") // touchscreen // never implemented
//---------------------- name validation
baseValidation(".nameValidation", "name", "keyup"); // keyboard
//baseValidation(".nameValidation", "name", "touchstart") // touchscreen // never implemented
//----------------------password validation
baseValidation(".passwordSets", "password", "keyup"); // keyboard
//baseValidation(".passwordSets", "password", "touchstart") // touchscreen // never implemented