(function () {

  'use strict';

  angular.module('shaman.controllers')

  .controller('OperativeMonitorFilterCtrl', OperativeMonitorFilterCtrl);

  OperativeMonitorFilterCtrl.$inject = [
    '$scope',
    '$ionicTabsDelegate',
    'monitorService',
    'operativeMonitorService',
    'utilsService',
    '$ionicLoading'
  ]

  function OperativeMonitorFilterCtrl(
    $scope,
    $ionicTabsDelegate,
    monitorService,
    operativeMonitorService,
    utilsService,
    $ionicLoading,
    $stateParams
  ) {

    var vm = this;
    activate();

    function activate() {

      vm.data                       = {};
      vm.data.filters               = monitorService.getFilters().operative;
      vm.data.selected              = {};
      vm.data.selected.groupingView = vm.data.filters.groupingView[0].value;
      vm.data.selected.queryMode    = vm.data.filters.queryMode[0].value;

      vm.search = search;
      search();

      vm.data.selected.actualDate   = new Date();
      vm.data.selected.actualTime   = new Date(1970,0,1,0,0,0);

    }

    function search() {
      utilsService.showLoading('Cargando móviles...');
      operativeMonitorService
      .getMonitorsList(vm.data.selected)
      .then(
        function(response) {
          operativeMonitorService.parseMonitorsList(response);
          console.log(operativeMonitorService.monitors);
          $ionicTabsDelegate.$getByHandle('monitor-tabs-handle').select(1);
          $ionicLoading.hide();
        },
        function (error){
          $ionicLoading.hide();
          utilsService.showAlert('Error!', 'No se pudo realizar la búsqueda. Intente nuevamente');
        });
      }

    }

  })();
