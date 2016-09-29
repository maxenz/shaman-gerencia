(function () {

  'use strict';

  angular.module('shaman.controllers')

  .controller('QuotaBenefitsFilterCtrl', QuotaBenefitsFilterCtrl);

  QuotaBenefitsFilterCtrl.$inject = [
    '$scope',
    '$ionicTabsDelegate',
    'monitorService',
    'quotaBenefitsService',
    'utilsService',
    '$ionicLoading',
    '$log'
  ]

  function QuotaBenefitsFilterCtrl(
    $scope,
    $ionicTabsDelegate,
    monitorService,
    quotaBenefitsService,
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

      utilsService.showLoading('Cargando clientes...');
      quotaBenefitsService
      .getClients(vm.data.selected)
      .then(
        function(response) {
          quotaBenefitsService.parseClients(response);
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
