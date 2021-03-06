
//setup angular
var app = angular.module('starter',['ionic', 'ngResource', 'ngRoute',
  'regionModule', 'campoModule', 'pozoModule', 'sensorModule', 'loginModule']);

app.constant('apiUrl', 'http://172.24.42.110:9000/api')
.constant('USER_ROLES',{admin:'admin',user:'user'})
.constant('AUTH_EVENTS', {
  loginSuccess : 'auth-login-success',
  loginFailed : 'auth-login-failed',
  logoutSuccess : 'auth-logout-success',
  sessionTimeout : 'auth-session-timeout',
  notAuthenticated : 'auth-not-authenticated',
  notAuthorized : 'auth-not-authorized'
});

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
app.config(function($stateProvider, $urlRouterProvider, USER_ROLES) {
  $stateProvider



  .state('app', {
    url: '',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'logCtrl'
  })


    .state('app.login', {
      url: '/login',
      views:{
       'menuContent':{
         templateUrl: 'templates/inicio.html',
       }
      },controller: 'logCtrl'
    })

    .state('app.region', {
    url: '/region',
    views: {
      'menuContent': {
        templateUrl: 'templates/region-main.html',
        controller: 'regionListCtrl',
        data: {
          authorizedRoles: [USER_ROLES.admin, USER_ROLES.user]
        }
      }
    }
  })

  .state('app.regionCreate', {
    url: '/region/create',
    views: {
      'menuContent': {
        templateUrl: 'templates/region-detail.html',
        controller: 'regionCreateCtrl',
        data: {
          authorizedRoles: [USER_ROLES.admin]
        }
      }
    }
  })

  .state('app.regionEdit', {
      url: '/region/edit/:id',
      views: {
        'menuContent': {
         templateUrl: 'templates/region-detail.html',
         controller: 'regionEditCtrl',
          data: {
            authorizedRoles: [USER_ROLES.admin, USER_ROLES.user]
          }
       }
     }
  })
  .state('app.campo', {
    url: '/campo',
    views: {
      'menuContent': {
        templateUrl: 'templates/campo-main.html',
        controller: 'campoListCtrl',
        data: {
          authorizedRoles: [USER_ROLES.admin, USER_ROLES.user]
        }
      }
    }
  })

  .state('app.campoCreate', {
    url: '/region/:id/campo/create',
    views: {
      'menuContent': {
        templateUrl: 'templates/campo-detail.html',
        controller: 'campoCreateCtrl',
        data: {
          authorizedRoles: [USER_ROLES.admin]
        }
      }
    }
  })

  .state('app.campoEdit', {
      url: '/campo/edit/:id',
      views: {
        'menuContent': {
         templateUrl: 'templates/campo-detail.html',
         controller: 'campoEditCtrl',
          data: {
            authorizedRoles: [USER_ROLES.admin, USER_ROLES.user]
          }
       }
     }
  })

  .state('app.campoCreate2', {
    url: '/campo/create',
    views: {
      'menuContent': {
        templateUrl: 'templates/campo-detail.html',
        controller: 'campoCreateCtrl',
        data: {
          authorizedRoles: [USER_ROLES.admin]
        }
      }
    }
  })

  .state('app.pozo', {
    url: '/pozo',
    views: {
      'menuContent': {
        templateUrl: 'templates/pozo-main.html',
        controller: 'pozoListCtrl',
        data: {
          authorizedRoles: [USER_ROLES.admin, USER_ROLES.user]
        }
      }
    }
  })

  .state('app.pozoCreate', {
    url: '/campo/:id/pozo/create',
    views: {
      'menuContent': {
        templateUrl: 'templates/pozo-detail.html',
        controller: 'pozoCreateCtrl',
        data: {
          authorizedRoles: [USER_ROLES.admin]
        }
      }
    }
  })

  .state('app.pozoEdit', {
      url: '/pozo/edit/:id',
      views: {
        'menuContent': {
         templateUrl: 'templates/pozo-detail.html',
         controller: 'pozoEditCtrl',
          data: {
            authorizedRoles: [USER_ROLES.admin, USER_ROLES.user]
          }
       }
     }
  })

  .state('app.sensor', {
    url: '/sensor',
    views: {
      'menuContent': {
        templateUrl: 'templates/sensor-main.html',
        controller: 'sensorListCtrl',
        data: {
          authorizedRoles: [USER_ROLES.admin, USER_ROLES.user]
        }
      }
    }
  })

  .state('app.sensorCreate', {
    url: '/pozo/:id/sensor/create',
    views: {
      'menuContent': {
        templateUrl: 'templates/sensor-detail.html',
        controller: 'sensorCreateCtrl',
        data: {
          authorizedRoles: [USER_ROLES.admin]
        }
      }
    }
  })

  .state('app.sensorEdit', {
      url: '/sensor/edit/:id',
      views: {
        'menuContent': {
         templateUrl: 'templates/sensor-detail.html',
         controller: 'sensorEditCtrl',
          data: {
            authorizedRoles: [USER_ROLES.admin, USER_ROLES.user]
          }
       }
     }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});

app.config([
    '$locationProvider', function($locationProvider) {
      return $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
      }).hashPrefix('!'); // enable the new HTML5 routing and history API
      // return $locationProvider.html5Mode(true).hashPrefix('!'); // enable the new HTML5 routing and history API
    }]).
config(['$httpProvider', function($httpProvider){
$httpProvider.defaults.withCredentials = true;
}]);

app.controller('AppCtrl', ['$scope', 'ionicModal', '$location', function ($scope, $ionicModal, $location) {
    $scope.go = function(path) {
      $location.path(path);
    };

}]);
