document.addEventListener("DOMContentLoaded", function () {
  var storyBox = document.getElementById("story-box");
  var storyText = document.getElementById("story-content");
  var curStoryIdx = 0;
  var storyLines = [];

  fetch("@@webRoot/../assets/storylines/demo/main-room.json")
    .then((response) => response.json())
    .then((data) => {
      storyLines = data;

      storyText.textContent = storyLines[curStoryIdx]["text"];
      curStoryIdx++;

      setTimeout(() => {
        storyBox.style.visibility = "visible";

        storyBox.addEventListener("click", function () {
          if (storyLines.length == 0 || curStoryIdx < 0) {
            return;
          }
          if (curStoryIdx < storyLines.length) {
            storyText.textContent = storyLines[curStoryIdx]["text"];
            curStoryIdx++;
          } else {
            // if the last story line has enabled "loop" = true, the story box will never disappear
            const curStoryLine = storyLines[curStoryIdx - 1];
            if ("loop" in curStoryLine && curStoryLine["loop"] === true) {
              curStoryIdx--;
            } else {
              storyBox.style.display = "none";
            }
          }
        });
      }, 2000);
    })
    .catch((error) => console.error("Error loading JSON:", error));
});
