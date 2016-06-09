angular
.module('shaman')
.directive('operativeMonitorFilter', [function() {

  var directive = {
    restrict: 'E',
    replace: true,
    templateUrl:'views/monitors/operative-monitor/filter.template.html',
    bindToController: true,
    scope : true,
    controller: 'OperativeMonitorFilterCtrl',
    controllerAs: 'operativeMonitorFilterCtrl'
  };

  return directive;
}]);
