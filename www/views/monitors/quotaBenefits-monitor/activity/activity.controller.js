(function () {

  'use strict';

  angular.module('shaman.controllers')

  .controller('QuotaBenefitsMonitorActivityCtrl', QuotaBenefitsMonitorActivityCtrl);

  QuotaBenefitsMonitorActivityCtrl.$inject = [
    '$scope',
    '$ionicTabsDelegate',
    'monitorService',
    'quotaBenefitsService',
    'utilsService',
    '$ionicLoading'
  ]

  function QuotaBenefitsMonitorActivityCtrl(
    $scope,
    $ionicTabsDelegate,
    monitorService,
    quotaBenefitsService,
    utilsService,
    $ionicLoading,
    $stateParams
  ) {

    var vm = this;
    vm.quotaBenefitsService = quotaBenefitsService;
    vm.getWaitedServices    = getWaitedServices;

    activate();

    function activate() {

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

    function getWaitedServices(client) {
      return (parseFloat(client.desvio) * -1) + parseFloat(client.tomTotal);
    }

  }

})();
