(function(){

  angular
  .module('shaman.services')
  .factory('utilsService', utilsService);

  utilsService.$inject = [
    '$ionicPopup',
    '$ionicLoading'
  ];

  function utilsService($ionicPopup, $ionicLoading) {

    var service = {
      toCamel     : toCamel,
      showAlert   : showAlert,
      showLoading : showLoading
    };

    return service;

    function toCamel(o) {
      var build, key, destKey, value;

      if (o instanceof Array) {
        build = [];
        for (key in o) {
          value = o[key];

          if (typeof value === "object") {
            value = toCamel(value);
          }
          build.push(value);
        }
      } else {
        build = {};
        for (key in o) {
          if (o.hasOwnProperty(key)) {
            if (key !== 'ID') {
              destKey = (key.charAt(0).toLowerCase() + key.slice(1) || key).toString();
            } else {
              destKey = 'id';
            }
            value = o[key];
            if (value !== null && typeof value === "object") {
              value = toCamel(value);
            }

            build[destKey] = value;
          }
        }
      }
      return build;
    }

    function showAlert(title, message) {
      $ionicPopup.alert({
        title : title,
        template: message
      });
    }

    function showLoading(template) {
      $ionicLoading.show({
        template: template
      });
    }

  }

}());
