(function () {

  'use strict';

  angular.module('shaman.controllers')

  .controller('OperativeMonitorFilterCtrl', OperativeMonitorFilterCtrl);

  OperativeMonitorFilterCtrl.$inject = [
    '$scope',
    '$ionicTabsDelegate',
    '$cordovaDatePicker',
    'monitorService',
    'operativeMonitorService'
  ]

  function OperativeMonitorFilterCtrl(
    $scope,
    $ionicTabsDelegate,
    $cordovaDatePicker,
    monitorService,
    operativeMonitorService,
    $stateParams
  ) {

    var vm = this;
    vm.data = {};
    vm.data.selected = {};

    vm.data.filters = monitorService.getFilters().operative;
    vm.data.selected.groupingView = vm.data.filters.groupingView[0].value;
    vm.data.selected.queryMode = vm.data.filters.queryMode[0].value;

    var params = {};
    params.groupingView = 0;
    params.queryMode = 0;
    operativeMonitorService.getMonitorsList(params);

    console.log(vm.data.filters);
    var options = {
        date: new Date(),
        mode: 'date', // or 'time'
        minDate: new Date() - 10000,
        allowOldDates: true,
        allowFutureDates: false,
        doneButtonLabel: 'DONE',
        doneButtonColor: '#F2F3F4',
        cancelButtonLabel: 'CANCEL',
        cancelButtonColor: '#000000'
      };

      document.addEventListener("deviceready", function () {

        $cordovaDatePicker.show(options).then(function(date){
            alert(date);
        });

      }, false);

  }

})();
