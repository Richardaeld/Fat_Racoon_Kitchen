var findSearchBar = document.querySelectorAll(".searchBar");
findSearchBar.forEach(selectSearchBar);
function selectSearchBar(item, index){
    item.addEventListener("click", function () {
        item.getElementsByTagName("input")[0].classList.remove("make-invis")
    //    item.getElementsByTagName("input")[1].classList.remove("make-invis")

        //if (item.getElementsByTagName("input")[0] == undefined){
        //    var createInput = document.createElement("input");
        //    createInput.className = "search-bar"
        //    item.appendChild(createInput)
        //}
    })

}