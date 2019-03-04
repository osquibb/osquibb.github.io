// TODO: Create a JSON file, actually an array of json strings
// (and get with ajax request) that populates
// the tiles with the buildAndShowImageTiles function.

(function (window) { // IIFE start


  var image = {
    url: "images/icon.png",
    title: "Image Title",
    description: "Some quick example text.",
    link: "https://www.google.com"
  };
  // Dummy JSON array
  var images = [image, image, image, image, image];

  // test array ***
  var jsonImages = []


// .addEventListener start
  document.addEventListener("DOMContentLoaded", function (event) {

    buildAndShowImageTiles("#main-content", images);

    // JSON test area ***

    $ajaxUtils.sendGetRequest("data/images.json", function(response) {
      console.log(response[0]); }, true);

    // JSON test area ***



  }); // .addEventListener end


  function buildAndShowImageTiles (selector, images) {

    $ajaxUtils.sendGetRequest("snippets/image-snippet.html", function (response)
    {
      var finalHTML = '<section class="row">';
      for (var i = 0; i < images.length; i++) {
        response = insertProperty(response, "image-url", images[i].url);
        response = insertProperty(response, "image-title", images[i].title);
        response = insertProperty(response, "image-description", images[i].description);
        response = insertProperty(response, "image-link", images[i].link);
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

  function insertProperty (string, propName, propValue) {
    var propToReplace = "{{" + propName + "}}";
    string = string.replace(new RegExp(propToReplace, "g"), propValue);
    return string;
}

})(window); // IIFE end
