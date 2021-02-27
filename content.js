if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', afterDOMLoaded);
} else {
  afterDOMLoaded();
}


let keyComboObj = {m: false, d: false, f: false, c: false},
      mouseGrab = false,
      mousePos = [],
      mousePosOrig = 0,
      knownValue = 10,
      pxToFeet = 0;


function afterDOMLoaded() {

  document.addEventListener("keydown", function(e) {
    if (e.key == "d") {
      keyComboObj["d"] = true;
      checkKeyCombo();
      console.log("D PRESSED")
    } else if (e.key == "f") {
      keyComboObj["f"] = true;
      checkKeyCombo();
    } else if (e.key == "c") {
      keyComboObj["c"] = true;
      checkKeyCombo();
    } else if (e.key == "m") {
      keyComboObj["m"] = true;
      checkKeyCombo();
    }
  });

  document.addEventListener("keyup", function(e) {
    if (e.key == "m") {
      keyComboObj.m = false;
    } else if (e.key == "d") {
      keyComboObj["d"] = false;
    } else if (e.key == "f") {
      keyComboObj["f"] = false;
    } else if (e.key == "c") {
      keyComboObj["c"] = false;
    }
  });

  /* Capture mouse positions & report to overlay 
  This is a little confusing. mousePos array will store x & y position of mouse.
  So, if the mousePos array is < 2 it doesn't have an initial x & y position in it.
  It will save the x & y position.
  If mousePos.length is >= 2 && < 4 it has the positions from 1 click.
  It will save the x & y positions from the second click,
  THEN if not mousePosOrig it will be set using the x coordinates of each mouse click.
  if mousePosOrig is already set then the two new mouse clicks x coordinates will be used
      to report the distance between those clicks.
  */
  document.addEventListener("click", function(e) {
    if (mouseGrab == true) {
      if (mousePos.length < 2) {
        // WILL SET THE ORIGINAL MOUSE POSITIONS
        mousePos.push(e.clientX);
        mousePos.push(e.clientY);

        if (!mousePosOrig) {
          clickOrigConfOne.innerText = "☑";
        } else {
          clickConfOne.innerText = "☑";
        }


        console.log("MOUSE POSITION 1 CAPTURED");
      } else if (mousePos.length >= 2 && mousePos.length < 4) {
        // WILL SET THE 
        mousePos.push(e.clientX);
        mousePos.push(e.clientY);

        console.log("MOUSE POSITION 2 CAPTURED");
        console.log(Math.abs(mousePos[0] - mousePos[2]));

        if (!mousePosOrig) {
          clickOrigConfTwo.innerText = "☑";
        } else {
          clickConfTwo.innerText = "☑";
        } 


        if (!mousePosOrig) {
          mousePosOrig = Math.abs(mousePos[0] - mousePos[2])
        } else {
          console.log("Mouse distance to feet:");
          console.log((Math.abs(mousePos[0] - mousePos[2]) / mousePosOrig) * knownValue);

          overlayMeasurement.innerText = (Math.round((Math.abs(mousePos[0] - mousePos[2]) / mousePosOrig) * knownValue * 100)) / 100
        }
          

        mousePos = [];
      }
    };
  });


  /* Turn on or off mouse tracking */
  function checkKeyCombo() {
    if (keyComboObj["m"] == true && keyComboObj["d"] == true) {
      mouseTrack.innerText = "m+f to STOP tracking"
      mouseTrack.style.color = "#7ebdc2";
      mouseGrab = true;
    }
    else if (keyComboObj["m"] == true && keyComboObj["f"] == true) {
      mouseTrack.innerText = "m+d to START tracking";
      mouseTrack.style.color = "#bb4430";
      mouseGrab = false;
    }
    else if (keyComboObj["m"] == true && keyComboObj["c"] == true) {
      console.log("\nMOUSE POS ORIGINAL CANCELLED");
      mousePosOrig = 0;
    }
  }


  /* Creates all html elements */
  let overlayDiv = document.createElement("div"),
      overlayHeader = document.createElement("h3"),
      overlayMeasContainer = document.createElement("p"),
      overlayMeasurement = document.createElement("span"),
      overlayUnit = document.createElement("span");

  let mouseTrack = document.createElement("div");
  mouseTrack.classList.add("mouse-track")

  // START CLICK CONFIRMATION 
  let clickConfOuterContainer = document.createElement("div"),
      clickOrigConfContainer = document.createElement("p"),
      clickConfContainer = document.createElement("p"),
      clickOrigConfText = document.createElement("span"),
      clickOrigConfOne = document.createElement("span"),
      clickOrigConfTwo = document.createElement("span"),
      clickConfText = document.createElement("span"),
      clickConfOne = document.createElement("span"),
      clickConfTwo = document.createElement("span");

  clickOrigConfText.innerText = "Start Measurement: ";
  clickOrigConfOne.innerText = "☐";
  clickOrigConfTwo.innerText = "☐";

  clickOrigConfContainer.appendChild(clickOrigConfText);
  clickOrigConfContainer.appendChild(clickOrigConfOne);
  clickOrigConfContainer.appendChild(clickOrigConfTwo);

  clickConfText.innerText = "Check Measurement: ";
  clickConfOne.innerText = "☐";
  clickConfTwo.innerText = "☐";

  clickConfContainer.appendChild(clickConfText);
  clickConfContainer.appendChild(clickConfOne);
  clickConfContainer.appendChild(clickConfTwo);

  clickConfOuterContainer.appendChild(clickOrigConfContainer);
  clickConfOuterContainer.appendChild(clickConfContainer);
// END CLICK CONFIRMATION

  overlayHeader.innerText = "Measurement:";
  overlayMeasurement.innerText = "0";
  overlayUnit.innerText = "'";

  overlayMeasContainer.appendChild(overlayMeasurement);
  overlayMeasContainer.appendChild(overlayUnit);

  mouseTrack.innerText = "m+d to START tracking";
  mouseTrack.style.color = "#bb4430";
  
  overlayDiv.appendChild(mouseTrack);
  overlayDiv.appendChild(clickConfOuterContainer);
  overlayDiv.appendChild(overlayHeader);
  overlayDiv.appendChild(overlayMeasContainer);
  overlayDiv.classList.add("overlay-div");

  document.body.appendChild(overlayDiv);

};


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request) {
    if (request.knownValue) {
      console.log(request.knownValue);
      knownValue = parseInt(request.knownValue);
    }
  }
})