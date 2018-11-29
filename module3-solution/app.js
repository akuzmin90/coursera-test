(function(){
'use strict';

angular.module('Assignment3App', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective);

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      found: '<',
      remove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'fndController',
    bindToController: true
  };

  return ddo;
};

function FoundItemsDirectiveController() {
  var controller = this;

  controller.isEmpty = function () {
    return controller.found != null && controller.found.length == 0 && !controller.justStarted;
  };
};

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var controller = this;
  controller.found = null;

  controller.search = function() {
    var promise = MenuSearchService.getMatchedMenuItems();
    promise.then(function (response) {
      if (controller.searchTerm != null && controller.searchTerm.length > 0) {
        var foundItems = angular.fromJson(response.data).menu_items;
        console.log(foundItems);
        var res = [];
        console.log("Searching " + controller.searchTerm);
        for (var i = 0; i < foundItems.length; i++) {
          if (foundItems[i].description.toLowerCase()
                        .includes(controller.searchTerm.toLowerCase())) {
            res.push(foundItems[i]);
          }
        }
        controller.found = res;
      }
      else {
        controller.found = [];
      }
    })
    .catch(function (error) {
      console.log(error);
    })
  };

  controller.remove = function(itemIndex) {
    controller.found.splice(itemIndex, 1);
  };
};

MenuSearchService.$inject = ['$http'];
function MenuSearchService($http) {
  var service = this;

  service.getMatchedMenuItems = function() {
    var promise = $http({
      method: "GET",
      url: ("https://davids-restaurant.herokuapp.com/menu_items.json"),
      params: {}
    });

    return promise;
  };
};

})();
