var popup = document.createElement("div");
var popupOverlay = document.createElement("div");

document.addEventListener("DOMContentLoaded", function () {
  popup = document.getElementById("christmas-popup");
  popupOverlay = document.getElementById("christmas-popup-overlay");

  popupOverlay.addEventListener("click", hidePopup);
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

  // add hotkey for hiding popup
  document.addEventListener("keydown", hidePopupWhenEnter);
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

  document.removeEventListener("keydown", hidePopupWhenEnter);
}

function hidePopupWhenEnter(event) {
  if (event.key === "Enter") {
    hidePopup();
  }
}

function isPopupOn() {
  if (popup == null) {
    return false;
  }
  if (popup.style.visibility !== "visible") {
    return false;
  }
  if (popupOverlay == null) {
    return false;
  }
  if (popupOverlay.style.visibility !== "visible") {
    return false;
  }
  return true;
}