(function(){
'use strict';

angular.module('Assignment2App', [])
.controller('BuyController', BuyController)
.controller('BoughtController', BoughtController)
.service('ShoppingService', ShoppingService);

BuyController.$inject = ['ShoppingService'];
function BuyController(ShoppingService) {
  var controller = this;

  controller.buyItem = function(index) {
    var len = ShoppingService.buyItem(index);
  };

  controller.getBuyableItems = function() {
    return ShoppingService.getBuyableItems();
  };
};

BoughtController.$inject = ['ShoppingService'];
function BoughtController(ShoppingService) {
  var controller = this;

  controller.getBoughtItems = function() {
    return ShoppingService.getBoughtItems();
  };
};

function ShoppingService() {
  var service = this;

  var buyableList = [{name : 'cookies', quantity:10},
                    {name : 'watermelons', quantity:5},
                    {name : 'pine-apples', quantity:7},
                    {name : 'watter bottles', quantity:3},
                    {name : 'apples', quantity:2}];
  var boughtList = [];

  service.buyItem = function(index) {
    var item = buyableList.splice(index, 1)[0];
    boughtList.push(item);
    return buyableList.length;
  };

  service.getBuyableItems = function() {
    return buyableList;
  };

  service.getBoughtItems = function() {
    return boughtList;
  };
};

})();
