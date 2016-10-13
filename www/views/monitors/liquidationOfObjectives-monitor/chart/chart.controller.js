(function () {

  'use strict';

  angular.module('shaman.controllers')

  .controller('LiquidationOfObjectivesMonitorChartCtrl', LiquidationOfObjectivesMonitorChartCtrl);

  LiquidationOfObjectivesMonitorChartCtrl.$inject = [
    'liquidationOfObjectivesMonitorService',
    '$scope',
    '$timeout'
  ]

  function LiquidationOfObjectivesMonitorChartCtrl(
    liquidationOfObjectivesMonitorService,
    $scope,
    $timeout,
    $stateParams
  ) {

    var vm = this;

    activate();

    function activate() {

      vm.graph = {};
      vm.graph.labels = liquidationOfObjectivesMonitorService.chartLabels;
      vm.graph.series = ['Cumplido Liquidación', 'Cumplido Incidentes'];
      vm.graph.data = [
        liquidationOfObjectivesMonitorService.chartLiq,
        liquidationOfObjectivesMonitorService.chartInc
      ];
      vm.graph.options = {
        multiTooltipTemplate : function (label) {
          return label.datasetLabel + ': ' + label.value.toString() + '%';
        }
      }
      vm.graph.colours =  [{
        "fillColor": "#e74c3c",
        "strokeColor": "#e74c3c",
        "pointColor": "#e74c3c"
      },
      {
        "fillColor": "#8bc541",
        "strokeColor": "#8bc541",
        "pointColor": "#8bc541"
      }
    ];

  }


}

})();
