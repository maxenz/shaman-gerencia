(function(){

  angular
  .module('shaman.services')
  .factory('loginService', loginService);

  loginService.$inject = [
    'URLS',
    'utilsService',
    '$http'
  ];

  function loginService(
    URLS,
    utilsService,
    $http
  ) {

    var service = {
      login               : login,
      data                : {},
      loadUserCredentials : loadUserCredentials
    };

    return service;

    function login (userData) {

      var url = URLS.login
      + 'soap_method=LoginMobileGerencial'
      + '&pIde=' + userData.userName
      + '&pPsw=' + userData.password;

      return $http.get(url);
    }

    function loadUserCredentials() {
      var token = window.localStorage.getItem('r4c1ng');
      if (token) {
        service.data.isAuthenticated = true;
      }
    }


  }

}());
