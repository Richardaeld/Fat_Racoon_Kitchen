// ---- Carousel 
// builds an array of carousel data
var carousel = document.querySelectorAll(".card-carousel");

// Find width of screen and sets amount of carousel boxes
// This function is called by a global event handler and 
// resizes according to the current width of screen further down
var reveal; // Amount of cards to reveal per responsiveness
var carouselArray = []; // Sets array for carousel
function findWidth(){

    // Counts carousel item length, creates an index array, and resets array
    carouselArray = [];
    for(let arrayCount = 0; arrayCount < carousel.length; arrayCount++){
        carouselArray.push(arrayCount);
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
        for (let removeBoxes = 0; removeBoxes <= visible.length - 1; removeBoxes++) {
            document.querySelector(".card-carousel-vis").classList.remove("card-carousel-vis");
        }
    }
    // Adds in correct amount of carousel boxes -- makes them visible with this class
    for (let addBoxes = 0; addBoxes < reveal; addBoxes++) {
        carousel[addBoxes].classList.add("card-carousel-vis");
        carousel[addBoxes].classList.remove("transition-fade-out");
    }
}

// initial setting of carousel boxes
findWidth();

// Global event handler that catchs any resizing of 
// screen and calls function findwidth
window.addEventListener('resize', findWidth);

// Carousel button function
function carouselButton (button) {
    document.getElementsByClassName(button)[0].addEventListener("click", function () {
        // Adds fade effect to carousel
        for (let removeVisible = 0; removeVisible < reveal; removeVisible++){
            document.getElementsByClassName("card-carousel")[carouselArray[removeVisible]].classList.add("transition-fade-out");
        }
        // Changes carousel after it has faded out
        setTimeout(function() {

            //removes all current visible elements
            for (let removeVisible = 0; removeVisible < reveal; removeVisible++){
                document.getElementsByClassName("card-carousel")[carouselArray[removeVisible]].classList.remove("card-carousel-vis");
                document.getElementsByClassName("card-carousel")[carouselArray[removeVisible]].classList.add("transition-fade-out");
            }
            // Carousel right button
            if (button == "carousel-right")
            for (let buttonRight=0; buttonRight < reveal; buttonRight++){
                let moveCarouselRight = carouselArray.shift();
                carouselArray.push(moveCarouselRight);
            }
            // Carousel left button
            else if (button == "carousel-left")
            for (let buttonLeft = 0; buttonLeft < reveal; buttonLeft++){
                let moveCarouselLeft = carouselArray.pop();
                carouselArray.unshift(moveCarouselLeft);
            }
            // Makes new elements visible
            for (let addVisible = 0; addVisible < reveal; addVisible++){
                document.getElementsByClassName("card-carousel")[carouselArray[addVisible]].classList.add("card-carousel-vis");
                document.getElementsByClassName("card-carousel")[carouselArray[addVisible]].classList.remove("transition-fade-out");
            }
        },500);
    });
}
// Calls carousel to move right
carouselButton("carousel-right");
// Calls carousel to move left
carouselButton("carousel-left");

