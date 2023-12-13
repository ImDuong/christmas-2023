document.addEventListener("DOMContentLoaded", function () {
  var storyBox = document.getElementsByClassName("story-box");
  var storyText = document.getElementsByClassName("story-content");
  var currentStoryIndex = 0;
  var stories = [];

  fetch("../../assets/storylines/demo/main-room.json")
    .then((response) => response.json())
    .then((data) => {
      stories = data.stories;
    })
    .catch((error) => console.error("Error loading JSON:", error));

  storyBox.addEventListener("click", function () {
    if (currentStoryIndex < stories.length) {
      storyText.textContent = stories[currentStoryIndex];
      currentStoryIndex++;
    } else {
      alert("End of the story!");
    }
  });
});
