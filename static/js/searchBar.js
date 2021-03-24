// Makes search bar visible wen user clicks on it and adds defensive code
var findSearchBar = document.querySelectorAll(".searchBar");
findSearchBar.forEach(selectSearchBar);
function selectSearchBar(item, index){

    // Makes search bar visible with user click
    item.addEventListener("click", function () {
        item.getElementsByTagName("input")[0].classList.remove("make-invis")
        item.getElementsByTagName("input")[0].focus()
    })

    // Makes sure users are unable to submit blank queries
    item.getElementsByTagName("input")[0].addEventListener("keyup", function () {
        if(item.getElementsByTagName("input")[0].value != "") {
            item.getElementsByTagName("button")[0].removeAttribute("disabled")
        }else if(item.getElementsByTagName("input")[0].value == "") {
            item.getElementsByTagName("button")[0].setAttribute("disabled", "")
        }
    })

}

