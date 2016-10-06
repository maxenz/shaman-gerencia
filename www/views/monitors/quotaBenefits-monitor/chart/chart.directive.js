angular
.module('shaman')
.directive('quotaBenefitsMonitorChart', [function() {

  var directive = {
    restrict: 'E',
    replace: true,
    templateUrl:'views/monitors/quotaBenefits-monitor/chart/chart.template.html',
    bindToController: true,
    scope : true,
    controller: 'QuotaBenefitsMonitorChartCtrl',
    controllerAs: 'quotaBenefitsMonitorChartCtrl'
  };

  return directive;
}]);
