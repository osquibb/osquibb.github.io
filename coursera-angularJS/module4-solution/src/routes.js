(function() {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig)
.controller('CategoriesCtrl', CategoriesCtrl);

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
  });

}

CategoriesCtrl.$inject = ['MenuDataService', 'categories'];
function CategoriesCtrl(MenuDataService, categories) {
  var ctrl = this;
  ctrl.categories = categories.data;

}


})();
