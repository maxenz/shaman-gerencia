(function(){

  // --> Este servicio lo uso para traer datos basicos fijos que necesite
  // --> para todos los monitores

  angular
  .module('shaman.services')
  .factory('monitorService', monitorService);

  function monitorService() {

    var service = {
      getFilters : getFilters
    };

    return service;

    function getFilters () {

      var filters = {};

      // --> Filtros de armado operativo
      filters.operative = {};
      // --> Filtros de agrupacion de la vista
      filters.operative.groupingView = [];
      filters.operative.groupingView.push({ value: 0, name: 'Tipo de Móvil', default: true});
      filters.operative.groupingView.push({ value: 1, name: 'Proyecto', default: false});
      filters.operative.groupingView.push({ value: 2, name: 'Coordinaciones', default: false});

      // --> Filtros de modo de consulta
      filters.operative.queryMode = [];
      filters.operative.queryMode.push({ value: 0, name: 'Horarios pactados', default: true});
      filters.operative.queryMode.push({ value: 1, name: 'Horarios presupuestados', default: false});

      return filters;

    }


  }


}());
