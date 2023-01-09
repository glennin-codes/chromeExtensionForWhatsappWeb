// background.js

chrome.browserAction.onClicked.addListener(function(tab) {
    // Get the status message from the user
    var statusMessage = prompt('Enter your new WhatsApp status:');
  
    // Update the status using the updateStatus function from the previous example
    updateStatus(statusMessage);
  });
  