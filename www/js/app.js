// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('shaman', [
  'ionic',
  'shaman.controllers',
  'shaman.services',
  'shaman.directives',
  'ngCordova',
  'angularMoment',
  'chart.js'
])

.run(function($ionicPlatform, loginService) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

  loginService.loadUserCredentials();

})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  $ionicConfigProvider.tabs.position('bottom');

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'views/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.monitors', {
    url: '/monitors',
    views: {
      'monitors': {
        templateUrl: 'views/monitors/monitors.template.html',
        controller: 'MonitorsCtrl'
      }
    }
  })

  .state('tab.monitors-details', {
    url: '/monitors/:monitorId',
    views: {
      'monitors': {
        templateUrl: 'views/monitors/detail/monitor-detail.template.html',
        controller: 'MonitorDetailCtrl',
        controllerAs : 'monitorDetailCtrl',
        resolve: {
          _mobileTypes : function(monitorService) {
            return monitorService.getMobileTypes();
          }
        }
      }
    }
  })

  .state('tab.alerts', {
    url: '/alerts',
    views: {
      'alerts': {
        templateUrl: 'views/alerts/alerts.template.html',
        controller: 'AlertsCtrl'
      }
    }
  })

  .state('tab.operative', {
    url: '/operative',
    views: {
      'operative': {
        templateUrl: 'views/operative/operative.template.html',
        controller: 'OperativeCtrl'
      }
    }
  })

  .state('tab.settings', {
    url: '/settings',
    views: {
      'settings': {
        templateUrl: 'views/settings/settings.template.html',
        controller: 'SettingsCtrl'
      }
    }
  })

  .state('login', {
    url: '/login',
    templateUrl: 'views/login/login.template.html',
    controller: 'LoginCtrl',
    controllerAs: 'loginCtrl'
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/monitors');

});
