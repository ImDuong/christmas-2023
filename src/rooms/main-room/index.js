import {loadNextRoom} from '@@webRoot/components/door/door.js'

// set path to intial story lines for storybox
const intialStoryPath = "demo/main-room.json";
const leftRoomStoryPath = "navigation/main-room-left-door.json";
const rightRoomStoryPath = "navigation/main-room-right-door.json";

document.addEventListener("DOMContentLoaded", async function () {
  var intialStoryLines = await fetchStoryLines(intialStoryPath);
  setTimeout(() => {
    viewStoryLines(intialStoryLines);
  }, 2000);

  loadNextRoom(
    leftRoomStoryPath,
    "left-door-wrapper",
    "@@webRoot/rooms/room-happiness/index.html"
  );
  loadNextRoom(
    rightRoomStoryPath,
    "right-door-wrapper",
    "@@webRoot/rooms/room-suffering/index.html"
  );
});
