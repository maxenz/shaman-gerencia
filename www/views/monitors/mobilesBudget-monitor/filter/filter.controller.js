(function () {

  'use strict';

  angular.module('shaman.controllers')

  .controller('MobilesBudgetFilterCtrl', MobilesBudgetFilterCtrl);

  MobilesBudgetFilterCtrl.$inject = [
    '$scope',
    '$ionicTabsDelegate',
    'monitorService',
    'mobilesBudgetService',
    'utilsService',
    '$ionicLoading',
    '$log'
  ]

  function MobilesBudgetFilterCtrl(
    $scope,
    $ionicTabsDelegate,
    monitorService,
    mobilesBudgetService,
    utilsService,
    $ionicLoading,
    $log,
    $stateParams
  ) {

    var vm = this;
    activate();

    function activate() {

      vm.data                     = {};
      vm.data.filters             = monitorService.filters.mobilesBudget;
      vm.data.selected            = {};
      vm.data.selected.analyze = vm.data.filters.analyze[0].value;
      vm.data.selected.project = vm.data.filters.projects[1].value;
      vm.data.selected.dateSince  = new Date();
      vm.data.selected.dateTo     = new Date();

      vm.search                   = search;
      search();

    }

    function search() {

      utilsService.showLoading('Cargando móviles...');
      mobilesBudgetService
      .getMobiles(vm.data.selected)
      .then(
        function(response) {
          mobilesBudgetService.parseMobiles(response);
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
