angular
.module('shaman')
.directive('mobilesBudgetChart', [function() {

  var directive = {
    restrict: 'E',
    replace: true,
    templateUrl:'views/monitors/mobilesBudget-monitor/chart/chart.template.html',
    bindToController: true,
    scope : true,
    controller: 'MobilesBudgetChartCtrl',
    controllerAs: 'mobilesBudgetChartCtrl'
  };

  return directive;
}]);
