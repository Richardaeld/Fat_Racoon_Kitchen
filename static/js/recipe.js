// ---- Cross out ingredients and steps
// Finds all list items under class .recipe-lists and assigns text decoration line-through or none
AllLists = document.querySelectorAll(".recipe-lists > li");
AllLists.forEach(list);
function list (item, index){
    // Event cycles through text decoration for crossout effect
    item.addEventListener("click", function() {
        let itemLoc1 =  item.getElementsByTagName("h6")[0]
        let itemLoc2 =  item.getElementsByTagName("h6")[1]
        if (itemLoc1.style.textDecoration == "line-through"){
            itemLoc1.style.textDecoration = "none";
            itemLoc2.style.textDecoration = "none";
            itemLoc1.parentElement.getElementsByTagName("input")[0].checked = false
        } else {
            itemLoc1.style.textDecoration = "line-through";
            itemLoc2.style.textDecoration = "line-through";
            itemLoc1.parentElement.getElementsByTagName("input")[0].checked = true

        }
    })
}

// ---- Delete Modal
// Open Delete Modal
if (document.getElementById("deleteModal") != null){
    document.getElementById("deleteModal").addEventListener("click", function() {
        document.getElementsByClassName("custom-modal-delete")[0].classList.remove("make-invis");
        document.getElementById("recipeName").focus()
    })
}
// Close Delete Modal
document.getElementsByClassName("modal-background")[1].addEventListener("click", function () { // Im for the delete modal 
    document.getElementsByClassName("custom-modal-delete")[0].classList.add("make-invis");
})

// Delete form validation logic
document.getElementById("recipeName").addEventListener("keyup", function() {
    let modalButton = document.getElementById("custom-button-delete");
    let check = document.getElementById("checkName").getElementsByTagName("span")[0].getAttribute("value");
    let userinput = document.getElementById("recipeName").value;

    // Apply disabled or ignore as needed
    if (check != userinput) {
        modalButton.setAttribute("disabled", "")
    }
    if (check == userinput){
        modalButton.removeAttribute("disabled")
    }
})
