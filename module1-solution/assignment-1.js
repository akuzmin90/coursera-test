(function(){
'use strict';

angular.module('LunchApp', [])
.controller('LunchController', LunchController);

LunchController.$inject = ['$scope'];
function LunchController($scope) {
  $scope.handleClick = function() {
    $scope.feedback = '';
    if ($scope.dishes) {
      var dishesArray = $scope.dishes.split(',');
      var dishesCount = dishesArray.length;
      if (dishesCount <= 3) {
        $scope.feedback = 'Enjoy!';
      }
      else {
        $scope.feedback = 'Too much!';
      }
    }
    else {
      $scope.feedback = 'Please enter data first';
    }
  }
}

})();
