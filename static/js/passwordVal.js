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
        if(document.getElementById("custom-button-login").value === "Create"){ //----new

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
//Set by a class name at fieldset and query alled with input 
//form REGEX
const  matchTypeUpper = /[A-Z]/
const  matchTypeLower = /[a-z]/
const  matchTypeNumber = /[0-9]/
var findPasswords = document.getElementsByClassName("passwordSets")[0].querySelectorAll("input");
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
        loc = item

        // I invalidate the form for base validation and reveal appropiate "p" tag
        if(loc.value.match(matchTypeUpper) == null || loc.value.match(matchTypeLower) == null || loc.value.match(matchTypeNumber) == null || loc.value.length < 8 || loc.value.length > 20){
            loc.parentElement.getElementsByTagName("p")[0].classList.remove("make-invis")
        }

        // If all base requirements are met I validate the form for base validation and remove the appropiate "p" tag
        if(loc.value.match(matchTypeUpper) && loc.value.match(matchTypeLower) && loc.value.match(matchTypeNumber) && loc.value.length >= 8 && loc.value.length <= 20){
            loc.parentElement.getElementsByTagName("p")[0].classList.add("make-invis")
        }

        //enables and disables validation bubble according to if input is valid or not
        let checkLength = item.parentElement.getElementsByTagName("p")
        //final validation of form
        finalValidation(item, checkLength)
    })
}

function finalValidation(item, checkPLength) {
    var formIsValid = true
    for (i=0; i< checkPLength.length; i++){
        console.log(item)
        // Sets a validation variable as it checks over all possible invalidation points
        if(item.parentElement.getElementsByTagName("p")[i].classList.contains("make-invis") == false){                
            formIsValid = false
        }

        // Makes bubble visible or invisible according to fromIsValid variable
        if(formIsValid){
            item.parentElement.getElementsByTagName("div")[0].classList.add("form-is-valid")
            item.removeAttribute("invalid")
            item.classList.remove("form-invalid-view")
        } else if(formIsValid == false){
            item.parentElement.getElementsByTagName("div")[0].classList.remove("form-is-valid")
            item.setAttribute("invalid", "")
            item.classList.add("form-invalid-view")
            break
        }
    }
}