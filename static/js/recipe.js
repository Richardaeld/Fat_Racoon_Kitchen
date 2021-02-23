// Finds all list items under class .recipe-lists and assigns text decoration line-through or none
AllLists = document.querySelectorAll(".recipe-lists > li");
AllLists.forEach(list);
function list (item, index){
    item.addEventListener("click", function() {
        var itemLoc =  item.getElementsByTagName("h6")[0]
        if (itemLoc.style.textDecoration == "line-through"){
            itemLoc.style.textDecoration = "none";
        } else {
            itemLoc.style.textDecoration = "line-through";
        }
    })
}

// find height and width of container
var crabHeight = document.getElementById("avatarImg").clientHeight;
var crabWidth =  document.getElementById("avatarImg").clientWidth;
console.log(document.getElementById("avatarImg").getBoundingClientRect())

// Alter height and width to compensate for padding
crabWidth = (crabWidth * 0.9) + "px";
crabHeight = (crabHeight * 0.9) + "px";
console.log(crabHeight);
console.log(crabWidth);

// Applying new height and width so image stays in container
//document.getElementById("avatarImg").getElementsByTagName("img")[0].style.height = crabHeight;
//document.getElementById("avatarImg").getElementsByTagName("img")[0].style.width = crabWidth;

// Open Delete Modal
document.getElementById("deleteModal").addEventListener("click", function() {
    document.getElementsByClassName("custom-modal")[0].classList.remove("make-invis");
})

document.getElementsByClassName("modal-background")[0].addEventListener("click", function () {
    document.getElementsByClassName("custom-modal")[0].classList.add("make-invis");
})

// Delete form validation logic
document.getElementById("recipeName").addEventListener("keyup", function() {
    let check = document.getElementById("checkName").getElementsByTagName("span")[0].getAttribute("value");
    let userinput = document.getElementById("recipeName").value;
    console.log(userinput)
    // Apply disabled or ignore as needed
    if (check != userinput) {
        if (document.getElementById("custom-button").hasAttribute("disbaled")){
            //no nothing
        } else {
            document.getElementById("custom-button").setAttribute("disabled", "");
        }
        console.log("nope")
    // remove disabled if name and user input match
    } else if (check == userinput){
        console.log("correct")
        document.getElementById("custom-button").removeAttribute("disabled")
    }
})
