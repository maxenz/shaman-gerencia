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
      getMonitorsList   : getMonitorsList,
      parseMonitorsList : parseMonitorsList,
      monitors          : []
    };

    return service;

    function getMonitorsList (params) {

      var pDateTime = "";

      // --> Si el filtro de fecha no es el default, o sea, el actual ...
      if (params.actualDate) {
        var pDate = moment(params.actualDate).format('YYYY-MM-DD');
        var pTime = moment(params.actualTime).format('HH:mm:SS');
        pDateTime = pDate + ' ' + pTime;
      }

      var soap_method = 'soap_method=GetMonitorArmadoOperativo';
      var pView = '&pAgp=' + params.groupingView;
      var pMode = '&pModCal=' + params.queryMode;
      var pDate = '&pFhrQry=' + pDateTime;

      var url = URLS.operativeGrid + soap_method + pView + pMode + pDate;

      return $http.get(url);
    }

    function parseMonitorsList(response) {
      var responseParsed  = utilsService.toCamel($.xml2json(response.data));
      var responseMonitor = responseParsed.body.getMonitorArmadoOperativoResponse;
      var monitors        = responseMonitor.getMonitorArmadoOperativoResult.diffgram.defaultDataSet.sQL;
      service.monitors    = monitors;
    }


  }


}());
