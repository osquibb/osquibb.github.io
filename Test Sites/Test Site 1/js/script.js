(function (window) { // IIFE start

// .addEventListener start
  document.addEventListener("DOMContentLoaded", function (event) {

    // hide drowpdown when dropdown button is not in focus
    $(".navbar-toggler").blur(function (event) {
      $("#navbarSupportedContent").collapse('hide'); }
    );


    // GET images json, then buildAndShowImageTiles
    $ajaxUtils.sendGetRequest("data/images.json", function(response) {
      buildAndShowImageTiles("#main-content", response);
      }, true);

  }); // .addEventListener end


  function buildAndShowImageTiles (selector, images) {

    $ajaxUtils.sendGetRequest("snippets/image-snippet.html", function (response)
    {
      // assign response's original state (w/ {{}}}) to snippet
      var snippet = response;
      var finalHTML = '<section class="row">';
      for (var i = 0; i < images.length; i++) {
        response = insertProperty(response, "image-url", images[i].url);
        response = insertProperty(response, "image-title", images[i].title);
        response = insertProperty(response, "image-description", images[i].description);
        response = insertProperty(response, "image-link", images[i].link);
        finalHTML += response;
        // reset response to original state so
        // that insertProperty can work for subsequent iterations
        response = snippet;
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
