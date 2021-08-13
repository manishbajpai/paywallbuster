chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method == "getval")
      sendResponse({status: localStorage[request.key]});
    else
      sendResponse({}); // snub them.
});
function addwebsite() {
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        url = new URL(tabs[0].url);
        hostname = url.hostname
        console.log(hostname)
        localStorage.setItem(hostname, "1")
    });
}

function removewebsite() {
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        url = new URL(tabs[0].url);
        hostname = url.hostname
        console.log(hostname)
        localStorage.removeItem(hostname);
    });
}
name = "Ad Aware"
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        title: "Add website to " + name,
        contexts: ['all'],
        onclick: addwebsite
    });
    chrome.contextMenus.create({
        title: "Remove website from " + name,
        contexts: ['all'],
        onclick: removewebsite
    });
});

// TBD: Listen to messages from the payload.js script and write to popout.html
chrome.runtime.onMessage.addListener(function (message) {
	console.log("A message was received from a tab");
});
