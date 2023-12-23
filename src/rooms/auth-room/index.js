const predefinedHashes = [
  "f3adeea456fcfe82d0f3053d1aa02a4ddeb023b7b8b5830530d2ea139903d05c",
  "116b500580972ab3f21717e60fdd7ae7785671c45444c37b4d257c4f6f8a59dd",
];

async function sha256(message) {
  const msgUint8 = new TextEncoder().encode(message); // encode as (utf-8) Uint8Array
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8); // hash the message
  const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join(""); // convert bytes to hex string
  return hashHex;
}

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
}
