(function () {

  'use strict';

  angular.module('shaman.controllers')

  .controller('MonitorsCtrl', MonitorsCtrl);

  MonitorsCtrl.$inject = ['loginService', '$state'];

  function MonitorsCtrl(loginService, $state) {

    var vm = this;

    if (!loginService.data.isAuthenticated) {
      $state.go('login');
    }

    vm.monitors = [
      { id: 1, name: 'Armado Operativo' },
      { id: 2, name: 'Presupuesto de Móviles'},
      { id: 3, name: 'Cupo de Prestaciones'},
      { id: 4, name: 'Liquidación de Objetivos'}
    ];

  }

})();
