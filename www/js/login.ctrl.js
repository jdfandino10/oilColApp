/**
 * Created by d.althviz10 on 23/10/2016.
 * Based on https://github.com/angyjoe/eventual
 */
(function (ng) {

  var mod = ng.module("loginModule");

  mod.controller('logCtrl', function($scope, $ionicModal, $timeout, $location, $http) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.modal.show();
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
      $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function() {
      $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
      console.log('Doing login', $scope.loginData);

      // Simulate a login delay. Remove this and replace with your login
      // code if using a login system
      $scope.logIN = true;

      $timeout(function() {
        var login = $http({url:'http://172.24.42.110:9000/login',method:'POST',
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          transformRequest: function(obj) {
            var str = [];
            for(var p in obj)
              str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            return str.join("&");
          },data:{email:$scope.loginData.username,
            password:$scope.loginData.password}})
        console.log(login);
        login.then(function(response)
        {
          console.log(response);
          $scope.closeLogin();
          $location.path('/region')

        });
      }, 1000);
    };

    $scope.logout = function()
    {
      var logout = $http({url:'http://172.24.42.110:9000/logout',method:'GET' })
      console.log(logout);
      logout.then(function(response){
      $scope.logIN = false;
      $location.path('/login');
      $scope.login();
      });
      //Deberia de usarse una promesa con $resource segun la petición de cerrar sesión que se haga
    };

  })


})(window.angular)
