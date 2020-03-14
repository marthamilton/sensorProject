/**
 * Toggles the display of the about box
 * @param shown Whether the about box should be displayed
 */
function toggleAboutBox() {
    if (document.getElementById("aboutSection").style.display === "block") {
        document.getElementById("aboutSection").style.display = "none";
    } else{
        document.getElementById("aboutSection").style.display = "block";
    }
    //document.getElementById("aboutSection").style.display = shown ? "none" : "block";
}