// send the page title as a chrome message

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
if (document.addEventListener) {
  //DOMContentLoaded doesn't wait for styles, subframes etc.
  //document.addEventListener("DOMContentLoaded", initializeExecutor(), false);

  document.addEventListener("load", initializeExecutor());

}

function initializeExecutor() {
  console.log("Annoting all the known websites");
  setTimeout(function()
    {
      var x;
      for (x in searchtext)
      {
        replace(searchtext[x], " [$$$] " + searchtext[x]);
      }
    }
    , 3000);
  console.log("Done Annoting all the known websites");

}
