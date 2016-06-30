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
        //vm.graph.options = {responsive: false};
        console.log($scope.graph);


      // $scope.graph = {};                        // Empty graph object to hold the details for this graph
      // $scope.graph.data = [                     // Add bar data, this will set your bars height in the graph
      //   //Awake
      //   [16, 15, 20, 12, 16, 12, 8],
      //   //Asleep
      //   [8, 9, 4, 12, 8, 12, 14]
      // ];
      // $scope.graph.labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];    // Add labels for the X-axis
      // $scope.graph.series = ['Awake', 'Asleep'];  // Add information for the hover/touch effect



    }


  }

})();
