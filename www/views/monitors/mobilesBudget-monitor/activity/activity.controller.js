(function () {

  'use strict';

  angular.module('shaman.controllers')

  .controller('MobilesBudgetActivityCtrl', MobilesBudgetActivityCtrl);

  MobilesBudgetActivityCtrl.$inject = [
    '$scope',
    '$ionicTabsDelegate',
    'monitorService',
    'mobilesBudgetService',
    'utilsService',
    '$ionicLoading'
  ]

  function MobilesBudgetActivityCtrl(
    $scope,
    $ionicTabsDelegate,
    monitorService,
    mobilesBudgetService,
    utilsService,
    $ionicLoading,
    $stateParams
  ) {

    var vm              = this;

    vm.mobBudgetService = mobilesBudgetService;
    vm.minutesToTime    = minutesToTime;
    vm.isGroupShown     = isGroupShown;
    vm.toggleGroup      = toggleGroup;

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

    function minutesToTime(minutes) {
      return utilsService.minutesToTime(minutes);
    }

  }

})();
