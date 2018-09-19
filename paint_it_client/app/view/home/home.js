/**
 * @Description:
 * @author Young Gu
 * @date 2018/9/18
*/

angular.module('myApp.home', [

])

    .config(function($stateProvider,$urlRouterProvider){

    })

    .controller('HomeCtrl',function($scope, $route, $http, $state, $cookies) {

        $http({
            method: 'get',
            url: host + 'getUserCanvases',
            headers: {'authorization': 'Bearer ' + $cookies.get('token')}
        }).then(function (res) {
            $scope.canvasList = res.data;
        }, function () {
            console.error();
        });


        $scope.newCanvas = function () {
            $http({
                method: 'get',
                url: host + 'addCanvas',
                headers: {'authorization': 'Bearer ' + $cookies.get('token')}
            }).then(function (res) {
                $state.go('canvas', {canvas_id: res.data.canvas_id});
            }, function () {
                console.error();
            });
        }


    });
