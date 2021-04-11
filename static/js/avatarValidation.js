// ---- Create Random Avatar name
// Creates a random string for image name assignment
const characterLibrary = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_@!&,?0123456789";
const characterLibraryLength = characterLibrary.length;
var imageName = "";
// Creates a random 20 character Image name
for (let i=0; i<20; i++){
    let characterLibraryIndex = Math.floor(Math.random()*(characterLibraryLength));
    imageName += characterLibrary[characterLibraryIndex];
}

// ---- Avatar Image Validation
// Check file size
document.getElementById("avatar").addEventListener("change", function() {
    let loc = document.getElementById("avatar");
    let fileSize = loc.files[0].size;
    // Validates according to filsize
    if (fileSize > 500000) {
        loc.value = null;
        loc.classList.add("invalid");
        document.getElementById("avatar_valid").classList.remove("make-invis");
    } else if (fileSize < 500000 && loc.classList.contains("invalid")){
        loc.classList.remove("invalid");
        document.getElementById("avatar_valid").classList.add("make-invis");
    }
});
