// send the page title as a chrome message

// var searchtext = ["The Mercury News",
//                   "The New York Times"]
//
// function replace(a,b)
// {
//   log("Annotating: " + a + " to " + b);
//
//   var i = 1
//   if(window.find)
//   {
//     while(window.find(a))
//     {
//
//       var rng=window.getSelection().getRangeAt(0);
//       rng.deleteContents();
//
//       rng.insertNode(document.createTextNode(b));
//       log("replace count: " + i++)
//
//     }
//   }
//   else if(document.body.createTextRange)
//   {
//     var rng=document.body.createTextRange();
//     while(rng.findText(a))
//     {
//       rng.pasteHTML(b);
//       log("replace count: " + i++)
//     }
//   }
// }
//
// /* MutationObserver configuration data: Listen for "childList"
//  * mutations in the specified element and its descendants */
// var config = {
//     childList: true,
//     subtree: true
// };
// var regex = /<a.*?>[^<]*<\/a>/;

// /* Traverse 'rootNode' and its descendants and modify '<a>' tags */
// function modifyLinks(rootNode) {
//     var nodes = [rootNode];
//     while (nodes.length > 0) {
//         var node = nodes.shift();
//         if (node.tagName == "CITE") {
//             node.innerHTML = "{Ad}" + node.innerHTML;
//             log(node.innerHTML)
//         } else {
//             /* If the current node has children, queue them for further
//              * processing, ignoring any '<script>' tags. */
//              log("children = " + node.children);
//              if (node.childElementCount >0 ) {
//                  [].slice.call(node.children).forEach(function(childNode) {
//                     if (childNode.tagName != "SCRIPT") {
//                         nodes.push(childNode);
//                         log("children details are: type=" + node.nodeType + "&id=" + node.id + "&tagname="+node.tagName)
//                     }
//                 });
//              }
//         }
//     }
// }
//
// /* Observer1: Looks for 'div.search' */
// var observer1 = new MutationObserver(function(mutations) {
//     /* For each MutationRecord in 'mutations'... */
//     mutations.some(function(mutation) {
//         /* ...if nodes have beed added... */
//         if (mutation.addedNodes && (mutation.addedNodes.length > 0)) {
//             /* ...look for 'div#search' */
//             n = mutation.target
//             log("mutation added " + " " + n.tagName)
//             modifyLinks(n)
//             var node = mutation.target.querySelector("div#main");
//             if (node) {
//                 log("mutation search found")
//
//                 /* 'div#search' found; stop observer 1 and start observer 2 */
//                 observer1.disconnect();
//                 observer2.observe(node, config);
//
//                 if (regex.test(node.innerHTML)) {
//                     /* Modify any '<a>' elements already in the current node */
//                     log("modifying links")
//                     modifyLinks(node);
//                 }
//                 return true;
//             }
//         }
//     });
// });
//
// /* Observer2: Listens for '<a>' elements insertion */
// var observer2 = new MutationObserver(function(mutations) {
//     mutations.forEach(function(mutation) {
//         if (mutation.addedNodes) {
//             [].slice.call(mutation.addedNodes).forEach(function(node) {
//                 /* If 'node' or any of its desctants are '<a>'... */
//                 if (regex.test(node.outerHTML)) {
//                     /* ...do something with them */
//                     log("modifying links -2 ")
//                     modifyLinks(node);
//                 }
//             });
//         }
//     });
// });

function log(str) {
    console.log(str)
}

function modify(node, type) {
    if (node.tagName == "CITE") {
        if (type == '1') {
            node.innerHTML = "[Ad] " + node.innerHTML;
        } else if (type = '2') {
            node.innerHTML = "[$$] " + node.innerHTML;
        }
    }
}

function isadwebsite(link, node) {
    var hostname = ""
    try {
        words = link.split('<')
        url = new URL(words[0]);
        hostname = url.hostname
        log(hostname)
    } catch (error) {
        log("url parsing failed " + error)
        return false;
    }
    chrome.runtime.sendMessage({method: "getval", key: hostname}, function(response) {
        //log(response.status);
        if (response.status ) {
            modify(node, response.status )
        }
    });
}

function processNode(event) {
    document.removeEventListener('DOMNodeInserted', processNode);
    var str = event.relatedNode;
    var nodes = document.querySelectorAll("CITE");
    nodes.forEach(function(node) {
        if (!node.innerHTML.includes("[")) {
            isadwebsite(node.innerHTML, node)
        }
    });
    //document.addEventListener('DOMNodeInserted', processNode);
}

function run() {
    log("Starting");
    hostname = window.location.hostname
    log("Parsing the hostname " + hostname);

    if (hostname.includes("google.com")) {
        log("Annoting all the known websites");
        //observer1.observe(document.body, config);
        localStorage.setItem('en.wikipedia.org', '1')
        document.addEventListener('DOMNodeInserted', processNode);
    } else {
        log("ignoring the page")
    }
}
document.addEventListener("load", run());
