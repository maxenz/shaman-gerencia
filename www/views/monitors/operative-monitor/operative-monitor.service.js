(function(){

  angular
  .module('shaman.services')
  .factory('operativeMonitorService', operativeMonitorService);

  operativeMonitorService.$inject = [
    'URLS',
    '$http',
    'utilsService'
  ];

  function operativeMonitorService(
    URLS,
    $http,
    utilsService
  ) {

    var service = {
      getMonitorsList : getMonitorsList
    };

    return service;

    function getMonitorsList (params) {

      var soap_method = 'soap_method=GetMonitorArmadoOperativo';
      var pView = '&pAgp=' + params.groupingView;
      var pMode = '&pModCal=' + params.queryMode;
      var pDate = '&pFhrQry=';

      var url = URLS.operativeGrid + soap_method + pView + pMode + pDate;

      $http.get(url)
      .then(
        function(response) {
          var responseParsed = utilsService.toCamel($.xml2json(response.data));
          var responseMonitor = responseParsed.body.getMonitorArmadoOperativoResponse;
          var monitors = responseMonitor.getMonitorArmadoOperativoResult.diffgram.defaultDataSet.sQL;
          console.log(monitors);
          return monitors;
        }
      );
    }


  }


}());
