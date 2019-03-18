(function() {
'use strict';

angular.module('MenuApp')
.component('categories', {
  templateUrl: 'src/menuapp/templates/categories.html',
  bindings: {
    categories: '<'
  }
});

})();
