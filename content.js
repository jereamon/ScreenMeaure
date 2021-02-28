if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', afterDOMLoaded);
} else {
  afterDOMLoaded();
}


let keyComboObj = {m: false, d: false, f: false, c: false},
      mouseGrab = false,
      mousePos = [],
      mousePosOrig = 0,
      knownFeet = 10,
      knownInches = 0,
      pxToFeet = 0;


function afterDOMLoaded() {

  document.addEventListener("keydown", function(e) {
    if (e.key == "d") {
      keyComboObj["d"] = true;
      checkKeyCombo();
      
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

        if (!mousePosOrig) {
          clickOrigConfTwo.innerText = "☑";
        } else {
          clickConfTwo.innerText = "☑";
        } 

        // Set the distance measured in pixels using the distance formula
        measuredPix = Math.sqrt((Math.abs(mousePos[2] - mousePos[0]) ** 2) + (Math.abs(mousePos[3] - mousePos[1]) ** 2));

        // once the measured distance is determined we check if the original mouse position
        // is set. If it is not set it, if it is, then calculate the measured 
        // distance as ft & inches and report them.
        if (!mousePosOrig) {
          mousePosOrig = measuredPix;
        } else {
          // console.log("Mouse distance to feet:");

          knownAsDecimal = knownFeet + (knownInches / 12);
          measuredRatioPix = measuredPix / mousePosOrig;

          measuredFtDecimal = measuredRatioPix * knownAsDecimal;
          
          measuredFt = Math.floor(measuredFtDecimal);
          
          measuredIn = Math.round(Math.abs(Math.floor(measuredFtDecimal) - measuredFtDecimal) * 12)
          if (measuredIn == 12) {
            measuredFt = measuredFt + 1;
            measuredIn = 0;
          }

          overlayFeet.innerText = measuredFt;
          overlayInches.innerText = measuredIn;

          setTimeout(function() {
            clickConfOne.innerText = "☐";
            clickConfTwo.innerText = "☐";
          }, 2000);
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

      clickOrigConfOne.innerText = "☐";
      clickOrigConfTwo.innerText = "☐";
      clickConfOne.innerText = "☐";
      clickConfTwo.innerText = "☐";

      mousePosOrig = 0;
      mousePos = [];
    }
  }


  /* Creates all html elements */
  let overlayDiv = document.createElement("div"),
      overlayHeader = document.createElement("h3"),
      overlayMeasContainer = document.createElement("p"),
      overlayFeet = document.createElement("span"),
      overlayInches = document.createElement("span"),
      overlayUnitFt = document.createElement("span"),
      overlayUnitIn = document.createElement("span");

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


  clickOrigConfOne.classList.add("click-conf");
  clickOrigConfTwo.classList.add("click-conf");
  clickConfOne.classList.add("click-conf");
  clickConfTwo.classList.add("click-conf");

  clickOrigConfText.innerText = "Start Clicks: ";
  clickOrigConfOne.innerText = "☐";
  clickOrigConfTwo.innerText = "☐";

  clickOrigConfContainer.appendChild(clickOrigConfText);
  clickOrigConfContainer.appendChild(clickOrigConfOne);
  clickOrigConfContainer.appendChild(clickOrigConfTwo);

  clickConfText.innerText = "Check Clicks: ";
  clickConfOne.innerText = "☐";
  clickConfTwo.innerText = "☐";

  clickConfContainer.appendChild(clickConfText);
  clickConfContainer.appendChild(clickConfOne);
  clickConfContainer.appendChild(clickConfTwo);

  clickConfOuterContainer.appendChild(clickOrigConfContainer);
  clickConfOuterContainer.appendChild(clickConfContainer);
// END CLICK CONFIRMATION

  overlayHeader.innerText = "Measurement:";
  overlayFeet.innerText = "0";
  overlayInches.innerText = "0"
  overlayUnitFt.innerText = "'";
  overlayUnitIn.innerText = '"';

  overlayMeasContainer.appendChild(overlayFeet);
  overlayMeasContainer.appendChild(overlayUnitFt);
  overlayMeasContainer.appendChild(overlayInches);
  overlayMeasContainer.appendChild(overlayUnitIn);

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
    if (request.knownFeet) {
      
      knownFeet = parseInt(request.knownFeet);
      knownInches = parseInt(request.knownInches);
    }
  }
})