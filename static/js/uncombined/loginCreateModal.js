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
