// set path to intial story lines for storybox
const intialStoryPath = "demo/main-room.json";

const leftRoomStoryPath = "navigation/main-room-left-door.json";
var leftRoomClickCnt = 0;
var leftRoomStoryLines = [];

const rightRoomStoryPath = "navigation/main-room-right-door.json";
var rightRoomClickCnt = 0;
var rightRoomStoryLines = [];

document.addEventListener("DOMContentLoaded", async function () {
  var intialStoryLines = await fetchStoryLines(intialStoryPath);
  setTimeout(() => {
    viewStoryLines(intialStoryLines);
  }, 2000);

  // keep asynchronously fetching story lines for left room & right door
  fetchStoryLines(leftRoomStoryPath)
    .then((storyLines) => {
      leftRoomStoryLines = storyLines;
    })
    .catch((e) => {
      console.error("Fetch story lines for left room failed: ", e);
    });

  fetchStoryLines(rightRoomStoryPath)
    .then((storyLines) => {
      rightRoomStoryLines = storyLines;
    })
    .catch((e) => {
      console.error("Fetch story lines for right room failed: ", e);
    });

  var leftDoorWrapper = document.getElementById("left-door-wrapper");
  var rightDoorWrapper = document.getElementById("right-door-wrapper");

  leftDoorWrapper.addEventListener("click", function () {
    if (leftRoomClickCnt == 0) {
      viewStoryLines(leftRoomStoryLines);
      leftRoomClickCnt++;
      return;
    }
    if (!isStoryLineEnd(leftRoomStoryLines)) {
      leftRoomClickCnt++;
      return;
    }

    window.location.href = "../room-happiness/index.html";
  });

  rightDoorWrapper.addEventListener("click", function () {
    if (rightRoomClickCnt == 0) {
      viewStoryLines(rightRoomStoryLines);
      rightRoomClickCnt++;
      return;
    }
    if (!isStoryLineEnd(rightRoomStoryLines)) {
      rightRoomClickCnt++;
      return;
    }

    window.location.href = "../room-suffering/index.html";
  });
});
