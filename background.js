// chrome.extension.onConnect.addListener(function(port) {
//   port.onMessage.addListener(function(msg) {
//     console.log("message received" + msg);
//     port.postMessage(msg);
//   })
// })

let knownValue = 10;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request) {
    if (request.knownValue) {
      console.log(request.knownValue);

      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {knownValue: knownValue})
      });

      knownValue = parseInt(request.knownValue);
    } else if (request.needValue) {
      sendResponse({knownValue: knownValue});
    }
  }
})