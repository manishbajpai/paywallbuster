chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    //code in here will run every time a user goes onto a new tab

		if (changeInfo.status === "complete" )     {
			console.log("Tab loading: " + changeInfo.status)

			chrome.tabs.executeScript(null, {
				file: 'execute.js'
			}, _=>{
			  let e = chrome.runtime.lastError;
			  if(e !== undefined){
			    console.log( _, e);
			  }
			});
		}
});
console.log("Injected...");

function addwebsite() {
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        url = new URL(tabs[0].url);
        hostname = url.hostname
        console.log(hostname)
        chrome.storage.sync.set({hostname: "1"}, function() {
            console.log("Added website");
        });
    });

}

function removewebsite() {
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        url = new URL(tabs[0].url);
        hostname = url.hostname
        console.log(hostname)
        chrome.storage.sync.remove(hostname, function() {
            console.log("Removed website");
        });
    });

}

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
