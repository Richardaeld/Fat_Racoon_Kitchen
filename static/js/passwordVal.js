//--------------------------------------------------------------------------------------------------------------------------
//Validates matching new password and confirm new password
//newPasswordEdit
//NewPasswordCheckEdit
let newPassword = document.getElementById("password") // ---changed loc
let newPasswordCheck = document.getElementById("passwordCheck")  //  ---  changed loc
var findPasswordComapre = document.querySelectorAll(".passwordCompare");
findPasswordComapre.forEach(selectPasswordComapre);
function selectPasswordComapre(item, index) {
    item.addEventListener("keyup", function () {
        if(document.getElementById("custom-button").value === "Create"){ //----new

            if(newPassword.value == newPasswordCheck.value){
                newPassword.parentElement.getElementsByTagName("p")[1].classList.add("make-invis")
                newPasswordCheck.parentElement.getElementsByTagName("p")[1].classList.add("make-invis")
            }else{
                newPassword.parentElement.getElementsByTagName("p")[1].classList.remove("make-invis")
                newPasswordCheck.parentElement.getElementsByTagName("p")[1].classList.remove("make-invis")
            }
            
            let checkLengthPass = newPassword.parentElement.getElementsByTagName("p")
            let checkLengthPassCheck = newPasswordCheck.parentElement.getElementsByTagName("p")
            
            finalValidation(newPassword, checkLengthPass)
            finalValidation(newPasswordCheck, checkLengthPassCheck)
        }


    })
}

// ---- Form Validation for passwords
//form REGEX
const matchTypeUpper = /[A-Z]/
const matchTypeLower = /[a-z]/
const matchTypeNumber = /[0-9]/
const matchTypeChatacter = /[$|.|@|%|" "]/
const matchTypeSpaces =  /[" "]/g // Follow with g to make global
const matchTypeAtSign = /[@]/
const matchTypeDotCom = /.com/
const matchTypeDotEdu = /.edu/

// Sets or removes invalid bubble and invalid attributes
function finalValidation(item, checkPLength) {
    var formIsValid = true
    for (i=0; i< checkPLength.length; i++){
        //console.log(item) ------------genereates a lot of code
        // Sets a validation variable as it checks over all possible invalidation points
        if(item.parentElement.getElementsByTagName("p")[i].classList.contains("make-invis") == false){                
            formIsValid = false
        }

        // Makes bubble visible or invisible according to fromIsValid variable
        if(formIsValid){
            item.parentElement.getElementsByTagName("div")[0].classList.add("form-is-valid")
            item.removeAttribute("invalid")
            item.classList.remove("form-invalid-view")
            document.getElementById("custom-button").removeAttribute("disabled")
        } else if(formIsValid == false){
            //console.log(item)
            item.parentElement.getElementsByTagName("div")[0].classList.remove("form-is-valid")
            item.setAttribute("invalid", "")
            item.classList.add("form-invalid-view")
            document.getElementById("custom-button").setAttribute("disabled", "")
            break
        }
    }
}

// basic (start) validation function
function baseValidation (inputSelector, validationSelector, userInputType) {
    var findPasswords = document.querySelectorAll(inputSelector);  //var
    findPasswords.forEach(selectPasswords);
    function selectPasswords(item, index){

        // Makes validation bubble visible on focus reverse on blur 
        item.addEventListener("focus", function() {
            item.parentElement.getElementsByTagName("div")[0].classList.remove("make-invis")
        })
        item.addEventListener("blur", function() {
            item.parentElement.getElementsByTagName("div")[0].classList.add("make-invis")
        })

        item.addEventListener("keyup", function () {
            // Uses specified type of validation
            if(validationSelector === "password"){

                // I invalidate the form for base validation and reveal appropiate "p" tag
                if(item.value.match(matchTypeUpper) == null || item.value.match(matchTypeLower) == null || item.value.match(matchTypeNumber) == null || item.value.length < 8 || item.value.length > 20){
                    item.parentElement.getElementsByTagName("p")[0].classList.remove("make-invis")
                }
                
                // If all base requirements are met I validate the form for base validation and remove the appropiate "p" tag
                if(item.value.match(matchTypeUpper) && item.value.match(matchTypeLower) && item.value.match(matchTypeNumber) && item.value.length >= 8 && item.value.length <= 20){
                    item.parentElement.getElementsByTagName("p")[0].classList.add("make-invis")
                }

            } else if(validationSelector === "email") {
                // looks for @ 
                if (item.value.match(matchTypeAtSign)) {
                    item.parentElement.getElementsByTagName("p")[1].classList.add("make-invis")
                } else {
                    item.parentElement.getElementsByTagName("p")[1].classList.remove("make-invis")
                }

                // looks for email suffix
                let emailLength = item.value.length
                if  (emailLength >=4 ){
                    var checkEmailValue = ""
                    // Find last 4 digits
                    for (i=3; i>=0; i--){
                        checkEmailValue += item.value[(emailLength-1)-i]
                    }
                    if (checkEmailValue.match(matchTypeDotCom)){ // checks for .com
                        item.parentElement.getElementsByTagName("p")[2].classList.add("make-invis")
                    }else if (checkEmailValue.match(matchTypeDotEdu)){ // checks for .edu
                        item.parentElement.getElementsByTagName("p")[2].classList.add("make-invis")
                    } else {
                        item.parentElement.getElementsByTagName("p")[2].classList.remove("make-invis")
                    }
                }

            } else if (validationSelector === "name"){ //emailName
                // If all base requirements are met I validate the form for base validation and remove the appropiate "p" tag
                if(item.value.length >= 6 && item.value.length <= 30){
                    item.parentElement.getElementsByTagName("p")[0].classList.add("make-invis")
                }
                // I invalidate the form for base validation and reveal appropiate "p" tag
                if(item.value.match(matchTypeSpaces)){
                    item.value = item.value.replace(matchTypeSpaces, "_");
                }
                if(item.value.length < 6 || item.value.length > 30){
                    console.log("look at me")
                    item.parentElement.getElementsByTagName("p")[0].classList.remove("make-invis")
                }
            }

            //enables and disables validation bubble according to if input is valid or not
            let checkLength = item.parentElement.getElementsByTagName("p")
            //final validation of form
            finalValidation(item, checkLength)
            
        })
    }
}

//----------------------email validation
baseValidation(".emailValidation", "email", "keyup") // keyboard
baseValidation(".emailValidation", "email", "touchstart") // keyboard
//---------------------- name validation
baseValidation(".nameValidation", "name", "keyup") // keyboard
baseValidation(".nameValidation", "name", "touchstart") // keyboard
//----------------------password validation
baseValidation(".passwordSets", "password", "keyup") // keyboard
baseValidation(".passwordSets", "password", "touchstart") // touchscreen