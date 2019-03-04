$(function() {

buildAndShowImageTiles("#main-content", 10);

});

function buildAndShowImageTiles (selector, numberOfTiles) {

  $ajaxUtils.sendGetRequest("snippets/image-snippet.html", function (response)
  {
    var finalHTML = '<section class="row">';
    for (var i = 0; i < numberOfTiles; i++) {
      finalHTML += response;
    };
    finalHTML += '</section>';
    insertHTML(selector, finalHTML);
    }, false);
}


function insertHTML (selector, html) {
  var targetElem = document.querySelector(selector);
  targetElem.innerHTML = html;
}
