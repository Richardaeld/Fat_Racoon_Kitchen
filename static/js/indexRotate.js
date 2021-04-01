// Makes index card flippable
var findIndexCards = document.querySelectorAll(".rotating-card");
findIndexCards.forEach(flipIndex);
function flipIndex(item, index) {
    item.addEventListener("click", function () {
        console.log(item.getElementsByClassName("index-rotate")[0].classList.contains("flip-index-card"))
        if(item.getElementsByClassName("index-rotate")[0].classList.contains("flip-index-card") == true){
            console.log("I tripped")
            item.getElementsByClassName("index-rotate")[0].classList.remove("flip-index-card")
        }else{
            item.getElementsByClassName("index-rotate")[0].classList.add("flip-index-card")
        }
    })
} 
