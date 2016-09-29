(function () {

  'use strict';

  angular.module('shaman.controllers')

  .controller('MonitorDetailCtrl', MonitorDetailCtrl);

  MonitorDetailCtrl.$inject = [
    '_mobileTypes',
    '$scope',
    'monitorService',
    '$ionicTabsDelegate',
    '$stateParams'
  ]

  function MonitorDetailCtrl(
    _mobileTypes,
    $scope,
    monitorService,
    $ionicTabsDelegate,
    $stateParams
  ) {

    var vm = this;
    activate();

    function activate() {

      vm.showOperativeMonitor     = parseInt($stateParams.monitorId) === 1;
      vm.showMobilesBudgetMonitor = parseInt($stateParams.monitorId) === 2;
      vm.showQuotaBenefitsMonitor = parseInt($stateParams.monitorId) === 3;

      monitorService.parseMobileTypes(_mobileTypes);
      monitorService.setFilters();

      vm.selectSecondTab = function () {
        $ionicTabsDelegate.$getByHandle('monitor-tabs-handle').select(1);
      }

    }

  }

})();
