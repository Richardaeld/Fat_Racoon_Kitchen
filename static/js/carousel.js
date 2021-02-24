// ---- Carousel 
// builds an array of carousel data
var carousel = document.querySelectorAll(".card-carousel");

// Find width of screen and sets amount of carousel boxes
// This function is called by a global event handler and 
// resizes according to the current width of screen
var reveal; // Amount of cards to reveal per responsiveness
function findWidth(){
    let screenWidth;
    screenWidth = window.screen.clientWidth; // Find screen width

    // Sets carousel number to be shown
    if (screenWidth > 1200) {
        reveal = 3;
    } else if (screenWidth > 768) {
        reveal = 3;
    } else if (screenWidth > 576){
        reveal = 2;
    } else {
        reveal = 1;
    }

    let visible = document.querySelectorAll(".card-carousel-vis"); // Finds the amount of visible carousel boxes

    // Checks to see if boxes need to be removed
    if (visible.length >= reveal) {
        // Removes all carousel boxes
        for (let i=0; i <= visible.length-1; i++) {
            document.querySelector(".card-carousel-vis").classList.remove("card-carousel-vis");
        }
    }
    // Adds in correct amount of carousel boxes
    for (i=0; i<reveal; i++) {
        carousel[i].classList.add("card-carousel-vis");
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

// Carousel button function
var locCarouselArray =  document.getElementsByClassName("card-carousel")[carouselArray[i]]
function carouselButton (button) {
    document.getElementsByClassName(button)[0].addEventListener("click", function () {
        for (let i=0; i < reveal; i++){
            locCarouselArray.classList.remove("card-carousel-vis");
        }
        if (button == "carousel-right")
            for (let i=0; i < reveal; i++){
                let x = carouselArray.shift();
                carouselArray.push(x);
            }
        else if (button == "carousel-left")
            for (let i=0; i < reveal; i++){
                let x = carouselArray.pop();
                carouselArray.unshift(x);
            }
        for (let i=0; i < reveal; i++){
            locCarouselArray.classList.add("card-carousel-vis");
        }
    })
}

carouselButton("carousel-right");
carouselButton("carousel-left");

// ---- login modal
// Allows login modal to function and pop up
let modal = document.getElementsByClassName("custom-modal")[0]; // modal
let signInModal = document.querySelectorAll(".login-modal"); // login button
let button = document.getElementsByClassName("custom-button")[0]; // submit button
signInModal.forEach(popUpModal);
function popUpModal(item, index){
    item.addEventListener("click", function () {
        modal.classList.remove("make-invis");
    });
}
// makes modal disappear if background clicked
document.getElementsByClassName("modal-background")[0].addEventListener("click", function() {
    modal.classList.add("make-invis");
})

// adds a different background to button when clicked
button.addEventListener("click", function () {
    button.classList.add("custom-button-press");
})

