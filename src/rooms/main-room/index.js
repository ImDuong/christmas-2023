// set path to intial story lines for storybox
const intialStoryPath = "demo/main-room.json";
const leftRoomStoryPath = "navigation/main-room-left-door.json";
var leftRoomClickCnt = 0;
var leftRoomStoryLines = [];

document.addEventListener("DOMContentLoaded", async function () {
  var intialStoryLines = await readStoryLines(intialStoryPath);
  loadStoryLines(intialStoryLines);

  var leftDoorWrapper = document.getElementById("left-door-wrapper");
  var rightDoorWrapper = document.getElementById("right-door-wrapper");

  leftDoorWrapper.addEventListener("click", async function () {
    if (leftRoomClickCnt == 0) {
        leftRoomStoryLines = await readStoryLines(leftRoomStoryPath);
        loadStoryLines(leftRoomStoryLines);
        leftRoomClickCnt++
        return
    }
    if (!isStoryLineEnd(leftRoomStoryLines)) {
        leftRoomClickCnt++
        return
    }
    
    window.location.href = "../room-happiness/index.html";
  });
});
