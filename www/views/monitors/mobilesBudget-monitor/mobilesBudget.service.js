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
      parseMobiles       : parseMobiles,
      dataForActivity    : []
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
        obj.desvio       = 0;
        obj.cantMoviles  = 0;
        obj.detail       = [];
        chart.push(obj);
      }

      return chart;
    }

    function setSeriesDataInChart(chart) {
      for (var i = 0; i < service.mobiles.length; i++) {
        for (var j = 0; j < chart.length; j++) {
          if (chart[j].proyecto === service.mobiles[i].proyecto) {
            chart[j].espServicios += parseFloat(service.mobiles[i].espServicios);
            chart[j].opeServicios += parseFloat(service.mobiles[i].opeServicios);
            chart[j].desvio       += parseFloat(service.mobiles[i].desvio);
            chart[j].cantMoviles++;
            chart[j].detail.push(service.mobiles[i]);
          }
        }
      }

      for (var k = 0; k < chart.length; k++) {
        var desvio = chart[k].desvio;
        chart[k].desvio = desvio / chart[k].cantMoviles;
      }

      service.dataForActivity = chart;

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
