(function () {

  'use strict';

  angular.module('shaman.controllers')

  .controller('LiquidationOfObjectivesMonitorFilterCtrl', LiquidationOfObjectivesMonitorFilterCtrl);

  LiquidationOfObjectivesMonitorFilterCtrl.$inject = [
    '$scope',
    '$ionicTabsDelegate',
    'monitorService',
    'liquidationOfObjectivesMonitorService',
    'utilsService',
    '$ionicLoading',
    '$log'
  ]

  function LiquidationOfObjectivesMonitorFilterCtrl(
    $scope,
    $ionicTabsDelegate,
    monitorService,
    liquidationOfObjectivesMonitorService,
    utilsService,
    $ionicLoading,
    $log,
    $stateParams
  ) {

    var vm = this;
    activate();

    function activate() {

      vm.data                     = {};
      vm.data.selected            = {};
      vm.data.selected.dateSince  = new Date();
      vm.data.selected.dateTo     = new Date();

      vm.search                   = search;
      search();

    }

    function search() {

      utilsService.showLoading('Cargando móviles...');
      liquidationOfObjectivesMonitorService
      .getMobiles(vm.data.selected)
      .then(
        function(response) {
          liquidationOfObjectivesMonitorService.parseMobiles(response);
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
