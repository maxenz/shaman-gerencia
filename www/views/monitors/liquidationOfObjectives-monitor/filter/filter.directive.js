angular
.module('shaman')
.directive('liquidationOfObjectivesMonitorFilter', [function() {

  var directive = {
    restrict: 'E',
    replace: true,
    templateUrl:'views/monitors/liquidationOfObjectives-monitor/filter/filter.template.html',
    bindToController: true,
    scope : true,
    controller: 'LiquidationOfObjectivesMonitorFilterCtrl',
    controllerAs: 'liquidationOfObjectivesMonitorFilterCtrl'
  };

  return directive;
}]);
