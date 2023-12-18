// set path to intial story lines for storybox
const intialStoryPath = "demo/main-room.json";
const leftRoomStoryPath = "navigation/main-room-left-door.json";
const rightRoomStoryPath = "navigation/main-room-right-door.json";

document.addEventListener("DOMContentLoaded", async function () {
  var intialStoryLines = await fetchStoryLines(intialStoryPath);
  setTimeout(() => {
    viewStoryLines(intialStoryLines);
  }, 2000);

  loadNextRoom(leftRoomStoryPath, 'left-door-wrapper', "../room-happiness/index.html")
  loadNextRoom(rightRoomStoryPath, 'right-door-wrapper', "../room-suffering/index.html")
});

function loadNextRoom(storyPath, doorWrapperDOMElementID, roomURI) {
  var storyLines = []
  var isRoomEnterable = false
  fetchStoryLines(storyPath)
    .then((fetchedSl) => {
      storyLines = fetchedSl;
    })
    .catch((e) => {
      console.error(`Fetch story lines from ${storyPath} failed:`, e);
    });

  var doorWrapper = document.getElementById(doorWrapperDOMElementID);
  doorWrapper.addEventListener("click", function () {
    if (!isRoomEnterable) {
      viewStoryLines(storyLines);
      isRoomEnterable = true;
      return;
    }

    window.location.href = roomURI;
  });
}
