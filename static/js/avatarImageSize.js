// ---- Set Avatar Image size
// if Avatar exists give it a height and width
if (document.getElementById("avatarImg") != null){
    // find height and width of container
    let loc = document.getElementById("avatarImg");
    let avatarHeight = loc.clientHeight;
    let avatarWidth =  loc.clientWidth;

    // Alter height and width to compensate for padding
    avatarWidth = (avatarWidth * 0.9) + "px";
    avatarHeight = (avatarHeight * 0.9) + "px";

    // Applying new height and width so image stays in container
    loc.getElementsByTagName("img")[0].style.height = avatarHeight;
    loc.getElementsByTagName("img")[0].style.width = avatarWidth;
}