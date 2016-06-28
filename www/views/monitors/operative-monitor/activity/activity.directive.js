angular
.module('shaman')
.directive('operativeMonitorActivity', [function() {

  var directive = {
    restrict: 'E',
    replace: true,
    templateUrl:'views/monitors/operative-monitor/activity/activity.template.html',
    bindToController: true,
    scope : true,
    controller: 'OperativeMonitorActivityCtrl',
    controllerAs: 'operativeMonitorActivityCtrl'
  };

  return directive;
}]);
