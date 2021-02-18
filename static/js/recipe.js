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