(function() {

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .constant('APIBasePath', 'https://davids-restaurant.herokuapp.com')
  .directive('foundItems', FoundItems);

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {

    narrowCtrl = this;

    narrowCtrl.searchMenu = function() {
      if(narrowCtrl.searchTerm === "") {
        narrowCtrl.found = [];
      } else {
        var promise = MenuSearchService.getMatchedMenuItems(narrowCtrl.searchTerm);
        promise.then(function(result){
          narrowCtrl.found = result;
        });
      }
    };

    narrowCtrl.removeItem = function(itemIndex) {
      narrowCtrl.found.splice(itemIndex, 1);
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
      templateUrl:'found_items.html',
      scope: {
        found: '<',
        onRemove: '&'
      },
      controller: FoundItemsController,
      controllerAs: 'ctrl',
      bindToController: true
    };
    return ddo;
  }

  function FoundItemsController() {
    ctrl = this;

    ctrl.isEmpty = function() {
      return (ctrl.found === undefined || ctrl.found.length === 0);
    };




  }






})();
