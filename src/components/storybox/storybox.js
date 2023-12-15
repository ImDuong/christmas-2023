var storyBox = document.createElement('div');
var storyText;
var curStoryIdx = 0;

document.addEventListener("DOMContentLoaded", async function () {
  storyBox = document.getElementById("story-box");
  storyText = document.getElementById("story-content");
});

async function readStoryLines(storyPath) {
  if (storyPath == null || storyPath.length == 0) {
    storyPath = "demo/404-room.json";
  }
  const readPath = `@@webRoot/../assets/storylines/${storyPath}`;
  try {
    const response = await fetch(readPath);
    if (!response.ok) {
      throw new Error(`error status code ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error loading storylines from ${readPath}`, error);
  }
}

function loadStoryLines(storyLines) {
  // read from start
  curStoryIdx = 0

  function loadNextStoryLine() {
    if (storyLines.length == 0 || curStoryIdx < 0) {
      storyBox.removeEventListener("click", loadNextStoryLine);
      return;
    }
    if (curStoryIdx < storyLines.length) {
      readAStoryLine()
      return
    }

    // if the last story line has enabled "loop" = true, the story box will never disappear
    const curStoryLine = storyLines[curStoryIdx - 1];
    if ("loop" in curStoryLine && curStoryLine["loop"] === true) {
      curStoryIdx--;
    } else {
      hideStoryBox();
      storyBox.removeEventListener("click", loadNextStoryLine);
    }
  }

  function readAStoryLine() {
    if (curStoryIdx >= storyLines.length) {
      return;
    }
    storyText.textContent = storyLines[curStoryIdx]["text"];
    curStoryIdx++;
  }

  setTimeout(() => {
    readAStoryLine()
    showStoryBox();

    storyBox.addEventListener("click", loadNextStoryLine);
  }, 2000);
}

function isStoryLineEnd(storyLines) {
  return curStoryIdx >= storyLines.length
}

function showStoryBox() {
  if (storyBox == null) {
    return
  }
  storyBox.style.visibility = "visible";
}

function hideStoryBox() {
  if (storyBox == null) {
    return
  }
  storyBox.style.visibility = "hidden";
}