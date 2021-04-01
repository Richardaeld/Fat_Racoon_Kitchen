// Makes sure index cards are appropriately sized
// Makes index card flippable
var findIndexCards = document.querySelectorAll(".index-rotate");
findIndexCards.forEach(selectIndexCards);
function selectIndexCards(card){
    // Checks to be sure both side heights match or sets them both at height of higher card
    var height1 = card.getElementsByClassName("index-face")[0].clientHeight;
    var height2 = card.getElementsByClassName("index-back")[0].clientHeight;
    if(height1 > height2){
        card.parentElement.style.height = height1 + "px";
    }else{
        card.parentElement.style.height = height2 + "px";
    }

    // Flip/unflip card depending upon card position
    var rotateLoc = card.classList;
    card.addEventListener("click", function() {
        if(rotateLoc.contains("flip-index-card") == true){
            rotateLoc.remove("flip-index-card");
        }else{
            rotateLoc.add("flip-index-card");
        }
    })
}