// Removes flash after 7 seconds
if (document.getElementById("flash").getElementsByTagName("div")[0]){
    setTimeout( function () {
        document.getElementById("flash").getElementsByTagName("div")[0].remove();
    },7000)
}