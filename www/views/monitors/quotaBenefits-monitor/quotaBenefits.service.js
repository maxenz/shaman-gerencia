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
      console.log(service.clients);
      //setChartData();

    }

    // function setChartData() {
    //
    //   var uniqueProjects = getUniqueProjects();
    //   var chart = getChartArray(uniqueProjects);
    //   setSeriesDataInChart(chart);
    //   parseDataForChart(chart);
    //
    // }
    //
    // function getUniqueProjects() {
    //
    //   var chartLabels = [];
    //   for (var i = 0; i < service.mobiles.length; i++) {
    //     var proyecto = service.mobiles[i].proyecto;
    //     if (proyecto) chartLabels.push(proyecto);
    //   }
    //
    //   return utilsService.uniqueArray(chartLabels);
    // }
    //
    // function getChartArray(uniqueProjects) {
    //   var chart = [];
    //   for (var i = 0; i < uniqueProjects.length ; i++) {
    //     var obj = new Object();
    //     obj.proyecto = uniqueProjects[i];
    //     obj.espServicios = 0;
    //     obj.opeServicios = 0;
    //     obj.desvio       = 0;
    //     obj.cantMoviles  = 0;
    //     obj.detail       = [];
    //     chart.push(obj);
    //   }
    //
    //   return chart;
    // }
    //
    // function setSeriesDataInChart(chart) {
    //   for (var i = 0; i < service.mobiles.length; i++) {
    //     for (var j = 0; j < chart.length; j++) {
    //       if (chart[j].proyecto === service.mobiles[i].proyecto) {
    //         chart[j].espServicios += parseFloat(service.mobiles[i].espServicios);
    //         chart[j].opeServicios += parseFloat(service.mobiles[i].opeServicios);
    //         chart[j].desvio       += parseFloat(service.mobiles[i].desvio);
    //         chart[j].cantMoviles++;
    //         chart[j].detail.push(service.mobiles[i]);
    //       }
    //     }
    //   }
    //
    //   for (var k = 0; k < chart.length; k++) {
    //     var desvio = chart[k].desvio;
    //     chart[k].desvio = desvio / chart[k].cantMoviles;
    //   }
    //
    //   service.dataForActivity = chart;
    //
    //   }
    //
    //   function parseDataForChart(chart) {
    //
    //     service.chartLabels = [];
    //     service.chartEspServicios = [];
    //     service.chartOpeServicios = [];
    //
    //     for (var i = 0; i < chart.length; i++) {
    //       var proyectName = chart[i].proyecto.split(")")[1];
    //       service.chartLabels.push(proyectName);
    //       service.chartEspServicios.push(chart[i].espServicios);
    //       service.chartOpeServicios.push(chart[i].opeServicios);
    //     }
    //
    //   }

    }

  }());
