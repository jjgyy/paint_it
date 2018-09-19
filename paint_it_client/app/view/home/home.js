/**
 * @Description:
 * @author Young Gu
 * @date 2018/9/18
*/

angular.module('myApp.home', [

])

    .config(function($stateProvider,$urlRouterProvider){

    })

    .controller('HomeCtrl',function($scope, $route, $http, $state) {

        $http({
            method: 'get',
            url: host + 'getUserInfo',
            headers: {'authorization': 'Bearer ' + token}
        }).then(function (res) {
            console.log(res);
        }, function () {
            console.error();
        });


    });
