(function(){

  angular
  .module('shaman.services')
  .factory('liquidationOfObjectivesMonitorService', liquidationOfObjectivesMonitorService);

  liquidationOfObjectivesMonitorService.$inject = [
    'URLS',
    '$http',
    'utilsService',
    '$log'
  ];

  function liquidationOfObjectivesMonitorService(
    URLS,
    $http,
    utilsService,
    $log
  ) {

    var service = {
      getMobiles      : getMobiles,
      parseMobiles    : parseMobiles,
    };

    return service;

    function getMobiles (params) {

      var formattedDateSince = moment(params.dateSince).format('YYYYMMDD');
      var formattedDateTo    = moment(params.dateTo).format('YYYYMMDD');

      var soapMethod   = 'soap_method=GetMonitorLiquidacionesObjetivos';
      var pDateSince   = '&pFecDes=' + formattedDateSince;
      var pDateTo      = '&pFecHas=' + formattedDateTo;
      var url          = URLS.monitors + soapMethod + pDateSince + pDateTo;
      var promise      = utilsService.getPromise(url);
      var promises     = { mobiles: promise };

      return utilsService.executeMultipleRequests(promises);

    }

    function parseMobiles(response) {

      var jsonMonitorsList       = utilsService.xmlToJsonResponse(response.mobiles.data);
      service.mobiles            = jsonMonitorsList.getMonitorLiquidacionesObjetivosResponse
      .getMonitorLiquidacionesObjetivosResult.diffgram.defaultDataSet.sQL;

      setChartData();

    }

    function setChartData() {

      service.chartLabels = [];
      service.chartLiq    = [];
      service.chartInc    = [];

      if (service.mobiles) {
        service.mobiles.forEach(function(mobile){
          service.chartLabels.push(mobile.movilId);
          service.chartLiq.push(parseFloat(mobile.cumplido));
          service.chartInc.push(parseFloat(mobile.cumplidoInc));
        });
      }

    }

  }

}());
