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
  .state('home.test', {
    url: 'test',
    template: "Test View Here.  hello it works"
  })
  .state('home.categories', {
    url: 'categories',
    template: '<categories categories="ctrl.categories"></categories>', //??
    controller: 'CategoriesCtrl as ctrl'
    // resolve: {
    //   categories: ['MenuDataService', function(MenuDataService) {
    //                 return MenuDataService.getAllCategories();
    //               }]
    // }
  });



}

CategoriesCtrl.$inject = [];
function CategoriesCtrl() {
  var ctrl = this;
  ctrl.categories = "Test Categories";

}


})();
