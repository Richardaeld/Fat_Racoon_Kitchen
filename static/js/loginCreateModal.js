// ---- login modal
// Allows login/create modal to open
let modal = document.getElementsByClassName("custom-modal")[0]; // modal
let signInModal = document.querySelectorAll(".login-modal"); // login button
let button = document.getElementsByClassName("custom-button")[0]; // submit button
signInModal.forEach(popUpModal);
function popUpModal(openModal){
    openModal.addEventListener("click", function () {
        modal.classList.remove("make-invis");
    });
}
// Removes login/create modal if background clicked
document.getElementsByClassName("modal-background")[0].addEventListener("click", function() {
    modal.classList.add("make-invis");
})

// Creates a depressed look if button clicked
button.addEventListener("click", function () {
    button.classList.add("custom-button-press");
})

// ---- Login modal tab selector (login or create)
// Makes the tab for login and create account clickable and switch between login and create account areas
modaltabs = document.querySelectorAll(".tab");
modaltabs.forEach(tabSelect);
function tabSelect(modalTab) {
    modalTab.addEventListener("click", function () {
        var totalCreate = document.querySelectorAll(".login-account").length;
        var tabLoc = document.getElementsByClassName("create-account"); // user input div
        // Applies login settings
        if(modalTab.textContent.trim() === "Login"){
            // Removes all create account material form modal
            for (removeCreate = 0; removeCreate < totalCreate - 1; removeCreate++){
                let tabInputLoc = document.getElementsByClassName("create-account")[removeCreate].getElementsByTagName("input")[0]; // user input value loc
                tabLoc[removeCreate].classList.add("make-invis");
                tabInputLoc.removeAttribute("required");
                tabInputLoc.setAttribute("value", "");
                tabInputLoc.value = "";
            }
            //sets submit button value
            document.getElementById("custom-button").value = "Login";
            // Undoes auto fail for password check so it does not disrupt user login on login mode
            document.getElementById("passwordCheck2").parentElement.getElementsByTagName("p")[1].classList.add("make-invis");
            // Makes sure username does not auto fail validation
            document.getElementById("name").parentElement.getElementsByTagName("p")[0].classList.add("make-invis");
            // Checks Validation
            formIsValid = true;
            finalValidation();

        // Applies create settings
        } else {
            // Adds all create account material to modal
            for (addCreate = 0; addCreate < totalCreate - 1; addCreate++){
                tabLoc[addCreate].classList.remove("make-invis");
                tabLoc[addCreate].getElementsByTagName("input")[0].setAttribute("required", "");
            }
            // Sets submit button to create value
            document.getElementById("custom-button").value = "Create";
            // Makes sure confirm password does not auto validate
            document.getElementById("passwordCheck2").parentElement.getElementsByTagName("p")[1].classList.remove("make-invis");
            // Makes sure username does not auto validate
            document.getElementById("name").parentElement.getElementsByTagName("p")[0].classList.remove("make-invis");
            // Checks Validation
            finalValidation();
        }

        // Changes the filter from Login to create account on click
        document.querySelector(".tab-selected").classList.remove("tab-selected");
        modalTab.classList.add("tab-selected");
    });
}
