(function() {

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .directive('foundItems', FoundItems)
  .constant('APIBasePath', 'https://davids-restaurant.herokuapp.com');

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {

    narrowCtrl = this;

    narrowCtrl.searchMenu = function(searchTerm) {
      var promise = MenuSearchService.getMatchedMenuItems(searchTerm);
      promise.then(function(result){
        narrowCtrl.found = result;
      });
    };
  }

  MenuSearchService.$inject = ['$http', 'APIBasePath'];
  function MenuSearchService($http, APIBasePath) {

    var menuSearch = this;

    menuSearch.getMatchedMenuItems = function(searchTerm) {
      return $http({
      method: "GET",
      url: (APIBasePath + "/menu_items.json")
      }).then(function(result) {
        var menu_items = result.data.menu_items;
        if(searchTerm !== undefined){
          searchTerm = searchTerm.toLowerCase();
        }
        var foundItems = [];
        for(var i=0; i < menu_items.length; i++) {
          if(menu_items[i].description.indexOf(searchTerm) !== -1) {
            foundItems.push(menu_items[i]);
          }
        }
        //return processed items
        return foundItems;
      });
    };
  }

  function FoundItems() {

    var ddo = {

    };
    return ddo;

  }







})();
