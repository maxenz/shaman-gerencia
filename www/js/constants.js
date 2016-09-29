(function(){

  angular
  .module('shaman')
  .constant('URLS', {
    operativeGrid : 'http://paramedicapps.com.ar:57773/csp/shaman/WebServices.GrillaOperativa.cls?',
    login         : 'http://paramedicapps.com.ar:57773/csp/shaman/WebServices.WebApps.cls?',
    monitors      : 'http://paramedicapps.com.ar:57773/csp/shaman/WebServices.Monitores.cls?'
  });

})();
