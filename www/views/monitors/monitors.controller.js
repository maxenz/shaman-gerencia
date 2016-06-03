(function () {

  'use strict';

  angular.module('shaman.controllers')

  .controller('MonitorsCtrl', MonitorsCtrl);

  function MonitorsCtrl() {

    var vm = this;

    var monitor1 = { id: 1, name: 'Armado Operativo' };
    var monitor2 = { id: 2, name: 'Presupuesto de Móviles'};

    vm.monitors = [];
    vm.monitors.push(monitor1);
    vm.monitors.push(monitor2);

  }

})();
