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

      var uniqueProjects = getUniqueProjects();

      var chart = getChartArray(uniqueProjects);

      setSeriesDataInChart(chart);

      parseDataForChart(chart);

    }

    function getUniqueProjects() {

      var chartLabels = [];
      for (var i = 0; i < service.mobiles.length; i++) {
        var proyecto = service.mobiles[i].proyecto;
        if (proyecto) chartLabels.push(proyecto);
      }

      return utilsService.uniqueArray(chartLabels);
    }

    function getChartArray(uniqueProjects) {
      var chart = [];
      for (var i = 0; i < uniqueProjects.length ; i++) {
        var obj = new Object();
        obj.proyecto = uniqueProjects[i];
        obj.espServicios = 0;
        obj.opeServicios = 0;
        chart.push(obj);
      }

      return chart;
    }

    function setSeriesDataInChart(chart) {
      for (var i = 0; i < service.mobiles.length; i++) {
        for (var j = 0; j < chart.length; j++) {
          if (chart[j].proyecto === service.mobiles[i].proyecto) {
            chart[j].espServicios =+ service.mobiles[i].espServicios;
            chart[j].opeServicios =+ service.mobiles[i].opeServicios;
          }
        }
      }
    }

    function parseDataForChart(chart) {

      service.chartLabels = [];
      service.chartEspServicios = [];
      service.chartOpeServicios = [];

      for (var i = 0; i < chart.length; i++) {
        var proyectName = chart[i].proyecto.split(")")[1];
        service.chartLabels.push(proyectName);
        service.chartEspServicios.push(chart[i].espServicios);
        service.chartOpeServicios.push(chart[i].opeServicios);
      }
      
    }

  }

}());
