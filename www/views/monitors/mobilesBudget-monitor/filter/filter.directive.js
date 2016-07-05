angular
.module('shaman')
.directive('mobilesBudgetFilter', [function() {

  var directive = {
    restrict: 'E',
    replace: true,
    templateUrl:'views/monitors/mobilesBudget-monitor/filter/filter.template.html',
    bindToController: true,
    scope : true,
    controller: 'MobilesBudgetFilterCtrl',
    controllerAs: 'mobilesBudgetFilterCtrl'
  };

  return directive;
}]);
