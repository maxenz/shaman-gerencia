angular
.module('shaman')
.directive('mobilesBudgetActivity', [function() {

  var directive = {
    restrict: 'E',
    replace: true,
    templateUrl:'views/monitors/mobilesBudget-monitor/activity/activity.template.html',
    bindToController: true,
    scope : true,
    controller: 'MobilesBudgetActivityCtrl',
    controllerAs: 'mobilesBudgetActivityCtrl'
  };

  return directive;
}]);
