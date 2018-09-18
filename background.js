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
// Listen to messages from the payload.js script and write to popout.html
chrome.runtime.onMessage.addListener(function (message) {
	console.log("A message was received from a tab");
});
