(function(){

  angular
  .module('shaman.services')
  .factory('operativeMonitorService', operativeMonitorService);

  operativeMonitorService.$inject = [
    'URLS',
    '$http',
    'utilsService',
    '$log'
  ];

  function operativeMonitorService(
    URLS,
    $http,
    utilsService,
    $log
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

      var soapMethodList   = 'soap_method=GetMonitorArmadoOperativo';
      var soapMethodDetail = 'soap_method=GetMonitorArmadoOperativoDetalle';
      var pView            = '&pAgp=' + params.groupingView;
      var pMode            = '&pModCal=' + params.queryMode;
      var pDate            = '&pFhrQry=' + pDateTime;

      var promiseList      = utilsService.getPromise(URLS.operativeGrid + soapMethodList + pView + pMode + pDate);
      var promiseDetail    = utilsService.getPromise(URLS.operativeGrid + soapMethodDetail + pView + pMode + pDate);
      var promises         = { list: promiseList, detail: promiseDetail};

      return utilsService.executeMultipleRequests(promises);

    }

    function parseMonitorsList(response) {

      service.chartData    = [];
      service.chartLabels  = [];
      var jsonMonitorsList = utilsService.xmlToJsonResponse(response.list.data);
      service.monitors     = jsonMonitorsList.getMonitorArmadoOperativoResponse
      .getMonitorArmadoOperativoResult.diffgram.defaultDataSet.sQL;

      console.log(service.monitors);

      var jsonMonitorsDetailList = utilsService.xmlToJsonResponse(response.detail.data);
      var detail = jsonMonitorsDetailList.getMonitorArmadoOperativoDetalleResponse
      .getMonitorArmadoOperativoDetalleResult.diffgram.defaultDataSet.sQL;
      setDetailsToMonitorList(detail);

    }

    function setDetailsToMonitorList(detail) {

      for (var i = 0; i < service.monitors.length; i++) {
        setMonitorDataForChart(i);
        service.monitors[i].tipoMovil = parsedTipoMovil(service.monitors[i]);
        service.monitors[i].detail = [];
        service.monitors[i].lessThan90PercentAccordance = parseInt(service.monitors[i].conformidad) < 90;
        for (var j = 0; j < detail.length; j++) {
          var status = getActiveImageIcon(detail[j]);
          detail[j].activeImageIcon = status.image;
          detail[j].statusDescription = status.description;
          if (detail[j].tipoMovilId === service.monitors[i].id) {
            service.monitors[i].detail.push(detail[j]);
          }
        }
      }

    }

    function parsedTipoMovil(monitor) {

      if (monitor.tipoMovil.indexOf('-') > -1) {
        var splitted = monitor.tipoMovil.split('-');
        var description = utilsService.capitalizeFirstLetter(splitted[1].toLowerCase().trim());
        var category = splitted[0];
        return category + ' - ' + description;
      }
      return utilsService.capitalizeFirstLetter(monitor.tipoMovil.toLowerCase().trim());

    }

    function getActiveImageIcon(detail) {
      var status = {};
      switch (parseInt(detail.activo)) {
        case 0:
        status.image = "ion-close-circled color-assertive";
        status.description = "Inactivo";
        break;
        case 1:
        status.image =  "ion-checkmark-circled color-balanced";
        status.description = "Activo";
        break;
        case 2:
        status.image =  "ion-calendar color-positive";
        status.description = "A contratar";
        break;
        case 3:
        status.image =  "ion-refresh color-positive";
        status.description = "Otra modalidad";
        break;
      }
      return status;
    }

    function setMonitorDataForChart(i) {
      service.chartData.push(parseInt(service.monitors[i].conformidad));
      service.chartLabels.push(service.monitors[i].tipoMovil);
    }

  }

}());
