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

//Adds ripple effect for links
var findLinks = document.querySelectorAll(".social-position");
findLinks.forEach(selectLinks)
function selectLinks (item, index) {
    item.addEventListener("mouseenter", function() {
        item.getElementsByTagName("i")[0].classList.add("dipping-ice")
        item.getElementsByTagName("span")[0].classList.add("create-ripple")
        setTimeout(function () {
            item.getElementsByTagName("span")[0].classList.remove("create-ripple")
            item.getElementsByTagName("i")[0].classList.remove("dipping-ice")
        },3000)
    })
}