(function () {

  'use strict';

  angular.module('shaman.controllers')

  .controller('OperativeMonitorActivityCtrl', OperativeMonitorActivityCtrl);

  OperativeMonitorActivityCtrl.$inject = [
    '$scope',
    '$ionicTabsDelegate',
    'monitorService',
    'operativeMonitorService',
    'utilsService',
    '$ionicLoading'
  ]

  function OperativeMonitorActivityCtrl(
    $scope,
    $ionicTabsDelegate,
    monitorService,
    operativeMonitorService,
    utilsService,
    $ionicLoading,
    $stateParams
  ) {

    var vm = this;
    activate();

    function activate() {

      vm.monitors = operativeMonitorService.monitors;

      vm.toggleGroup = function(group) {
        if (vm.isGroupShown(group)) {
          vm.shownGroup = null;
        } else {
          vm.shownGroup = group;
        }
      };

      vm.isGroupShown = function(group) {
        return vm.shownGroup === group;
      };
          
    }

  }

})();
