/**
 * Created by d.althviz10 on 23/10/2016.
 * Based on https://github.com/angyjoe/eventual
 */
(function (ng) {

    var mod = ng.module("campoModule");

// the list controller
    mod.controller("campoListCtrl", ["$scope", "$resource", "apiUrl","$location", function($scope, $resource, apiUrl,$location) {
        $scope.filtros = ["diario", "semanal", "mensual", "trimestral", "semestral", "anual"];
        var campos = $resource(apiUrl + "/campos?periodo="+$scope.filtro); // a RESTful-capable resource object
        $scope.campos = campos.query(); // for the list of campos in public/html/main.html
        $scope.filter = function() {
            var camposFiltrados = $resource(apiUrl + "/campos?periodo="+$scope.filtro); // a RESTful-capable resource object
            $scope.campos = camposFiltrados.query();
            $scope.go('/campo');
        };
       // $scope.campos = [{"id":1,"nombre":"ejemplo","latitud":1,"longitud":1}];
      $scope.go = function(path) {
        $location.path(path);
      };

      $scope.doRefresh=function () {
        $scope.filtros = ["diario", "semanal", "mensual", "trimestral", "semestral", "anual"];
        var campos = $resource(apiUrl + "/campos?periodo="+$scope.filtro); // a RESTful-capable resource object
        $scope.campos = campos.query(); // for the list of campos in public/html/main.html

      };
    }]);

// the create controller
    mod.controller("campoCreateCtrl", ["$scope", "$resource", "$timeout", "apiUrl", "$stateParams", "$location",
      function($scope, $resource, $timeout, apiUrl, $stateParams,$location) {
        // to save a campo
        $scope.save = function(campo) {
            var CreateCampo = $resource(apiUrl +"/regiones/"+$stateParams.id+"/campos"); // a RESTful-capable resource object
            CreateCampo.save($scope.campo); // $scope.campo comes from the detailForm in public/html/detail.html
            $timeout(function() { $scope.go('/campo'); }); // go back to public/html/main.html
        };
        $scope.go = function(path) {
          $location.path(path);
        };
    }]);

    // the edit controller
    mod.controller("campoEditCtrl", ["$scope", "$resource", "$stateParams", "$timeout", "apiUrl","$location",
      function($scope, $resource, $stateParams, $timeout, apiUrl, $location) {
        var ShowCampo = $resource(apiUrl +"/campos/:id", {id:"@id"}); // a RESTful-capable resource object
        if ($stateParams.id) {
            // retrieve the corresponding celebrity from the database
            // $scope.campo.id is now populated so the Delete button will appear in the detailForm in public/html/detail.html
            $scope.campo = ShowCampo.get({id: $stateParams.id});
            $scope.dbContent = ShowCampo.get({id: $stateParams.id}); // this is used in the noChange function
        }

        // decide whether to enable or not the button Save in the detailForm in public/html/detail.html
        $scope.noChange = function() {
            return angular.equals($scope.campo, $scope.dbContent);
        };

        // to update a campo
        $scope.save = function() {
            var UpdateCampo = $resource(apiUrl +"/campos/" + $stateParams.id,null,{update:{method:'PUT'}}); // a RESTful-capable resource object
            $scope.campoSinPozos = {
                "id":$scope.campo.id,
                "nombre":$scope.campo.nombre,
                "latitud":$scope.campo.latitud,
                "longitud":$scope.campo.longitud
            };
            UpdateCampo.update($scope.campoSinPozos); // $scope.celebrity comes from the detailForm in public/html/detail.html
            $timeout(function() { $scope.go('/campo'); }); // go back to public/html/main.html
        };

        // to delete a campo
        $scope.delete = function() {
            var DeleteCampo = $resource( apiUrl +"/campos/" + $stateParams.id); // a RESTful-capable resource object
            DeleteCampo.delete();
            $timeout(function() { $scope.go('/campo'); }); // go back to public/html/main.html
        };

        $scope.go = function(path) {
          $location.path(path);
        };
    }]);

})(window.angular)
