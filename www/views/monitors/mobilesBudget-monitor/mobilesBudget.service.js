(function(){

  angular
  .module('shaman.services')
  .factory('mobilesBudgetService', mobilesBudgetService);

  mobilesBudgetService.$inject = [
    'URLS',
    '$http',
    'utilsService',
    '$log'
  ];

  function mobilesBudgetService(
    URLS,
    $http,
    utilsService,
    $log
  ) {

    var service = {
      getMobiles         : getMobiles,
      parseMobiles       : parseMobiles
    };

    return service;

    function getMobiles (params) {

      var formattedDateSince = moment(params.dateSince).format('YYYYMMDD');
      var formattedDateTo    = moment(params.dateTo).format('YYYYMMDD');

      var soapMethod   = 'soap_method=GetMonitorPresupuestoMoviles';
      var pDateSince   = '&pFecDes=' + formattedDateSince;
      var pDateTo      = '&pFecHas=' + formattedDateTo;
      var pAnalyze     = '&pAnlVer=' + params.analyze;
      var pMobileType  = '&pTmvSel=' + (params.mobileType ? params.mobileType : 0);
      var pProject     = '&pConPry=' + params.project;
      var url          = URLS.operativeGrid + soapMethod + pDateSince + pDateTo + pAnalyze + pMobileType + pProject;
      var promise      = utilsService.getPromise(url);
      var promises     = { mobiles: promise };

      return utilsService.executeMultipleRequests(promises);

    }

    function parseMobiles(response) {

      service.chartDataRealized  = [];
      service.chartDataObjective = [];
      service.chartLabels        = [];
      var jsonMonitorsList       = utilsService.xmlToJsonResponse(response.mobiles.data);
      service.mobiles            = jsonMonitorsList.getMonitorPresupuestoMovilesResponse
      .getMonitorPresupuestoMovilesResult.diffgram.defaultDataSet.sQL;
      setChartData();

    }

    // function parseMobiles(monitor) {
    //
    //   if (monitor.tipoMovil.indexOf('-') > -1) {
    //     var splitted = monitor.tipoMovil.split('-');
    //     var description = utilsService.capitalizeFirstLetter(splitted[1].toLowerCase().trim());
    //     var category = splitted[0];
    //     return category + ' - ' + description;
    //   }
    //   return utilsService.capitalizeFirstLetter(monitor.tipoMovil.toLowerCase().trim());
    //
    // }
    //

    function setChartData() {
      for (var i = 0; i < service.mobiles.length; i++) {
        service.chartDataObjective.push(parseInt(service.mobiles[i].espServicios));
        service.chartDataRealized.push(parseInt(service.mobiles[i].opeServicios));
        service.chartLabels.push(service.mobiles[i].proyecto);
      }

    }

  }

}());
