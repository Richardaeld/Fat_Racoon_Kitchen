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