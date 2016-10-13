angular
.module('shaman')
.directive('liquidationOfObjectivesMonitorChart', [function() {

  var directive = {
    restrict: 'E',
    replace: true,
    templateUrl:'views/monitors/liquidationOfObjectives-monitor/chart/chart.template.html',
    bindToController: true,
    scope : true,
    controller: 'LiquidationOfObjectivesMonitorChartCtrl',
    controllerAs: 'liquidationOfObjectivesMonitorChartCtrl'
  };

  return directive;
}]);
