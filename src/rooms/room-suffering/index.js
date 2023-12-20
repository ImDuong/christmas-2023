import {loadNextRoom} from '@@webRoot/components/door/door.js'

// set path to intial story lines for storybox
const intialStoryPath = "demo/room-suffering.json";
const leftRoomStoryPath = "navigation/suffering-room-left-door.json";
const mailPath = "@@webRoot/components/mail/mail.html";
const mainRoomPath = "@@webRoot/rooms/main-room/index.html";
const puzzlePath = "@@webRoot/puzzle/crossword/index.html";

document.addEventListener("DOMContentLoaded", async function () {
  var intialStoryLines = await fetchStoryLines(intialStoryPath);
  setTimeout(() => {
    viewStoryLines(intialStoryLines);
  }, 1500);

  function loadMail() {
    setTimeout(async function() {
      const response = await fetch(mailPath);
      const htmlContent = await response.text();
      document.body.innerHTML += htmlContent;
    }, 10000); // 10000 milliseconds = 10 seconds
  }
  loadMail();
  loadNextRoom(
    leftRoomStoryPath,
    "letter-wrapper",
    puzzlePath
  );

  loadNextRoom(
    leftRoomStoryPath,
    "left-door-wrapper",
    mainRoomPath
  );

  
});
