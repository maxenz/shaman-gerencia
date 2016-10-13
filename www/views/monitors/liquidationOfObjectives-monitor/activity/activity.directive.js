angular
.module('shaman')
.directive('liquidationOfObjectivesMonitorActivity', [function() {

  var directive = {
    restrict: 'E',
    replace: true,
    templateUrl:'views/monitors/liquidationOfObjectives-monitor/activity/activity.template.html',
    bindToController: true,
    scope : true,
    controller: 'LiquidationOfObjectivesMonitorActivityCtrl',
    controllerAs: 'liquidationOfObjectivesMonitorActivityCtrl'
  };

  return directive;
}]);
