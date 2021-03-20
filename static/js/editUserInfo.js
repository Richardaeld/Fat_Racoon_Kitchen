// ---- Create Random Avatar name
// Creates a random string for image name assignment
const characterLibrary = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_@!&,?0123456789"
const characterLibraryLength = characterLibrary.length;
var imageName = ""
for (let i=0; i<20; i++){
    let characterLibraryIndex = Math.floor(Math.random()*(characterLibraryLength));
    imageName += characterLibrary[characterLibraryIndex];
}

// ---- Apply Random Avatar Name to Avatar Image
// Adds randomly generated image name
document.getElementById("custom-button").addEventListener("click", function() {
    document.getElementById("avatar_name").setAttribute("value", imageName);
    if (document.getElementById("avatar").value != ""){
        document.getElementById("avatar_file_valid").value = true;
    }
})

// ---- Avatar Image Validation
// Check file size
document.getElementById("avatar").addEventListener("change", function() {
    let loc = document.getElementById("avatar")
    let fileSize = loc.files[0].size;
    if (fileSize > 500000) {
        loc.value = null;
        loc.classList.add("invalid");
        document.getElementById("avatar_valid").classList.remove("make-invis");
    } else if (fileSize < 500000 && loc.classList.contains("invalid")){
        loc.classList.remove("invalid");
        document.getElementById("avatar_valid").classList.add("make-invis");
    }
})
//--------------------------------------------------------------------------------------------------------------------------
//Validates matching new password and confirm new password
//newPasswordEdit
//NewPasswordCheckEdit
let newPassword = document.getElementById("newPasswordEdit")
let newPasswordCheck = document.getElementById("newPasswordCheckEdit")
var findPasswordComapre = document.querySelectorAll(".passwordCompare");
findPasswordComapre.forEach(selectPasswordComapre);
function selectPasswordComapre(item, index) {
    item.addEventListener("keyup", function () {
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
    })
}

// ---- Form Validation for passwords
//form REGEX
const matchTypeUpper = /[A-Z]/
const matchTypeLower = /[a-z]/
const matchTypeNumber = /[0-9]/
const matchTypeChatacter = /[$|.|@|%]/


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
function baseValidation (inputSelector, validationSelector) {
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
                
            } else if (validationSelector === "emailName"){
                // I invalidate the form for base validation and reveal appropiate "p" tag
                if(item.value.length < 6 || item.value.length > 30){
                    item.parentElement.getElementsByTagName("p")[0].classList.remove("make-invis")
                }

                // If all base requirements are met I validate the form for base validation and remove the appropiate "p" tag
                if(item.value.length >= 6 && item.value.length <= 30){
                    item.parentElement.getElementsByTagName("p")[0].classList.add("make-invis")
                }
            }

            //enables and disables validation bubble according to if input is valid or not
            let checkLength = item.parentElement.getElementsByTagName("p")
            //final validation of form
            finalValidation(item, checkLength)
        })
    }
}

//----------------------email and name validation
baseValidation(".nameEmailValidation", "emailName")
//----------------------password validation
baseValidation(".passwordSets", "password")

// Reveal new password button 
var revealPassword = document.getElementsByClassName("hidePassword");
revealPassword[0].addEventListener("click", function() {
    revealPassword[0].classList.add("make-invis");
    revealPassword[1].classList.remove("make-invis");
    revealPassword[2].classList.remove("make-invis");
})