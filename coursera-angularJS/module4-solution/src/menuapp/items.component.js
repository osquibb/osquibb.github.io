(function() {
'use strict';

angular.module('MenuApp')
.component('items', {
  templateUrl: 'src/menuapp/templates/items.html',
  bindings: {
    items: '<',
    category: '<'
  }
});

})();
