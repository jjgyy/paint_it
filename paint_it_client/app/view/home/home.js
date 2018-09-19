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
            url: host + 'getUserInfo',
            headers: {'authorization': 'Bearer ' + $cookies.get('token')}
        }).then(function (res) {
            console.log(res);
        }, function () {
            console.error();
        });


        $scope.newCanvas = function () {

        }


    });
