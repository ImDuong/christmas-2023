import { navigate } from "../../utils/utils.js";

/**
 * @description Load the next room in the interactive storytelling game when the door is clicked.
 * It fetches the storylines for the current room using the provided storyPath. The function adds a click event listener to the door,
 * allowing the player to view the storylines and, once finished, navigate to the next room.
 *
 * Special cases:
 * 1. If there are no storylines, it immediately navigates to the specified roomURI.
 * 2. If the roomURI is empty, it signifies that the player cannot leave the room.
 *
 * @param {string} storyPath - The relative path (in perspective of assets/storylines folder) to fetch the storylines for the current room.
 * @param {string} doorWrapperDOMElementID - The ID of the HTML element wrapping the door.
 * @param {string} roomURI - The URI of the next room to navigate to when the storylines end.
 *
 * @example
 * loadNextRoom("navigation/main-room-left-door.json", "left-door-wrapper", "../../rooms/room-happiness/index.html");
 */
export function loadNextRoom(storyPath, doorWrapperDOMElementID, roomURI) {
  var storyLines = [];
  var isRoomEnterable = false;
  if (storyPath.length > 0) {
    fetchStoryLines(storyPath)
      .then((fetchedSl) => {
        storyLines = fetchedSl;
      })
      .catch((e) => {
        console.error(`Fetch story lines from ${storyPath} failed:`, e);
      });
  }

  var doorWrapper = document.getElementById(doorWrapperDOMElementID);
  doorWrapper.addEventListener("click", function () {
    if (storyLines.length == 0) {
      navigate(roomURI);
      return;
    }
    if (!isRoomEnterable) {
      viewStoryLines(storyLines);
      if (roomURI.length > 0) {
        isRoomEnterable = true;
      }
      return;
    }

    navigate(roomURI);
    return;
  });
}
