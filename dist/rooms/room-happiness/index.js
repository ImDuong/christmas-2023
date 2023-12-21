import {loadNextRoom} from '../../components/door/door.js'

// set path to intial story lines for storybox
const intialStoryPath = "demo/room-happiness.json";
const rightRoomStoryPath = "navigation/happiness-room-right-door.json";
const flowerStoryPath = "navigation/flower.json";

document.addEventListener("DOMContentLoaded", async function () {
  var intialStoryLines = await fetchStoryLines(intialStoryPath);
  setTimeout(() => {
    viewStoryLines(intialStoryLines);
  }, 1500);

  loadNextRoom(
    rightRoomStoryPath,
    "right-door-wrapper",
    ""
  );

  loadNextRoom(
    flowerStoryPath,
    "table",
    ""
  );



});
