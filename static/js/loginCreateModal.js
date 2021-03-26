// ---- login modal
// Allows login modal to function and pop up
let modal = document.getElementsByClassName("custom-modal")[0]; // modal
let signInModal = document.querySelectorAll(".login-modal"); // login button
let button = document.getElementsByClassName("custom-button")[0]; // submit button
signInModal.forEach(popUpModal);
function popUpModal(item, index){
    item.addEventListener("click", function () {
        modal.classList.remove("make-invis");
    });
}
// makes modal disappear if background clicked
document.getElementsByClassName("modal-background")[0].addEventListener("click", function() {
    modal.classList.add("make-invis");
})

// adds a different background to button when clicked
button.addEventListener("click", function () {
    button.classList.add("custom-button-press");
})

// ---- Login modal tab selector (login or create)
// Makes the tab for login and create account clickable and switch between login and create account areas
modaltabs = document.querySelectorAll(".tab");
modaltabs.forEach(tabSelect);
function tabSelect(item, index) {
    item.addEventListener("click", function () {
        // Finds total to iterate over
        var totalCreate = document.querySelectorAll(".login-account").length;
        var tabLoc = document.getElementsByClassName("create-account"); // user input div
        if(item.textContent.trim() === "Login"){
            // Makes all create account material invisible and removes required when login is clicked  
            for (i=0; i <totalCreate-1; i++){
                let tabInputLoc = document.getElementsByClassName("create-account")[i].getElementsByTagName("input")[0]; // user input value loc
                tabLoc[i].classList.add("make-invis");
                tabInputLoc.removeAttribute("required");
                tabInputLoc.setAttribute("value", "");
                tabInputLoc.value = "";

            }
            //sets submit button value
            document.getElementById("custom-button").value = "Login"
            // Undoes auto fail for password check so it does not disrupt user login on login mode            
            document.getElementById("passwordCheck2").parentElement.getElementsByTagName("p")[1].classList.add("make-invis")
            // Makes sure username does not auto fail validation
            document.getElementById("name").parentElement.getElementsByTagName("p")[0].classList.add("make-invis")
            // Checks Validation
            formIsValid = true
            finalValidation()


        } else {
            // Makes all create account material visivle and makes adds required when create account is clicked
            for (i=0; i <totalCreate-1; i++){
                tabLoc[i].classList.remove("make-invis");
                tabLoc[i].getElementsByTagName("input")[0].setAttribute("required", "");
            }
            // Sets submit button value
            document.getElementById("custom-button").value = "Create"
            // Makes sure confirm password does not auto validate
            document.getElementById("passwordCheck2").parentElement.getElementsByTagName("p")[1].classList.remove("make-invis")
            // Makes sure username does not auto validate
            document.getElementById("name").parentElement.getElementsByTagName("p")[0].classList.remove("make-invis")
            // Checks Validation
            finalValidation()
        }

        // Changes the filter from Login to create account on click
        document.querySelector(".tab-selected").classList.remove("tab-selected");
        item.classList.add("tab-selected")
    });
}
