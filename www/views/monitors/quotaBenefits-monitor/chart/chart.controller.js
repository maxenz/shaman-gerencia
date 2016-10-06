(function () {

  'use strict';

  angular.module('shaman.controllers')

  .controller('QuotaBenefitsMonitorChartCtrl', QuotaBenefitsMonitorChartCtrl);

  QuotaBenefitsMonitorChartCtrl.$inject = [
    'quotaBenefitsService',
    '$scope',
    '$timeout'
  ]

  function QuotaBenefitsMonitorChartCtrl(
    quotaBenefitsService,
    $scope,
    $timeout,
    $stateParams
  ) {

    var vm = this;

    activate();

    function activate() {

      vm.graph         = {};
      vm.graph.labels  = quotaBenefitsService.chartLabels;
      vm.graph.series  = ['Desvío'];
      vm.graph.data    = [quotaBenefitsService.chartData];
      vm.graph.options =
      {
        barShowStroke: false,
        scaleBeginAtZero : false,
        scaleOverride: true,
        scaleSteps: 20,
        scaleStepWidth: 5,
        scaleStartValue: -100,
        responsive: true,
        barBeginAtOrigin: true,
      }
      //vm.graph.options = {scaleBeginAtZero: false, ticks: {reverse: true}};
      vm.graph.colours = [{
        "fillColor": "#e74c3c",
        "strokeColor": "#e74c3c",
        "pointColor": "#e74c3c"
      }];

    }
  }

})();
