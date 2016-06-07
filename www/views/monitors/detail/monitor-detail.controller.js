(function () {

  'use strict';

  angular.module('shaman.controllers')

  .controller('MonitorDetailCtrl', MonitorDetailCtrl);

  function MonitorDetailCtrl($scope, $stateParams) {

    var vm = this;

    vm.monitor = { id: 1, name: 'Armado Operativo'} ;

  }

})();
