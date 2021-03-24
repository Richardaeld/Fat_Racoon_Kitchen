// ---- Carousel 
// builds an array of carousel data
var carousel = document.querySelectorAll(".card-carousel");

// Find width of screen and sets amount of carousel boxes
// This function is called by a global event handler and 
// resizes according to the current width of screen
var reveal; // Amount of cards to reveal per responsiveness
var carouselArray = [] // Sets array for carousel
function findWidth(){

    // counts carousel item length, creates an index array, and resets array
    carouselArray = [] 
    for(i=0; i<(carousel.length); i++){
        carouselArray.push(i);
    }

    let screenWidth;
    screenWidth = document.body.offsetWidth; // Find screen width
    // Sets carousel number to be shown
    if (screenWidth > 1200) {
        reveal = 3;
    } else if (screenWidth > 992) {
        reveal = 2;
    } else if (screenWidth > 768){
        reveal = 1;
    } else {
        reveal = 1;
    }

    let visible = document.querySelectorAll(".card-carousel-vis"); // Finds the amount of visible carousel boxes

    // Checks to see if there are visible boxes to be removed
    if (visible.length > 0) {
        // Removes all visible carousel boxes
        for (let i=0; i <= visible.length-1; i++) {
            document.querySelector(".card-carousel-vis").classList.remove("card-carousel-vis");
        }
    }
    // Adds in correct amount of carousel boxes -- makes them visible with this class
    for (i=0; i<reveal; i++) {
        carousel[i].classList.add("card-carousel-vis");
    }
}

// initial setting of carousel boxes
findWidth();

// Global event handler that catchs any resizing of 
// screen and calls function findwidth
//window.onresize = findWidth; -- original format
window.addEventListener('resize', findWidth);

// Carousel button function
function carouselButton (button) {
    document.getElementsByClassName(button)[0].addEventListener("click", function () {
        //removes all current visible elements
        for (let i=0; i < reveal; i++){
            document.getElementsByClassName("card-carousel")[carouselArray[i]].classList.remove("card-carousel-vis");
        }
        // Carousel right button
        if (button == "carousel-right")
            for (let i=0; i < reveal; i++){
                let x = carouselArray.shift();
                carouselArray.push(x);
            }
        // Carousel left button
        else if (button == "carousel-left")
            for (let i=0; i < reveal; i++){
                let x = carouselArray.pop();
                carouselArray.unshift(x);
            }
        // Makes new elements visible
        for (let i=0; i < reveal; i++){
            document.getElementsByClassName("card-carousel")[carouselArray[i]].classList.add("card-carousel-vis");
        }
    })
}

carouselButton("carousel-right");
carouselButton("carousel-left");

