import { loadNextRoom } from "@@webRoot/components/door/door.js";

// set path to intial story lines for storybox
const intialStoryPath = "demo/room-suffering.json";
const leftRoomStoryPath = "navigation/suffering-room-left-door.json";

const mainRoomPath = "@@webRoot/rooms/main-room/index.html";
const puzzlePath = "@@webRoot/puzzles/crossword/index.html";

document.addEventListener("DOMContentLoaded", async function () {
  var intialStoryLines = await fetchStoryLines(intialStoryPath);
  setTimeout(() => {
    viewStoryLines(intialStoryLines);
  }, 1500);

  setTimeout(async function () {
    showLetter();
  }, 3000); // 10000 milliseconds = 10 seconds

  loadNextRoom("", "letter-item", puzzlePath);

  loadNextRoom(leftRoomStoryPath, "left-door-wrapper", mainRoomPath);
});
