import { sha256 } from "@@webRoot/utils/crypto.js";
import { navigate } from "@@webRoot/utils/utils.js";

const predefinedHashes = [
  "f3adeea456fcfe82d0f3053d1aa02a4ddeb023b7b8b5830530d2ea139903d05c",
  "116b500580972ab3f21717e60fdd7ae7785671c45444c37b4d257c4f6f8a59dd",
];

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("magic-input")
    .addEventListener("keydown", (event) => {
      if (event.key === "Enter" && !isPopupOn()) {
        login();
      }
    });
  document.getElementById("ride-btn").addEventListener("click", () => {
    login();
  });
});

async function isHashAllowed(inputText) {
  const hashInput = await sha256(inputText);
  return predefinedHashes.includes(hashInput);
}

async function login() {
  const inputText = document.getElementById("magic-input").value.toLowerCase();
  if (!(await isHashAllowed(inputText))) {
    showPopup();
    return;
  }
  navigate("@@webRoot/rooms/main-room/index.html");
}
