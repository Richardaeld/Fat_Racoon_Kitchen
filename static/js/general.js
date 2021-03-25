// Removes all flash messages after 7 seconds
if (document.getElementById("flash").getElementsByTagName("div")[0]){
    setTimeout( function () {
        flashRm = document.querySelectorAll(".flash").length
        for (i=0; i<flashRm; i++){
            var divRemove = document.getElementsByClassName("flash")[0];
            divRemove.remove()
        }
    },7000)
}

// Function to make social links have rippling liquid effect
function makeRipples (targetEl) {
    targetEl.getElementsByTagName("i")[0].classList.add("dipping-ice")
    targetEl.getElementsByTagName("span")[0].classList.add("create-ripple")
    setTimeout(function () {
        targetEl.getElementsByTagName("span")[0].classList.remove("create-ripple")
        targetEl.getElementsByTagName("i")[0].classList.remove("dipping-ice")
    },3000)
}

//Adds ripple effect to event listeners for social links
var findLinks = document.querySelectorAll(".social-position");
findLinks.forEach(selectLinks)
function selectLinks (item, index) {
    // for mouse users
    item.addEventListener("mouseenter", function() {
        makeRipples (item);
    })
    // for touch screenusers
    item.addEventListener("touchmove", function() {
        makeRipples (item);
    })
}

