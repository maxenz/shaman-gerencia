(function () {

  'use strict';

  angular.module('shaman.controllers')

  .controller('OperativeMonitorFilterCtrl', OperativeMonitorFilterCtrl);

  OperativeMonitorFilterCtrl.$inject = [
    '$scope',
    '$ionicTabsDelegate',
    '$cordovaDatePicker'
  ]

  function OperativeMonitorFilterCtrl(
    $scope,
    $ionicTabsDelegate,
    $cordovaDatePicker,
    $stateParams
  ) {

    var vm = this;
    vm.data = {};
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
