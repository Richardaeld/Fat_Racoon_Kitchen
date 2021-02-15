// builds an array of carousel data
var carousel = document.querySelectorAll(".card-carousel");

// Find width of screen and sets amount of carousel boxes
// This function is called by a global event handler and 
// resizes according to the current width of screen
var reveal;
function findWidth(){
    let screenWidth;
   // var reveal; 
    screenWidth = window.screen.width;



    // Sets carousel number to be shown
    if (screenWidth > 1200) {
        reveal = 3;
    } else if (screenWidth > 768) {
        reveal = 3;
    } else if (screenWidth > 576){
        reveal = 2
    } else {
        reveal = 1;
    }

    

    // Finds the amount of visible carousel boxes
    let visible = document.querySelectorAll(".card-carousel-vis")

    // Checks to see if boxes need to be removed
    if (visible.length >= reveal) {

        // Removes all carousel boxes
        for (let i=0; i <= visible.length-1; i++) {
            document.querySelector(".card-carousel-vis").classList.remove("card-carousel-vis");
        }
    }
    
    // Adds in carousel boxes
    for (i=0; i<reveal; i++) {
        carousel[i].classList.add("card-carousel-vis")
    }

}



// initial setting of carousel boxes
findWidth();

// Global event handler that catchs any resizing of 
// screen and calls function findwidth
window.onresize = findWidth;

// counts carousel item length and creates an index array
var carouselArray = []
for(i=0; i<(carousel.length); i++){
    carouselArray.push(i);
}

// Left button on card carousel -- switches to previous carousel item
document.getElementsByClassName("carousel-left")[0].addEventListener("click", function () {
    console.log (reveal)
    for (let i=0; i < reveal; i++){
        document.getElementsByClassName("card-carousel")[carouselArray[i]].classList.remove("card-carousel-vis")
    }
    for (let i=0; i < reveal; i++){
        let x = carouselArray.pop()
        carouselArray.unshift(x)
    }
    for (let i=0; i < reveal; i++){
        document.getElementsByClassName("card-carousel")[carouselArray[i]].classList.add("card-carousel-vis")
    }
})

// Right button on card carousel -- switches to next carousel item
document.getElementsByClassName("carousel-right")[0].addEventListener("click", function () {
    for (let i=0; i < reveal; i++){
        document.getElementsByClassName("card-carousel")[carouselArray[i]].classList.remove("card-carousel-vis")
    }
    for (let i=0; i < reveal; i++){
        let x = carouselArray.shift()
        carouselArray.push(x)
    }
    for (i=0; i < reveal; i++){
        document.getElementsByClassName("card-carousel")[carouselArray[i]].classList.add("card-carousel-vis")
    }
})





// Allows login modal to function and pop up
var signInModal = document.querySelectorAll(".login-modal");
signInModal.forEach(popUpModal);
function popUpModal(item, index){
    item.addEventListener("click", function () {
        document.getElementsByClassName("custom-modal")[0].classList.remove("make-invis");
    });
}
// makes modal disappear if background clicked
document.getElementsByClassName("modal-background")[0].addEventListener("click", function() {
    document.getElementsByClassName("custom-modal")[0].classList.add("make-invis");
})

// adds a different background to button when clicked
document.getElementsByClassName("custom-button")[0].addEventListener("click", function () {
    document.getElementsByClassName("custom-button")[0].classList.add("custom-button-press");
})

