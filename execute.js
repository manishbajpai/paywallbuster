// send the page title as a chrome message
name = "Ad Aware"
var searchtext = ["The Mercury News",
                  "The New York Times"]

function replace(a,b)
{
  console.log("Annotating: " + a + " to " + b);

  var i = 1
  if(window.find)
  {
    while(window.find(a))
    {

      var rng=window.getSelection().getRangeAt(0);
      rng.deleteContents();

      rng.insertNode(document.createTextNode(b));
      console.log("replace count: " + i++)

    }
  }
  else if(document.body.createTextRange)
  {
    var rng=document.body.createTextRange();
    while(rng.findText(a))
    {
      rng.pasteHTML(b);
      console.log("replace count: " + i++)
    }
  }
}



/* MutationObserver configuration data: Listen for "childList"
 * mutations in the specified element and its descendants */
var config = {
    childList: true,
    subtree: true
};
var regex = /<a.*?>[^<]*<\/a>/;

/* Traverse 'rootNode' and its descendants and modify '<a>' tags */
function modifyLinks(rootNode) {
    var nodes = [rootNode];
    while (nodes.length > 0) {
        var node = nodes.shift();
        console.log("details are: " + node.innerHTML)

        if (node.tagName == "A") {
            /* Modify the '<a>' element */
            node.innerHTML = "~~" + node.innerHTML + "~~";
        } else {
            /* If the current node has children, queue them for further
             * processing, ignoring any '<script>' tags. */
            [].slice.call(node.children).forEach(function(childNode) {
                if (childNode.tagName != "SCRIPT") {
                    nodes.push(childNode);
                }
            });
        }
    }
}

/* Observer1: Looks for 'div.search' */
var observer1 = new MutationObserver(function(mutations) {
    /* For each MutationRecord in 'mutations'... */
    mutations.some(function(mutation) {
        /* ...if nodes have beed added... */
        if (mutation.addedNodes && (mutation.addedNodes.length > 0)) {
            /* ...look for 'div#search' */
            n = mutation.target
            console.log("mutation added " + " " + n.tagName)
            modifyLinks(n)
            var node = mutation.target.querySelector("div#main");
            if (node) {
                console.log("mutation search found")

                /* 'div#search' found; stop observer 1 and start observer 2 */
                observer1.disconnect();
                observer2.observe(node, config);

                if (regex.test(node.innerHTML)) {
                    /* Modify any '<a>' elements already in the current node */
                    console.log("modifying links")
                    modifyLinks(node);
                }
                return true;
            }
        }
    });
});

/* Observer2: Listens for '<a>' elements insertion */
var observer2 = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.addedNodes) {
            [].slice.call(mutation.addedNodes).forEach(function(node) {
                /* If 'node' or any of its desctants are '<a>'... */
                if (regex.test(node.outerHTML)) {
                    /* ...do something with them */
                    console.log("modifying links -2 ")
                    modifyLinks(node);
                }
            });
        }
    });
});


function filterResultInserts(event) {
    var str = event.relatedNode;
    //if (str.includes("search")) {
        //console.log(event.target.nodeName);
        //modifyLinks(event.target);
    //}
}
function run() {
  //console.log("Annoting all the known websites");

  setTimeout(function()
    {
      var x;
      for (x in searchtext)
      {
        //replace(searchtext[x], " [$$$] " + searchtext[x]);
      }
    }
    , 3000);
  //console.log("Done Annoting all the known websites");
  /* Start observing 'body' for 'div#search' */
  //observer1.observe(document.body, config);


document.addEventListener('DOMNodeInserted', filterResultInserts);

}


if (document.addEventListener) {
  //DOMContentLoaded doesn't wait for styles, subframes etc.
  //document.addEventListener("DOMContentLoaded", run(), false);

  document.addEventListener("load", run());

}
