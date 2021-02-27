// chrome.extension.onConnect.addListener(function(port) {
//   port.onMessage.addListener(function(msg) {
//     console.log("message received" + msg);
//     port.postMessage(msg);
//   })
// })

let knownFeet = 10,
    knownInches = 0;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request) {
    if (request.knownFeet) {
      console.log(request.knownFeet);

      knownFeet = request.knownFeet;
      knownInches = request.knownInches;

      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, request);
      });

      knownValue = parseInt(request.knownValue);
    } else if (request.needValue) {
      sendResponse({knownFeet: knownFeet, knownInches: knownInches});
    }
  }
})