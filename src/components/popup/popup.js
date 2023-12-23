var popup = document.createElement("div");
var popupOverlay = document.createElement("div");

document.addEventListener("DOMContentLoaded", function () {
  popup = document.getElementById("christmas-popup");
  popupOverlay = document.getElementById("christmas-popup-overlay");
  
  popupOverlay.addEventListener('click', hidePopup)
});

function showPopup() {
  if (popup == null) {
    return;
  }
  popup.style.visibility = "visible";
  if (popupOverlay == null) {
    return;
  }
  popupOverlay.style.visibility = "visible";
}

function hidePopup() {
  if (popup == null) {
    return;
  }
  popup.style.visibility = "hidden";
  if (popupOverlay == null) {
    return;
  }
  popupOverlay.style.visibility = "hidden";
}
