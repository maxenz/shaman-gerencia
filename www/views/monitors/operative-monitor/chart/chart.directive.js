angular
.module('shaman')
.directive('operativeMonitorChart', [function() {

  var directive = {
    restrict: 'E',
    replace: true,
    templateUrl:'views/monitors/operative-monitor/chart/chart.template.html',
    bindToController: true,
    scope : true,
    controller: 'OperativeMonitorChartCtrl',
    controllerAs: 'operativeMonitorChartCtrl'
  };

  return directive;
}]);
