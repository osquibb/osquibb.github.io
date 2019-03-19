(function() {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig)
.controller('CategoriesCtrl', CategoriesCtrl)
.controller('ItemsCtrl', ItemsCtrl);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  $urlRouterProvider
  .otherwise('/');

  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: 'src/menuapp/templates/home.html'
  })
  .state('home.categories', {
    url: 'categories',
    template: '<categories categories="ctrl.categories"></categories>', //??
    controller: 'CategoriesCtrl as ctrl',
    resolve: {
      categories: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getAllCategories();
      }]
    }
  })
  .state('home.items', {
    url: 'items',
    template: '<items items="iCtrl.items" category="iCtrl.category"></items>',
    controller: 'ItemsCtrl as iCtrl',
    resolve: {
      items: ['MenuDataService', '$stateParams',
        function(MenuDataService, $stateParams) {
          return MenuDataService.getItemsForCategory('L');
        }]
    }
  });

}

CategoriesCtrl.$inject = ['categories'];
function CategoriesCtrl(categories) {
  var ctrl = this;
  ctrl.categories = categories.data;

}

ItemsCtrl.$inject = ['items'];
function ItemsCtrl(items) {
  var iCtrl = this;
  iCtrl.items = items.data.menu_items;
  iCtrl.category = items.data.category.name;

}


})();
