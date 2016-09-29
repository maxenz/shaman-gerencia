angular
.module('shaman')
.directive('quotaBenefitsFilter', [function() {

  var directive = {
    restrict: 'E',
    replace: true,
    templateUrl:'views/monitors/quotaBenefits-monitor/filter/filter.template.html',
    bindToController: true,
    scope : true,
    controller: 'QuotaBenefitsFilterCtrl',
    controllerAs: 'quotaBenefitsFilterCtrl'
  };

  return directive;
}]);
