// Makes the tab for login and create account clickable and switch between login and create account areas
modaltabs = document.querySelectorAll(".tab");
modaltabs.forEach(tabSelect);
function tabSelect(item, index) {
    item.addEventListener("click", function () {
        // Finds total to iterate over
        var totalCreate = document.querySelectorAll(".login-account").length;

        if(item.textContent.trim() === "Login"){
            // Makes all create account material invisible and removes required when login is clicked  
            for (i=0; i <totalCreate; i++){
                document.getElementsByClassName("create-account")[i].classList.add("make-invis");
                document.getElementsByClassName("create-account")[i].getElementsByTagName("input")[0].removeAttribute("required");
            }
        } else {
            // Makes all create account material visivle and makes adds required when create account is clicked
            for (i=0; i <totalCreate; i++){
                document.getElementsByClassName("create-account")[i].classList.remove("make-invis");
                document.getElementsByClassName("create-account")[i].getElementsByTagName("input")[0].setAttribute("required", "");
            }
        }

        // Changes the filter from Login to create account on click
        document.querySelector(".tab-selected").classList.remove("tab-selected");
        item.classList.add("tab-selected")
    });
}
