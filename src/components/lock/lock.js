const lastRoomPath = "https://namikemen.github.io/birthday-2023/"
const passwordPath = "@@webRoot/../assets/puzzle_configs/password.json"
// const fs = require('fs');


// make dial draggable
Draggable.create(".dial", {
    type:"rotation",
    throwProps:true
  });
  // values 40 or above will be set to 0
    const combo = [1, 25, 0],
        findCombo = function(comboArr){
          let dial = $(".dial"),
              dialTrans = dial.css("transform"),
              ticks = 40,
              tickAngle = 360 / ticks,
              numOffset = 0.5, // how far red arrow can be from number
              // break down matrix value of dial transform and get angle
              matrixVal = dialTrans.split('(')[1].split(')')[0].split(','),
              cos1 = matrixVal[0],
              sin = matrixVal[1],
              negSin = matrixVal[2],
              cos2 = matrixVal[3],
              angle = Math.round(Math.atan2(sin, cos1) * (180 / Math.PI)) * -1;
          // convert negative angles to positive
          if (angle < 0) {
            angle += 360;
          }
          // check numbers found, stop loop if at first number not found
          for (let i = 0; i < comboArr.length; ++i) {
            if (!$(".num" + (i + 1)).hasClass("found")) {
              if (angle > (comboArr[i] - numOffset) * tickAngle &&
                angle < (comboArr[i] + numOffset) * tickAngle) {
                // make numbers green when found
                $(".num" + (i + 1)).addClass("found");
                $(".num" + (i + 1)).html(combo[i]);
                // on unlock
                if (i == comboArr.length - 1) {
                  $(".shackle").addClass("unlocked");
                  $(".top").addClass("pivot1");
                  $(".inner").addClass("pivot2");
                  $(".left").addClass("moveRight");
                  $(".dentL, .dentR").addClass("moveLeft");
                  // then lock again
                  setTimeout(function() {
                    $(".shackle").removeClass("unlocked");
                    $(".top").removeClass("pivot1");
                    $(".inner").removeClass("pivot2");
                    $(".left").removeClass("moveRight");
                    $(".dentL, .dentR").removeClass("moveLeft");
                    for (let j = 0; j < combo.length; ++j) {
                      $(".num" + (j + 1)).removeClass("found");
                    }
                    window.location.href = lastRoomPath;
                  }, 2400);
                }
            }
              break;
            }
        }
      };
  // show combination to user
  for (let i = 0; i < combo.length; ++i) {
    $(".num" + (i + 1)).html(0);
  }
  // dial interaction (mouse)
  $(".dial").on("click",function(){
      findCombo(combo);
  });
  // dial interaction (touch)
  $(".dial").on("touchend",function(){
      findCombo(combo);
  });

  var containerWapper = document.createElement("div");
  var comboWrapper = document.createElement("div");
  
  function showLock() {
      
      if (containerWapper) {
        containerWapper.style.visibility = "visible";
      }
  
      // Show the dust
      if (comboWrapper) {
        comboWrapper.style.visibility = "visible";
      }
      
  }
   
  document.addEventListener("DOMContentLoaded", function () {
    table = document.getElementById("table");
    containerWapper = document.getElementById("container");
    comboWrapper = document.getElementById("combo");
    table.addEventListener("click", () => {
        setTimeout(async function () {
            showLock();
          }, 5000);
    });
  });