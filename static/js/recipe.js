// ---- Cross out ingredients and steps
// Finds all list items under class .recipe-lists and assigns text decoration line-through or none
AllLists = document.querySelectorAll(".recipe-lists > li");
AllLists.forEach(list);
function list (listItem){
    // Event cycles through text decoration for crossout effect
    listItem.addEventListener("click", function(crossOut) {
        let itemLoc1 =  listItem.getElementsByTagName("h6")[0]
        let itemLoc2 =  listItem.getElementsByTagName("h6")[1]
        //Crossout and uncrossout list items
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
// Open Delete Modal and focus on it
if (document.getElementById("deleteModal") != null){
    document.getElementById("deleteModal").addEventListener("click", function() {
        document.getElementsByClassName("custom-modal-delete")[0].classList.remove("make-invis");
        document.getElementById("recipeName").focus()
    })
}
// Close Delete Modal with background click
document.getElementsByClassName("modal-background")[1].addEventListener("click", function () {
    document.getElementsByClassName("custom-modal-delete")[0].classList.add("make-invis");
})

// Delete form validation logic
document.getElementById("recipeName").addEventListener("keyup", function() {
    let modalButton = document.getElementById("custom-button-delete");
    let check = document.getElementById("checkName").getElementsByTagName("span")[0].getAttribute("value");
    let userinput = document.getElementById("recipeName").value;

    // Apply disabled if validation fails
    if (check != userinput) {
        modalButton.setAttribute("disabled", "")
    }
    // Removes disable if validation succeeds
    if (check == userinput){
        modalButton.removeAttribute("disabled")
    }
})
