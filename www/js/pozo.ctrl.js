/**
 * Created by ca.mendoza968 on 25/10/2016.
 * Based on https://github.com/angyjoe/eventual
 */
(function (ng) {

    var mod = ng.module("pozoModule");

// the list controller
    mod.controller("pozoListCtrl", ["$scope", "$resource", "apiUrl", "$stateParams", "$location",
      function($scope, $resource, apiUrl, $stateParams, $location) {
        $scope.filtros = ["diario", "semanal", "mensual", "trimestral", "semestral", "anual"];
        var Pozos = $resource(apiUrl + "/pozos", {periodo: $scope.filtro}); // a RESTful-capable resource object
        $scope.pozos = Pozos.query() // for the list of pozos in public/html/main.html
        $scope.filter = function() {
            var Pozos = $resource(apiUrl + "/pozos", {periodo: $scope.filtro}); // a RESTful-capable resource object
            $scope.pozos = Pozos.query();
            $scope.go('/pozo');
        };
        $scope.go = function(path) {
          $location.path(path);
        };
       // $scope.pozos = [{"id":1,"estado":"bien"}];
        $scope.doRefresh = function(){
          $scope.filtros = ["diario", "semanal", "mensual", "trimestral", "semestral", "anual"];
          var Pozos = $resource(apiUrl + "/pozos", {periodo: $scope.filtro}); // a RESTful-capable resource object
          $scope.pozos = Pozos.query() // for the list of pozos in public/html/main.html

        };
    }]);

// the create controller
    mod.controller("pozoCreateCtrl", ["$scope", "$resource", "$timeout", "apiUrl", "$stateParams", "$location",
      function($scope, $resource, $timeout, apiUrl, $stateParams, $location) {
        // to save a pozo
        $scope.save = function(pozo) {
            var CreatePozo = $resource(apiUrl + "/campos/" + $stateParams.id +"/pozos"); // a RESTful-capable resource object
            CreatePozo.save(pozo); // $scope.pozo comes from the detailForm in public/html/detail.html
            $timeout(function() { $scope.go('/pozo'); }); // go back to public/html/main.html
        };
        $scope.go = function(path) {
          $location.path(path);
        };
    }]);

// the edit controller
    mod.controller("pozoEditCtrl", ["$scope", "$resource", "$stateParams", "$timeout", "apiUrl","$location",
      function($scope, $resource, $stateParams, $timeout, apiUrl, $location) {
        var ShowPozo = $resource(apiUrl +"/pozos/:id", {id:"@id"}); // a RESTful-capable resource object

        $scope.tipos_sensor = ['Fluido', 'Energia', 'Temperatura', 'Emergencia'];

        if ($stateParams.id) {
            // retrieve the corresponding celebrity from the database
            // $scope.pozo.id is now populated so the Delete button will appear in the detailForm in public/html/detail.html
            $scope.pozo = ShowPozo.get({id: $stateParams.id});
            $scope.dbContent = ShowPozo.get({id: $stateParams.id}); // this is used in the noChange function
        }

        // decide whether to enable or not the button Save in the detailForm in public/html/detail.html
        $scope.noChange = function() {
            return angular.equals($scope.pozo, $scope.dbContent);
        };

        // to update a pozo
        $scope.save = function() {
            var UpdatePozo = $resource(apiUrl +"/pozos/" + $stateParams.id,null,{update:{method:'PUT'}}); // a RESTful-capable resource object
            $scope.pozoSinSensores = {
                "id":$scope.pozo.id,
                "estado":$scope.pozo.estado
            };
            UpdatePozo.update($scope.pozoSinSensores); // $scope.celebrity comes from the detailForm in public/html/detail.html
            $timeout(function() { $scope.go('/pozo'); }); // go back to public/html/main.html
        };

        // to delete a pozo
        $scope.delete = function() {
            var DeletePozo = $resource( apiUrl +"/pozos/" + $stateParams.id); // a RESTful-capable resource object
            DeletePozo.delete();
            $timeout(function() { $scope.go('/pozo'); }); // go back to public/html/main.html
        };
        $scope.go = function(path) {
          $location.path(path);
        };

        $scope.doRefresh=function()
        {
          var ShowPozo = $resource(apiUrl +"/pozos/:id", {id:"@id"}); // a RESTful-capable resource object

          $scope.tipos_sensor = ['Fluido', 'Energia', 'Temperatura', 'Emergencia'];

          if ($stateParams.id) {
            // retrieve the corresponding celebrity from the database
            // $scope.pozo.id is now populated so the Delete button will appear in the detailForm in public/html/detail.html
            $scope.pozo = ShowPozo.get({id: $stateParams.id});
            $scope.dbContent = ShowPozo.get({id: $stateParams.id}); // this is used in the noChange function
          }
        };
    }]);

})(window.angular)
