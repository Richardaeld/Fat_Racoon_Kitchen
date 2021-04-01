// Removes all flash messages after 7 seconds
if (document.getElementById("flash").getElementsByTagName("div")[0]){
    setTimeout( function () {
        flashRm = document.querySelectorAll(".flash").length;
        for (i=0; i<flashRm; i++){
            var divRemove = document.getElementsByClassName("flash")[0];
            divRemove.remove();
        }
    },7000)
}

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

