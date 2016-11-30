/**
 * Created by d.althviz10 on 23/10/2016.
 * Based on https://github.com/angyjoe/eventual
 */
(function (ng) {

    var mod = ng.module("sensorModule");
    var tipoOr = ['Fluido', 'Energia', 'Temperatura', 'Emergencia'];
// the list controller
    mod.controller("sensorListCtrl", ["$scope", "$resource", "apiUrl", "$location",
      function($scope, $resource, apiUrl, $location) {
        var sensores = $resource(apiUrl + "/sensores"); // a RESTful-capable resource object
        $scope.sensores = sensores.query(); // for the list of sensores in public/html/main.html
        $scope.tipos= tipoOr;
        /*ESTO YA ESTABA COMENTADO
        //$scope.getMediciones = function(p){
          //  var mediciones = $resource(apiUrl +"/campos?periodo="+p);
            //$scope.mediciones = mediciones.query();
        //};
        */
        //$scope.sensores = [{"nombre":"asdf","tipo":1}];
        $scope.go = function(path) {
          $location.path(path);
        };
        $scope.doRefresh = function(){
          var sensores = $resource(apiUrl + "/sensores"); // a RESTful-capable resource object
          $scope.sensores = sensores.query(); // for the list of sensores in public/html/main.html
          $scope.tipos= tipoOr;

        };
    }]);

    // the create controller
    mod.controller("sensorCreateCtrl", ["$scope", "$resource", "$timeout", "apiUrl", "$stateParams", "$location",
      function($scope, $resource, $timeout, apiUrl, $stateParams, $location) {
        // to save a campo
        $scope.tipos_string = tipoOr;
        $scope.tipos = [0,1,2,3];
        $scope.save = function(sensor) {
            var CreateSensor = $resource(apiUrl +"/pozos/"+$stateParams.id+"/sensores"); // a RESTful-capable resource object
            CreateSensor.save(sensor); // $scope.sensor comes from the detailForm in public/html/detail.html
            $timeout(function() { $scope.go('/sensor'); }); // go back to public/html/main.html
        };
        $scope.go = function(path) {
          $location.path(path);
        };
    }]);

// the edit controller
    mod.controller("sensorEditCtrl", ["$scope", "$resource", "$stateParams", "$timeout", "apiUrl", "$location",
      function($scope, $resource, $stateParams, $timeout, apiUrl, $location) {
        var ShowSensor = $resource(apiUrl +"/sensores/:id", {id:"@id"}); // a RESTful-capable resource object
        $scope.tipos_string = tipoOr;
        $scope.tipos = [0,1,2,3];
        if ($stateParams.id) {
            // retrieve the corresponding celebrity from the database
            // $scope.sensor.id is now populated so the Delete button will appear in the detailForm in public/html/detail.html
            $scope.sensor = ShowSensor.get({id: $stateParams.id});
            $scope.dbContent = ShowSensor.get({id: $stateParams.id}); // this is used in the noChange function
        }

        // decide whether to enable or not the button Save in the detailForm in public/html/detail.html
        var original;
        $scope.noChange = function() {

            return angular.equals($scope.sensor, $scope.dbContent);
        };

        // to update a sensor
        $scope.save = function() {
            var UpdateSensor = $resource(apiUrl +"/sensores/" + $stateParams.id,null,{update:{method:'PUT'}}); // a RESTful-capable resource object
            $scope.sensorSinMediciones = {
                "id":$scope.sensor.id,
                "nombre":$scope.sensor.nombre,
                "tipo":$scope.sensor.tipo
            };
            UpdateSensor.update($scope.sensorSinMediciones); // $scope.celebrity comes from the detailForm in public/html/detail.html
            $timeout(function() { $scope.go('/sensor'); }); // go back to public/html/main.html
        };

        // to delete a sensor
        $scope.delete = function() {
            var DeleteSensor = $resource( apiUrl +"/sensores/" + $stateParams.id); // a RESTful-capable resource object
            DeleteSensor.delete();
            $timeout(function() { $scope.go('/sensor'); }); // go back to public/html/main.html
        };
        $scope.updateTipo = function(e){
            $scope.sensor.tipo=$scope.tipos.indexOf(e);
        };

        $scope.go = function(path) {
          $location.path(path);
        };

        $scope.doRefresh=function()
        {
          var ShowSensor = $resource(apiUrl +"/sensores/:id", {id:"@id"}); // a RESTful-capable resource object
          $scope.tipos_string = tipoOr;
          $scope.tipos = [0,1,2,3];
          if ($stateParams.id) {
            // retrieve the corresponding celebrity from the database
            // $scope.sensor.id is now populated so the Delete button will appear in the detailForm in public/html/detail.html
            $scope.sensor = ShowSensor.get({id: $stateParams.id});
            $scope.dbContent = ShowSensor.get({id: $stateParams.id}); // this is used in the noChange function
          }

        };
    }]);

})(window.angular)
