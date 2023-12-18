var storyBoxOverlay = document.createElement("div");
var storyBox = document.createElement("div");
var storyText;
var curStoryIdx = 0;

document.addEventListener("DOMContentLoaded", function () {
  storyBoxOverlay = document.getElementById("story-box-overlay");
  storyBox = document.getElementById("story-box");
  storyText = document.getElementById("story-content");
});

async function fetchStoryLines(storyPath) {
  if (storyPath == null || storyPath.length == 0) {
    storyPath = "demo/404-room.json";
  }
  const readPath = `../../../assets/storylines/${storyPath}`;
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

function viewStoryLines(storyLines) {
  // read from start
  curStoryIdx = 0;

  function viewNextStoryLine() {
    if (storyLines.length == 0 || curStoryIdx < 0) {
      storyBoxOverlay.removeEventListener("click", viewNextStoryLine);
      return;
    }
    if (curStoryIdx < storyLines.length) {
      readStoryByOneLine();
      return;
    }

    // if the last story line has enabled "loop" = true, the story box will never disappear
    const curStoryLine = storyLines[curStoryIdx - 1];
    if ("loop" in curStoryLine && curStoryLine["loop"] === true) {
      curStoryIdx--;
    } else {
      hideStoryBox();
      storyBoxOverlay.removeEventListener("click", viewNextStoryLine);
    }
  }

  function readStoryByOneLine() {
    if (curStoryIdx >= storyLines.length) {
      return;
    }
    storyText.textContent = storyLines[curStoryIdx]["text"];
    curStoryIdx++;
  }

  readStoryByOneLine();
  storyBoxOverlay.addEventListener("click", viewNextStoryLine);

  showStoryBox();
}

function isStoryLineEnd(storyLines) {
  return curStoryIdx >= storyLines.length;
}

function showStoryBox() {
  if (storyBox == null) {
    return;
  }
  storyBox.style.visibility = "visible";
  if (storyBoxOverlay == null) {
    return;
  }
  storyBoxOverlay.style.visibility = "visible";
}

function hideStoryBox() {
  if (storyBox == null) {
    return;
  }
  storyBox.style.visibility = "hidden";

  if (storyBoxOverlay == null) {
    return;
  }
  storyBoxOverlay.style.visibility = "hidden";
}
