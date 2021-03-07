var findSearchBar = document.querySelectorAll(".searchBar");
findSearchBar.forEach(selectSearchBar);
function selectSearchBar(item, index){
    item.addEventListener("click", function () {
        item.getElementsByTagName("input")[0].classList.remove("make-invis")

    })
    item.getElementsByTagName("input")[0].addEventListener("keyup", function () {
        console.log(";lksadjfklasj")
        if(item.getElementsByTagName("input")[0].value != "") {
            item.getElementsByTagName("button")[0].removeAttribute("disabled")
        }else if(item.getElementsByTagName("input")[0].value == "") {
            item.getElementsByTagName("button")[0].setAttribute("disabled", "")
        }
    })

}