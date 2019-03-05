(function() {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];

function LunchCheckController ($scope) {
  $scope.message = "";
  $scope.lunchMenu = "";

  $scope.checkMenu = function () {
    // convert lunchMenu into an array
    var lunchMenuArray= $scope.lunchMenu.split(',');

    // Utility function checks if string is null or empty
    var isNullOrEmpty = function (str) {
      return !str || !str.trim();
    }

    var menuCount = 0;
    // compute number of items in Menu
    for(var i = 0; i < lunchMenuArray.length; i++) {
      if(!isNullOrEmpty(lunchMenuArray[i])) {
        menuCount += 1;
      }
    }
    // update message
    if (menuCount == 0) {
      $scope.message = "Please enter data first";
    } else if (menuCount <= 3) {
      $scope.message = "Enjoy!";
    } else {
      $scope.message = "Too Much!"
    }

  };



}

})();
