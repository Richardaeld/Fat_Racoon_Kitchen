// ----Removes all flash messages after 7 seconds
if (document.getElementById("flash").getElementsByTagName("div")[0]){
    setTimeout( function () {
        flashRm = document.querySelectorAll(".flash").length;
        for (flashCount = 0; flashCount < flashRm; flashCount++){
            var divRemove = document.getElementsByClassName("flash")[0];
            divRemove.remove();
        }
    },7000)
}

// ----Social link animation
// Function to make social links have rippling liquid effect with dipping ice
function makeRipples (targetLink) {
    targetLiquid = targetLink.getElementsByTagName("span")[0];
    targetIce = targetLink.getElementsByTagName("i")[0];
    targetIce.classList.add("dipping-ice");
    targetLiquid.classList.add("create-ripple");
    // Resets animation after 3 seconds
    setTimeout(function () {
        targetIce.classList.remove("dipping-ice");
        targetLiquid.classList.remove("create-ripple");
    },3000)
}

//Adds ripple effect to mouse over event listeners for social links
var findLinks = document.querySelectorAll(".social-position");
findLinks.forEach(selectLinks);
function selectLinks (link) {
    // for mouse users
    link.addEventListener("mouseenter", function() {
        makeRipples (link);
    })
    // for touch screen users
    link.addEventListener("touchmove", function() {
        makeRipples (link);
    })
}

// ----Search bar
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

