(function () {

  'use strict';

  angular.module('shaman.controllers')

  .controller('OperativeMonitorChartCtrl', OperativeMonitorChartCtrl);

  OperativeMonitorChartCtrl.$inject = [
    'operativeMonitorService',
    '$scope',
    '$timeout'
  ]

  function OperativeMonitorChartCtrl(
    operativeMonitorService,
    $scope,
    $timeout,
    $stateParams
  ) {

    var vm = this;

    activate();

    function activate() {

        vm.graph = {};
        vm.graph.labels = operativeMonitorService.chartLabels;
        vm.graph.series = ['Conformidad %'];
        vm.graph.data = [operativeMonitorService.chartData];
        vm.graph.colours =  [{
          "fillColor": "#e74c3c",
          "strokeColor": "#e74c3c",
          "pointColor": "#e74c3c"
        }];

    }


  }

})();
