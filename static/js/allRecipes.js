// ---- Password Validation ----
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


// ---- Login Create Modal ----
// ---- login modal
// Opens/closes modal's aside
let modal = document.getElementById("modalAside"); // modal
let signInModal = document.querySelectorAll(".login-modal"); // login button
signInModal.forEach(popUpModal);
function popUpModal(openModal){
    openModal.addEventListener("click", function () {
        modal.classList.remove("make-invis");
        document.getElementById("email").focus()
    });
}
document.getElementsByClassName("modal-background")[0].addEventListener("click", function() {
    modal.classList.add("make-invis");
});

// Creates a depressed look if button clicked
let button = document.getElementsByClassName("custom-button")[0]; // submit button
document.getElementById("custom-button-create").addEventListener("click", function () {
    button.classList.add("custom-button-press");
});
document.getElementById("custom-button-login").addEventListener("click", function () {
    button.classList.add("custom-button-press");
});

// ---- Login modal tab selector (login or create)
// Makes the tab for login and create account clickable and switch between login and create account areas
var modaltabs = document.querySelectorAll(".tab");
modaltabs.forEach(tabSelect);
function tabSelect(modalTab) {
    modalTab.addEventListener("click", function () {
        var totalCreate = document.querySelectorAll(".formValidation").length;
        // Opens login/create modal
        if(modalTab.textContent.trim() === "Login"){
            document.getElementById("email").focus();
            document.getElementById("login-modal").classList.remove("make-invis");
            document.getElementById("create-modal").classList.add("make-invis");
            formIsValid = true;
            finalValidation(".loginValidation");
        } else if(modalTab.textContent.trim() === "Create Account"){
            document.getElementById("usernameCreate").focus();
            document.getElementById("login-modal").classList.add("make-invis");
            document.getElementById("create-modal").classList.remove("make-invis");
            formIsValid = true;
            finalValidation(".createValidation");
        }
        // Removes all user inputed information
        for (let removeInputIndex = 0; removeInputIndex < totalCreate; removeInputIndex++){
            let userInputLoc = document.getElementsByClassName("formValidation")[removeInputIndex];
            userInputLoc.value = "";
        }
    });
}


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

// ----Search bar
// Makes search bar visible wen user clicks on it and adds defensive code
var findSearchBar = document.querySelectorAll(".searchBar");
findSearchBar.forEach(selectSearchBar);
function selectSearchBar(searchBar){

    // Makes search bar visible with user click
    let searchInput = searchBar.getElementsByTagName("input")[0];
    searchBar.addEventListener("click", function () {
        searchInput.classList.remove("make-invis");
        searchInput.focus();
    });

    // Makes sure users are unable to submit blank queries
    let searchButton = searchBar.getElementsByTagName("button")[0];
    searchInput.addEventListener("keyup", function () {
        if(searchInput.value != "") {
            searchButton.removeAttribute("disabled");
        }else if(searchInput.value == "") {
            searchButton.setAttribute("disabled", "");
        }
    });

}


// ---- Pagination ----
// Creates Pagination's frame
var findFeature = document.querySelectorAll(".recipe-lists");
findFeature.forEach(selectFeature);
function selectFeature(pagination){
    let liLength = pagination.getElementsByTagName("li").length;
    // Reveals column items that dont need pagination
    if(liLength < 5 && liLength >= 1){
        for(let nonPag = 0; nonPag < liLength; nonPag++ ){
            pagination.getElementsByTagName("li")[nonPag].classList.remove("make-invis");
        }
    // Reveals column items that need pagination
    }else if(liLength > 5) {
        for(let usePag = 0; usePag < 5; usePag++ ){
            pagination.getElementsByTagName("li")[usePag].classList.remove("make-invis");
        }

        // Creates DOM frame for pagination
        let createUl = document.createElement("ul");
        createUl.className = "row no-gutters justify-content-center list-group list-group-horizontal recipe-lists-no-padding pagination-ul";
        for (let pagNumFrame = 0; pagNumFrame < liLength/5; pagNumFrame++){
            // Creates start ellipses
            if (pagNumFrame == 0){
                let createLi = document.createElement("li");
                createLi.className = "col list-group-item pagination-content first-ellipses make-invis not-clickable";
                createLi.textContent = "...";
                createUl.appendChild(createLi);
            }

            // Creates number content of pagination
            let createLi = document.createElement("li");
            createLi.className = "col list-group-item pagination-content pagination-number";
            createLi.textContent = pagNumFrame + 1;
            createUl.appendChild(createLi);

            // Creates end ellipses
            if (pagNumFrame == Math.floor(liLength/5) ){
                let createLi = document.createElement("li");
                createLi.className = "col list-group-item pagination-content last-ellipses make-invis not-clickable";
                createLi.textContent = "...";
                createUl.appendChild(createLi);
            }
        }

        // Sets inline height to stop collapsing on last pagination number
        pagination.style.height = pagination.offsetHeight + "px";

        // Inserts UL to DOM with all appropiate LI
        pagination.insertAdjacentElement('afterend', createUl);

        // Finds all points where a pagination li was created
        var findPagination = pagination.parentElement.querySelectorAll(".pagination-number");
        
        // Sets max amount of pagination visible at start
        if(findPagination.length > 3){
            for(let paginationMax = 3; paginationMax < findPagination.length; paginationMax++){
                pagination.parentElement.getElementsByClassName("pagination-number")[paginationMax].classList.add("make-invis");
            }
            pagination.parentElement.getElementsByClassName("last-ellipses")[0].classList.remove("make-invis");
        } 
        
        // Creates Pagination functionality
        findPagination.forEach(selectPagination);
        function selectPagination(paginationNumber){
            paginationNumber.addEventListener("click", function () {
                // Find pagination number position
                let paginationPosition = 5 * (parseInt(paginationNumber.textContent)- 1);
                let paginationLi = pagination.getElementsByTagName("li");
                // Hides all items that are invisible
                for(let allInvis = 0; allInvis < liLength; allInvis++ ){
                    paginationLi[allInvis].classList.add("make-invis");
                }

                // Reveals only items needed
                for(let removeInvis = 0; removeInvis < 5; removeInvis++ ){
                    if(paginationLi[removeInvis + paginationPosition]){
                        paginationLi[removeInvis + paginationPosition].classList.remove("make-invis");
                    } 
                }

                var paginationTotal = paginationNumber.parentElement.getElementsByClassName("pagination-number").length;
                let pagNumLoc = paginationNumber.parentElement.getElementsByClassName("pagination-number");
                //reveals all pagination if invisible and removes selected pagination class
                for(let revealPagNum = 0; revealPagNum < paginationTotal; revealPagNum++){
                    pagNumLoc[revealPagNum].classList.remove("make-invis");
                    pagNumLoc[revealPagNum].classList.remove("pagination-selected");
                }

                // Adds seleceted class to clicked pagination number
                paginationNumber.classList.add("pagination-selected");
                let firstEllipLoc = paginationNumber.parentElement.getElementsByClassName("first-ellipses")[0];
                let lastEllipLoc = paginationNumber.parentElement.getElementsByClassName("last-ellipses")[0];
                //hides unused pagination and reveals appropiate ellipses
                for(let invisPagNum = 0; invisPagNum < paginationTotal; invisPagNum++){

                    // Removes pagination 2 greater than clicked pagination and adds ellipses
                    if(parseInt(paginationNumber.textContent) +1 < parseInt(pagNumLoc[invisPagNum].textContent) ){
                        pagNumLoc[invisPagNum].classList.add("make-invis");
                        lastEllipLoc.classList.remove("make-invis");
                    }
                    
                    // Removes pagination 2 lesser than clicked pagination and adds ellipses
                    if(parseInt(paginationNumber.textContent) -1 > parseInt(pagNumLoc[invisPagNum].textContent) ){
                        pagNumLoc[invisPagNum].classList.add("make-invis");
                        firstEllipLoc.classList.remove("make-invis");
                    }
                }

                // Checks for start/end ellipses to be removed
                if(pagNumLoc[0].classList.contains('make-invis') != true){
                    firstEllipLoc.classList.add("make-invis");
                } else if(pagNumLoc[parseInt(paginationTotal)-1].classList.contains('make-invis') != true){
                    lastEllipLoc.classList.add("make-invis");
                }
            });     
        // Selects first pagination number
        pagination.parentElement.getElementsByClassName("pagination-number")[0].classList.add("pagination-selected")
        }
    }
}
