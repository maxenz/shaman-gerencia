angular
.module('shaman')
.directive('quotaBenefitsMonitorActivity', [function() {

  var directive = {
    restrict: 'E',
    replace: true,
    templateUrl:'views/monitors/quotaBenefits-monitor/activity/activity.template.html',
    bindToController: true,
    scope : true,
    controller: 'QuotaBenefitsMonitorActivityCtrl',
    controllerAs: 'quotaBenefitsMonitorActivityCtrl'
  };

  return directive;
}]);
