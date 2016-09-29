(function () {

  'use strict';

  angular.module('shaman.controllers')

  .controller('LoginCtrl', LoginCtrl);

  LoginCtrl.$inject = [
    'loginService',
    '$state',
    '$ionicPopup',
    'utilsService'
  ]

  function LoginCtrl(
    loginService,
    $state,
    $ionicPopup,
    utilsService
  ) {

    var vm = this;
    vm.login = login;
    vm.data = {};

    function login() {

      if (validate()) {

      loginService.login(vm.data).success(function(response) {

        var json                = utilsService.xmlToJsonResponse(response);
        var result              = json.loginMobileGerencialResponse.loginMobileGerencialResult.diffgram.defaultDataSet.sQL;

        if (result) {

          window.localStorage.setItem("r4c1ng", result.id + "&r4c1ng");
          loginService.data.isAuthenticated = true;
          loginService.data.authData = result;
          $state.go('tab.monitors');

        } else {

          var alertPopup = $ionicPopup.alert({
            title: 'Datos incorrectos!',
            template: 'Por favor, ingrese los datos correctamente.'
          });

          vm.data.password = '';
        }

      }).error(function(data) {

        var alertPopup = $ionicPopup.alert({
          title: 'Error de conexión!',
          template: 'Vuelva a intentar luego.'
        });

      });

      }

    }

    function validate() {
      if (!vm.data.userName || !vm.data.password) {
        var alertPopup = $ionicPopup.alert({
          title: 'Error!',
          template: 'Debe ingresar usuario y apellido.'
        });
        return false;
      }

      return true;

    }


  }

})();
