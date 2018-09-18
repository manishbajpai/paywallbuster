// send the page title as a chrome message
console.log("Annotated all the known websites");

var searchtext = "The Mercury News"

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

replace(searchtext, searchtext + " [$$$] ")
