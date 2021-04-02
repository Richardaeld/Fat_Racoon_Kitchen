// Reveal new password button
// Defensive code to keep users from starting the validation of new passwords
var revealPassword = document.getElementsByClassName("hidePassword");
revealPassword[0].addEventListener("click", function() {
    revealPassword[0].classList.add("make-invis");
    revealPassword[1].classList.remove("make-invis");
    revealPassword[2].classList.remove("make-invis");
})

// ---- Apply Random Avatar Name to Avatar Image
// Adds randomly generated image name if new image present
document.getElementById("custom-button").addEventListener("click", function() {
    document.getElementById("avatar_name").setAttribute("value", imageName);
    if (document.getElementById("avatar").value != ""){
        document.getElementById("avatar_file_valid").value = true;
    }
})