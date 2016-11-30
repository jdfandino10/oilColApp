/**
 * Created by d.althviz10 on 23/10/2016.
 * Based on https://github.com/angyjoe/eventual
 */
(function (ng) {

    var mod = ng.module("regionModule");

// the list controller
    mod.controller("regionListCtrl", ["$scope", "$resource", "apiUrl", "$window",
      function($scope, $resource, apiUrl, $window) {
        var Regiones = $resource(apiUrl + "/regiones"); // a RESTful-capable resource object
        $scope.regiones = Regiones.query(); // for the list of regiones in public/html/main.html
        //$scope.regiones = [{"id":1,"nombre":"Ejemplo","area":12}];
        $scope.refresh = function(){
          $window.location.reload(true);
        };
        $scope.doRefresh = function() {
          var Regiones = $resource(apiUrl + "/regiones"); // a RESTful-capable resource object
          $scope.regiones = Regiones.query(); // for the list of regiones in public/html/main.html
          //$scope.regiones = [{"id":1,"nombre":"Ejemplo","area":12}];
        };

    }]);

// the create controller
    mod.controller("regionCreateCtrl", ["$scope", "$resource", "$timeout", "apiUrl","$location",
      function($scope, $resource, $timeout, apiUrl, $location) {
        // to save a region
        $scope.save = function(region) {
            var CreateRegion = $resource(apiUrl +"/regiones"); // a RESTful-capable resource object
            console.log(region);
            CreateRegion.save(region); // $scope.region comes from the detailForm in public/html/detail.html
            $timeout(function() { $scope.go('/region'); }); // go back to public/html/main.html
        };
        $scope.go = function(path) {
          $location.path(path);
        };
    }]);

// the edit controller
    mod.controller("regionEditCtrl", ["$scope", "$resource", "$stateParams", "$timeout", "apiUrl","$location",
      function($scope, $resource, $stateParams, $timeout, apiUrl, $location) {

        $scope.tipos_sensor = ['Fluido', 'Energia', 'Temperatura', 'Emergencia'];

        var SensorMas = $resource(apiUrl +"/regiones/:id/sensormasfrecuente", {id:"@id"}); // a RESTful-capable resource object
        if ($stateParams.id) {
            $scope.sensormasfrecuente = SensorMas.get({id: $stateParams.id});
        }

        var ShowRegion = $resource(apiUrl +"/regiones/:id", {id:"@id"}); // a RESTful-capable resource object
       console.log($stateParams.id)
        if ($stateParams.id) {
            // retrieve the corresponding celebrity from the database
            // $scope.region.id is now populated so the Delete button will appear in the detailForm in public/html/detail.html
            $scope.region = ShowRegion.get({id: $stateParams.id});
            $scope.region.$promise.then(function(result){
              $scope.region = result;
              console.log($scope.region);
            });
            $scope.dbContent = ShowRegion.get({id: $stateParams.id}); // this is used in the noChange function
        }


        // decide whether to enable or not the button Save in the detailForm in public/html/detail.html
        $scope.noChange = function() {
            return angular.equals($scope.region, $scope.dbContent);
        };

        // to update a region
        $scope.save = function() {
            var UpdateRegion = $resource(apiUrl +"/regiones/" + $stateParams.id,null,{update:{method:'PUT'}}); // a RESTful-capable resource object
            $scope.regionSinCampos = {
                "id":$scope.region.id,
                "nombre":$scope.region.nombre,
                "area":$scope.region.area
            };
            UpdateRegion.update($scope.regionSinCampos); // $scope.celebrity comes from the detailForm in public/html/detail.html
            $timeout(function() { $scope.go('/region'); }); // go back to public/html/main.html
        };

        // to delete a region
        $scope.delete = function() {
            var DeleteRegion = $resource( apiUrl +"/regiones/" + $stateParams.id); // a RESTful-capable resource object
            DeleteRegion.delete();
            $timeout(function() { $scope.go('/region'); }); // go back to public/html/main.html
        };
        $scope.go = function(path) {
          $location.path(path);
        };

    }]);

})(window.angular)
