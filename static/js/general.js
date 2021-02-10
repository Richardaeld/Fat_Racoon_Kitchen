// Removes flash after 7 seconds
if (document.getElementById("flash").getElementsByTagName("div")[0]){

    setTimeout( function () {
        flashRm = document.querySelectorAll(".flash").length
        for (i=0; i<flashRm; i++){
            var divRemove = document.getElementsByClassName("flash")[0];
            divRemove.remove()
        }
    },3000)
}