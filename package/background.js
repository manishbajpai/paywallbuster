chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method == "getval")
      sendResponse({status: localStorage[request.key]});
    else
      sendResponse({});
});
function addwebsitead() {
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        url = new URL(tabs[0].url);
        hostname = url.hostname
        console.log(hostname)
        localStorage.setItem(hostname, "1")
    });
}
function addwebsitepay() {
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        url = new URL(tabs[0].url);
        hostname = url.hostname
        console.log(hostname)
        localStorage.setItem(hostname, "2")
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
        title: "Add website as ad-based",
        contexts: ['all'],
        onclick: addwebsitead
    });
    chrome.contextMenus.create({
        title: "Add website as paywalled",
        contexts: ['all'],
        onclick: addwebsitepay
    });
    chrome.contextMenus.create({
        title: "Remove website",
        contexts: ['all'],
        onclick: removewebsite
    });
});

// TBD: Listen to messages from the payload.js script and write to popout.html
chrome.runtime.onMessage.addListener(function (message) {
	console.log("A message was received from a tab");
});


//1: Ad-based
//2: Paywalled
var adlist = [
    "www.facebook.com",
    "abcnews.go.com",
    "www.foxnews.com",
    'www.nbcnews.com',
    'news.yahoo.com',
    'www.nbcbayarea.com',
    'sanfrancisco.cbslocal.com'
]
var adlistNews = [
    'CNBC',
    'CNN',
    'NBC News',
    'POLITICO',
    'The Guardian',
    'New York Post',
    'CBS New York',
    'CBS News',
    'WPGL Local 10',
    'Yahoo News',
    'SF Gate',
    'Yahoo Lifestyle',
    'NBC News',
    'The Seattle Times'

]
var paylist = [
    'www.mercurynews.com'
]
var paylistNews = [
    "The Mercury News",
    "The New York Times",
    'Business Insider',



]
function init() {
    var fb = localStorage.getItem("Business Insider")
    if (fb === null) {
        for (i = 0; i < adlist.length; i++) {
            localStorage.setItem(adlist[i], '1')
        }
        for (i = 0; i < paylist.length; i++) {
            localStorage.setItem(paylist[i], '2')
        }
        for (i = 0; i < adlistNews.length; i++) {
            localStorage.setItem(adlistNews[i], '1')
        }
        for (i = 0; i < paylistNews.length; i++) {
            localStorage.setItem(paylistNews[i], '2')
        }
    }
}
init()
