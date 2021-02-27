if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', afterDOMLoaded);
} else {
  afterDOMLoaded();
}

function afterDOMLoaded() {
  var port = chrome.extension.connect({
    name: "sample communication"
  });
  // port.postMessage("Hi background from popup");
  // port.onMessage.addListener(function(msg) {
  //   if (msg == "Hi popup") {
  //     console.log("message received from background");
  //   }
  // })

  let selectedUnit = "f",
  knownValue = 10;

  let radioButtons = document.querySelectorAll(".unit-container input"),
      knownValueObj = document.querySelector("#known-value");
  // radioButtons.forEach(function(radioButton) {
  //   radioButton.addEventListener('click', function() {

  //   })
  // })

  knownValueObj.addEventListener("input", function() {
    knownValue = knownValueObj.value;
    console.log("INPUT")
    chrome.runtime.sendMessage({ knownValue: knownValueObj.value});
  });

  chrome.runtime.sendMessage({ needValue: "please"}, (response) => {
    console.log("ASKING FOR VALUE")
    if (response) {
      console.log("RECEIVED VALUE")
      // console.log(response);
      knownValue = response.knownValue;
      knownValueObj.value = knownValue;
    }
  });

};
