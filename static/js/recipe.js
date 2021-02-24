// ---- Cross out ingredients and steps
// Finds all list items under class .recipe-lists and assigns text decoration line-through or none
AllLists = document.querySelectorAll(".recipe-lists > li");
AllLists.forEach(list);
function list (item, index){
    // Event cycles through text decoration for crossout effect
    item.addEventListener("click", function() {
        let itemLoc =  item.getElementsByTagName("h6")[0]
        if (itemLoc.style.textDecoration == "line-through"){
            itemLoc.style.textDecoration = "none";
        } else {
            itemLoc.style.textDecoration = "line-through";
        }
    })
}
// ---- Set Avatar Image size
// if Avatar exists give it a height and width
if (document.getElementById("avatarImg").getElementsByTagName("img")[0]){
    // find height and width of container
    let loc = document.getElementById("avatarImg");
    let avatarHeight = loc.clientHeight;
    let avatarWidth =  loc.clientWidth;

    // Alter height and width to compensate for padding
    avatarWidth = (avatarWidth * 0.9) + "px";
    avatarHeight = (avatarHeight * 0.9) + "px";

    // Applying new height and width so image stays in container
    loc.getElementsByTagName("img")[0].style.height = avatarHeight;
    loc.getElementsByTagName("img")[0].style.width = avatarWidth;
}

// ---- Delete Modal
// Open Delete Modal
document.getElementById("deleteModal").addEventListener("click", function() {
    document.getElementsByClassName("custom-modal")[0].classList.remove("make-invis");
})
// Close Delete Modal
document.getElementsByClassName("modal-background")[0].addEventListener("click", function () {
    document.getElementsByClassName("custom-modal")[0].classList.add("make-invis");
})

// Delete form validation logic
document.getElementById("recipeName").addEventListener("keyup", function() {
    let modalButton = document.getElementById("custom-button");
    let check = document.getElementById("checkName").getElementsByTagName("span")[0].getAttribute("value");
    let userinput = document.getElementById("recipeName").value;

    // Apply disabled or ignore as needed
    if (check != userinput) {
        if (check == userinput){
            modalButton.removeAttribute("disabled")
        }
    }
})
