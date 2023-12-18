// set path to intial story lines for storybox
const intialStoryPath = "demo/room-happiness.json";

const rightRoomStoryPath = "navigation/happiness-room-right-door.json";
var rightRoomClickCnt = 0;
var rightRoomStoryLines = [];

document.addEventListener("DOMContentLoaded", async function () {
  var intialStoryLines = await fetchStoryLines(intialStoryPath);
  setTimeout(() => {
    viewStoryLines(intialStoryLines);
  }, 2000);

  fetchStoryLines(rightRoomStoryPath)
    .then((storyLines) => {
      rightRoomStoryLines = storyLines;
    })
    .catch((e) => {
      console.error("Fetch story lines for right room failed: ", e);
    });

  var rightDoorWrapper = document.getElementById("right-door-wrapper");

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

  });
});
