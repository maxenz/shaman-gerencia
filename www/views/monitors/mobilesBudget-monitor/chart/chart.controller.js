(function () {

  'use strict';

  angular.module('shaman.controllers')

  .controller('MobilesBudgetChartCtrl', MobilesBudgetChartCtrl);

  MobilesBudgetChartCtrl.$inject = [
    'mobilesBudgetService',
    '$scope',
    '$timeout'
  ]

  function MobilesBudgetChartCtrl(
    mobilesBudgetService,
    $scope,
    $timeout,
    $stateParams
  ) {

    var vm = this;

    activate();

    function activate() {

        vm.graph = {};
        vm.graph.labels = mobilesBudgetService.chartLabels;
        vm.graph.series = ['Realizado', 'Objetivo'];
        vm.graph.data = [mobilesBudgetService.chartOpeServicios, mobilesBudgetService.chartEspServicios];
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
