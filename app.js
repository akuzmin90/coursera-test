(function () {
'use strict';

angular.module('DIApp', [])
.controller('DIController', DIController);

//
// DIController.$inject is used so minificator can't break the code
//
DIController.$inject = ['$scope', '$filter'];
function DIController($scope, $filter) {
  $scope.name = "Alex";

  $scope.upper = function() {
    var upCase = $filter('uppercase');
    $scope.name = upCase($scope.name);
  }
}

})();

//
// This is minificated code:
//

// !function(){"use strict";function e(e,n)
// {e.name="Alex",e.upper=function(){
//   var r=n("uppercase");e.name=r(e.name)}}angular.module("DIApp",[])
//   .controller("DIController",e),e.$inject=["$scope","$filter"]}();
