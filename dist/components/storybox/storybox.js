var storyBoxOverlay = document.createElement("div");
var storyBox = document.createElement("div");
var storyText;

document.addEventListener("DOMContentLoaded", function () {
  storyBoxOverlay = document.getElementById("story-box-overlay");
  storyBox = document.getElementById("story-box");
  storyText = document.getElementById("story-content");
});

/**
 * @description Fetches storylines from a specified path.
 *
 * @param {string} storyPath - The relative path (from the assets/storylines folder) to the JSON file containing the storylines.
 *                             If null or an empty string, a default path ("demo/404-room.json") is used.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of storyline objects.
 *                                   Object will look like {"text": "hello world"}
 *
 * @example
 * // Example usage:
 * // Assuming assets/storylines/demo/main-room.json exists and contains an array of storylines.
 * const storyPath = 'demo/main-room.json';
 * const storylines = await fetchStoryLines(storyPath);
 */
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

/**
 * @description Displays storylines in a box, allowing the player to read each line by clicking.
 *
 * @param {Array<Object>} storyLines - An array of storyline objects to be displayed.
 * @param {number} [curStoryIdx=0] - The starting index for displaying storylines. Defaults to 0.
 * 
 * @example
 * // Example usage:
 * const storyLines = [
 *   { "text": "Hi there, Im Duong from the past" },
 *   { "text": "Saying Hello to the future me" },
 * ];
 * viewStoryLines(storyLines);
 */
function viewStoryLines(storyLines, curStoryIdx = 0) {
  if (storyLines.length == 0) {
    return;
  }

  function viewNextStoryLine() {
    if (storyLines.length == 0 || curStoryIdx < 0) {
      storyBoxOverlay.removeEventListener("click", viewNextStoryLine);
      return;
    }
    if (curStoryIdx < storyLines.length) {
      readStoryByOneLine();
      return;
    }

    hideStoryBox();
    storyBoxOverlay.removeEventListener("click", viewNextStoryLine);
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
