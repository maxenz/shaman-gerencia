(function(){

  angular
  .module('shaman.services')
  .factory('quotaBenefitsService', quotaBenefitsService);

  quotaBenefitsService.$inject = [
    'URLS',
    '$http',
    'utilsService',
    '$log'
  ];

  function quotaBenefitsService(
    URLS,
    $http,
    utilsService,
    $log
  ) {

    var service = {
      getClients         : getClients,
      parseClients       : parseClients,
      dataForActivity    : []
    };

    return service;

    function getClients (params) {

      var formattedDateSince = moment(params.dateSince).format('YYYYMMDD');
      var formattedDateTo    = moment(params.dateTo).format('YYYYMMDD');

      var soapMethod   = 'soap_method=GetMonitorTopesEntidades';
      var pDateSince   = '&pFecDes=' + formattedDateSince;
      var pDateTo      = '&pFecHas=' + formattedDateTo;
      var url          = URLS.monitors + soapMethod + pDateSince + pDateTo;
      var promise      = utilsService.getPromise(url);
      var promises     = { clients: promise };

      return utilsService.executeMultipleRequests(promises);

    }

    function parseClients(response) {

      var jsonMonitorsList       = utilsService.xmlToJsonResponse(response.clients.data);
      service.clients            = jsonMonitorsList.getMonitorTopesEntidadesResponse
      .getMonitorTopesEntidadesResult.diffgram.defaultDataSet.sQL;

      setChartData();

    }

    function setChartData() {

      service.chartLabels = [];
      service.chartData   = [];

      if (service.clients) {
        service.clients.forEach(function(client){
          service.chartLabels.push(client.cliente);
          service.chartData.push(parseFloat(client.desvio));
        });
      }

    }

  }

}());
