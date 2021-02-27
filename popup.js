if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', afterDOMLoaded);
} else {
  afterDOMLoaded();
}

function afterDOMLoaded() {
  var port = chrome.extension.connect({
    name: "sample communication"
  });

  let selectedUnit = "f",
  knownValue = 10;

  let radioButtons = document.querySelectorAll(".unit-container input"),
      knownFeetObj = document.querySelector("#known-feet"),
      knownInchesObj = document.querySelector("#known-inches");
  // radioButtons.forEach(function(radioButton) {
  //   radioButton.addEventListener('click', function() {

  //   })
  // })

  knownFeetObj.addEventListener("input", function() {
    console.log("INPUT FEET")
    chrome.runtime.sendMessage({ knownFeet: knownFeetObj.value, knownInches: knownInchesObj.value});
  });

  knownInchesObj.addEventListener("input", function() {
    console.log("INPUT INCHES")
    chrome.runtime.sendMessage({ knownFeet: knownFeetObj.value, knownInches: knownInchesObj.value});
  });

  chrome.runtime.sendMessage({ needValue: "please"}, (response) => {
    console.log("ASKING FOR VALUE")
    if (response) {
      console.log("RECEIVED VALUE")
      // console.log(response);
      knownFeet = response.knownFeet;
      knownFeetObj.value = knownFeet;

      knownInches = response.knownInches;
      knownInchesObj.value = knownInches;
    }
  });

};
