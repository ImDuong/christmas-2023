import {loadNextRoom} from '@@webRoot/components/door/door.js'

// set path to intial story lines for storybox
const intialStoryPath = "demo/room-suffering.json";
const leftRoomStoryPath = "navigation/suffering-room-left-door.json";

document.addEventListener("DOMContentLoaded", async function () {
  var intialStoryLines = await fetchStoryLines(intialStoryPath);
  setTimeout(() => {
    viewStoryLines(intialStoryLines);
  }, 1500);

  loadNextRoom(
    leftRoomStoryPath,
    "left-door-wrapper",
    "@@webRoot/rooms/main-room/index.html"
  );
});
