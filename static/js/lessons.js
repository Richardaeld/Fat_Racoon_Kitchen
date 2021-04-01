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

// Makes sure index cards are appropriately sized
var findIndexCards = document.querySelectorAll(".index-rotate");
findIndexCards.forEach(selectIndexCards);
function selectIndexCards(item, index){
    var height1 = item.getElementsByClassName("index-face")[0].clientHeight;
    var height2 = item.getElementsByClassName("index-back")[0].clientHeight;
    if(height1 > height2){
        console.log(height1)
        item.parentElement.style.height = height1 + "px"
    }else{
        console.log(height2)
        item.parentElement.style.height = height2 + "px"

    }
}