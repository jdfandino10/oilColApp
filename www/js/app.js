
//setup angular
var app = angular.module('starter',['ionic', 'ngResource', 'ngRoute', 'regionModule', 'campoModule', 'pozoModule', 'sensorModule', 'loginModule']);

app.constant('apiUrl', '/api');

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
});
/*
app.config(['$routeProvider', function($routeProvider) {
    return $routeProvider.when('/inicio',
      {templateUrl:'inicio'
    }).when('/login',
      {redirectTo: '/login',
    }).when('/signup',
      {redirectTo: '/signup'
    }).when('/logout',
      {redirectTo: '/logout'
    }).when('/profile',
      {redirectTo: '/profile'
    }).when('/accounts/add',
      {redirectTo: '/accounts/add'
    }).otherwise({
      redirectTo: 'inicio'
    });
  }
  ]);
*/
app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('default', {
    url: '',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'logCtrl'
  })

  .state('default.region', {
    url: '/region',
    views: {
      'menuContent': {
        templateUrl: 'templates/region-main.html',
        controller: 'regionListCtrl'
      }
    }
  })

  .state('default.regionCreate', {
    url: '/region/create',
    views: {
      'menuContent': {
        templateUrl: 'templates/region-detail.html',
        controller: 'regionCreateCtrl'
      }
    }
  })

  .state('default.regionEdit', {
      url: '/region/edit/:id',
      views: {
        'menuContent': {
         templateUrl: 'templates/region-detail.html',
         controller: 'regionEditCtrl'
       }
     }
  })
  .state('default.campo', {
    url: '/campo',
    views: {
      'menuContent': {
        templateUrl: 'templates/campo-main.html',
        controller: 'campoListCtrl'
      }
    }
  })

  .state('default.campoCreate', {
    url: '/region/:id/campo/create',
    views: {
      'menuContent': {
        templateUrl: 'templates/campo-detail.html',
        controller: 'campoCreateCtrl'
      }
    }
  })

  .state('default.campoEdit', {
      url: '/campo/edit/:id',
      views: {
        'menuContent': {
         templateUrl: 'templates/campo-detail.html',
         controller: 'campoEditCtrl'
       }
     }
  })

  .state('default.campoCreate2', {
    url: '/campo/create',
    views: {
      'menuContent': {
        templateUrl: 'templates/campo-detail.html',
        controller: 'campoCreateCtrl'
      }
    }
  })
  
  .state('default.pozo', {
    url: '/pozo',
    views: {
      'menuContent': {
        templateUrl: 'templates/pozo-main.html',
        controller: 'pozoListCtrl'
      }
    }
  })

  .state('default.pozoCreate', {
    url: '/campo/:id/pozo/create',
    views: {
      'menuContent': {
        templateUrl: 'templates/pozo-detail.html',
        controller: 'pozoCreateCtrl'
      }
    }
  })

  .state('default.pozoEdit', {
      url: '/pozo/edit/:id',
      views: {
        'menuContent': {
         templateUrl: 'templates/pozo-detail.html',
         controller: 'pozoEditCtrl'
       }
     }
  })

  .state('default.sensor', {
    url: '/sensor',
    views: {
      'menuContent': {
        templateUrl: 'templates/sensor-main.html',
        controller: 'sensorListCtrl'
      }
    }
  })

  .state('default.sensorCreate', {
    url: '/pozo/:id/sensor/create',
    views: {
      'menuContent': {
        templateUrl: 'templates/sensor-detail.html',
        controller: 'sensorCreateCtrl'
      }
    }
  })

  .state('default.sensorEdit', {
      url: '/sensor/edit/:id',
      views: {
        'menuContent': {
         templateUrl: 'templates/sensor-detail.html',
         controller: 'sensorEditCtrl'
       }
     }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/region');
});

app.config([
    '$locationProvider', function($locationProvider) {
      return $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
      }).hashPrefix('!'); // enable the new HTML5 routing and history API
      // return $locationProvider.html5Mode(true).hashPrefix('!'); // enable the new HTML5 routing and history API
    }]);

app.controller('AppCtrl', ['$scope', 'ionicModal', '$location', function ($scope, $ionicModal, $location) {
    $scope.go = function(path) {
      $location.path(path);
    };

}]);
