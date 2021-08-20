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

var adlist = [
    'abcnews.go.com',
    'news.yahoo.com',
    'sanfrancisco.cbslocal.com',
    'www.facebook.com',
    'www.foxnews.com',
    'www.nbcbayarea.com',
    'www.nbcnews.com',
]

// List of ad supported websites, like facebook. Used in *google news* search.
var adlistNews = [
    'CBS New York',
    'CBS News',
    'CNN',
    'NBC News',
    'NBC News',
    'New York Post',
    'POLITICO',
    'SF Gate',
    'The Guardian',
    'The Seattle Times',
    'WPGL Local 10',
    'Yahoo Lifestyle',
    'Yahoo News',
    'CNBC',
]

// List of paywalled websites like Mercury NewsUsed in *google* search.
var paylist = [
    'www.mercurynews.com'
]

// List of paywalled websites like Mercury NewsUsed in *google news* search.
var paylistNews = [
    'Bloomberg News',
    'Boston Herald',    
    'Business Insider',
    'Financial Times',
    'Herald Sun',
    'Houston Chronicle',
    'Los Angeles Times',
    'MIT Technology Review',
    'National Business Review',
    'National Post',
    'Scientific American',
    'The Athletic',
    'The Boston Globe',
    'The Christian Science Monitor',
    'The Daily Telegraph',
    'The Diplomat',
    'The Economist',
    'The Florida Times-Union',
    'The Mercury News',
    'The New York Times',
    'The Wall Street Journal',
    'The Washington Post',
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
