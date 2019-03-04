// TODO: Create a JSON file that contains image urls, titles & descriptions
// for the tiles.  Then populate the tiles with the buildAndShowImageTiles function.

(function (window) {

  var imageInfo = {};

  document.addEventListener("DOMContentLoaded", function (event) {

    buildAndShowImageTiles("#main-content", 8);


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

})(window);
