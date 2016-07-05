(function(){

  // --> Este servicio lo uso para traer datos basicos fijos que necesite
  // --> para todos los monitores

  angular
  .module('shaman.services')
  .factory('monitorService', monitorService);

  monitorService.$inject = [
    'URLS',
    'utilsService',
    '$http'
  ];

  function monitorService(
    URLS,
    utilsService,
    $http
  ) {

    var service = {
      setFilters       : setFilters,
      getMobileTypes   : getMobileTypes,
      parseMobileTypes : parseMobileTypes
    };

    return service;

    function setFilters () {

      service.filters = {};

      // --> Filtros de armado operativo
      service.filters.operative = new Object();
      // --> Filtros de agrupacion de la vista
      service.filters.operative.groupingView = [];
      service.filters.operative.groupingView.push({ value: 0, name: 'Tipo de Móvil', default: true});
      service.filters.operative.groupingView.push({ value: 1, name: 'Proyecto', default: false});
      service.filters.operative.groupingView.push({ value: 2, name: 'Coordinaciones', default: false});

      // --> Filtros de modo de consulta
      service.filters.operative.queryMode = [];
      service.filters.operative.queryMode.push({ value: 0, name: 'Horarios pactados', default: true});
      service.filters.operative.queryMode.push({ value: 1, name: 'Horarios presupuestados', default: false});

      // ---------- FIN DE FILTROS ARMADO OPERATIVO ---------- //

      // --> Filtros de mobiles budget

      service.filters.mobilesBudget = new Object();

      service.filters.mobilesBudget.analyze = [];
      service.filters.mobilesBudget.analyze.push({ value:0, name: 'Presupuesto' });
      service.filters.mobilesBudget.analyze.push({ value:1, name: 'Pactados' });

      service.filters.mobilesBudget.projects = [];
      service.filters.mobilesBudget.projects.push({ value:0, name: 'No'});
      service.filters.mobilesBudget.projects.push({ value:0, name: 'Si'});

      setMobileTypesFilters();

    }

    function getMobileTypes() {

      var url = URLS.operativeGrid + 'soap_method=GetTiposMoviles';

      return $http.get(url).then(function(response){
        return response.data;
      });

    }

    function parseMobileTypes(response) {

      var json                = utilsService.xmlToJsonResponse(response);
      service.mobileTypes     = json.getTiposMovilesResponse.getTiposMovilesResult.diffgram.defaultDataSet.sQL;

    }

    function setMobileTypesFilters(){

      service.filters.mobilesBudget.mobileTypes = [];
      for (var i = 0; i < service.mobileTypes.length; i++) {
        service.filters.mobilesBudget.mobileTypes.push({ value: service.mobileTypes[i].id, name: service.mobileTypes[i].descripcion});
      }

    }

  }

}());
