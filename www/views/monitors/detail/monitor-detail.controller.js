(function () {

  'use strict';

  angular.module('shaman.controllers')

  .controller('MonitorDetailCtrl', MonitorDetailCtrl);

  MonitorDetailCtrl.$inject = [
    '$scope',
    '$ionicTabsDelegate'
  ]

  function MonitorDetailCtrl($scope, $ionicTabsDelegate, $stateParams) {

    var vm = this;

    vm.monitor = { id: 1, name: 'Armado Operativo'} ;

    vm.selectSecondTab = function () {
      $ionicTabsDelegate.$getByHandle('monitor-tabs-handle').select(1);
    }

  }

})();
