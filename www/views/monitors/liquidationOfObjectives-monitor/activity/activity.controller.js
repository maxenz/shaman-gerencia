(function () {

  'use strict';

  angular.module('shaman.controllers')

  .controller('LiquidationOfObjectivesMonitorActivityCtrl', LiquidationOfObjectivesMonitorActivityCtrl);

  LiquidationOfObjectivesMonitorActivityCtrl.$inject = [
    '$scope',
    '$ionicTabsDelegate',
    'monitorService',
    'liquidationOfObjectivesMonitorService',
    'utilsService',
    '$ionicLoading'
  ]

  function LiquidationOfObjectivesMonitorActivityCtrl(
    $scope,
    $ionicTabsDelegate,
    monitorService,
    liquidationOfObjectivesMonitorService,
    utilsService,
    $ionicLoading,
    $stateParams
  ) {

    var vm          = this;

    vm.service      = liquidationOfObjectivesMonitorService;
    vm.isGroupShown = isGroupShown;
    vm.toggleGroup  = toggleGroup;

    function toggleGroup(group) {
      if (vm.isGroupShown(group)) {
        vm.shownGroup = null;
      } else {
        vm.shownGroup = group;
      }
    };

    function isGroupShown(group) {
      return vm.shownGroup === group;
    };

  }

})();
