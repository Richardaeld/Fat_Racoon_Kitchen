// Makes search bar visible wen user clicks on it and adds defensive code
var findSearchBar = document.querySelectorAll(".searchBar");
findSearchBar.forEach(selectSearchBar);
function selectSearchBar(searchBar){

    // Makes search bar visible with user click
    searchInput = searchBar.getElementsByTagName("input")[0]
    searchBar.addEventListener("click", function () {
        searchInput.classList.remove("make-invis");
        searchInput.focus();
    })

    // Makes sure users are unable to submit blank queries
    searchButton = searchBar.getElementsByTagName("button")[0]
    searchInput.addEventListener("keyup", function () {
        if(searchInput.value != "") {
            searchButton.removeAttribute("disabled");
        }else if(searchInput.value == "") {
            searchButton.setAttribute("disabled", "");
        }
    })

}

