(function() {

  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {

    this.items = ShoppingListCheckOffService.getToBuyItems();

    this.buyItem = function(itemIndex) {
      ShoppingListCheckOffService.buyItem(itemIndex);
    };

    this.isEmpty = function() {
      return(this.items.length === 0);
    };

  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {

    this.items = ShoppingListCheckOffService.getBoughtItems();

    this.isEmpty = function() {
      return(this.items.length === 0);
    };

  }

  function ShoppingListCheckOffService() {

    var toBuyItems = [
      {name: "cookies",
      quantity: 10},
      {name: "chips",
      quantity: 5},
      {name: "tomatoes",
      quantity: 2},
      {name: "avocados",
      quantity: 3},
      {name: "tortillas",
      quantity: 10},
    ];

    var boughtItems = [];

    this.buyItem = function(itemIndex) {
      var item = toBuyItems[itemIndex];
      boughtItems.push(item);
      toBuyItems.splice(itemIndex,1);
    };

    this.getToBuyItems = function() {
      return toBuyItems;
    };

    this.getBoughtItems = function() {
      return boughtItems;
    };

  }






})();
