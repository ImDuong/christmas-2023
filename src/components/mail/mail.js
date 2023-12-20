var letterWrapper = document.createElement("div");
var mail = document.createElement("div");

var nbTraceTimes = 0;
const difficultyCoefficient = 2;

const runToLocation = (element, prop, pixels) =>
  anime({
    targets: element,
    [prop]: `${pixels}px`,
    easing: "easeOutCirc",
  });

const getRandomLocation = (num) => {
  return Math.floor(Math.random() * (num + 100));
};

function runAwayFromCursor() {
  if (letterWrapper.style.visibility == "hidden") {
    return;
  }

  const top = getRandomLocation(window.innerHeight - this.offsetHeight);
  const left = getRandomLocation(window.innerWidth - this.offsetWidth);

  // the more player chase the letter, the easier it will be
  setTimeout(() => {
    runToLocation(this, "left", left).play();
    runToLocation(this, "top", top).play();
  }, nbTraceTimes * difficultyCoefficient);

  nbTraceTimes += 1;
}

function showLetter() {
  if (letterWrapper == null) {
    return;
  }
  letterWrapper.style.visibility = "visible";
}

function showMail() {
  if (mail == null) {
    return;
  }
  mail.style.visibility = "visible";
}

document.addEventListener("DOMContentLoaded", function () {
  letterWrapper = document.getElementById("letter-wrapper");
  mail = document.getElementById("mail");

  letterWrapper.addEventListener("mouseover", runAwayFromCursor);

  letterWrapper.addEventListener("click", () => {
    letterWrapper.removeEventListener("mouseover", runAwayFromCursor);
    showMail();
  });
});
