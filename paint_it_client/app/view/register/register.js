/**
 * @Description:
 * @author Young Gu
 * @date 2018/9/18
*/

angular.module('myApp.register', [

])

    .config(function($stateProvider,$urlRouterProvider){

    })

    .controller('RegisterCtrl',function($scope, $route, $http, $state) {
        $scope.register = function () {
            $http({
                method: 'get',
                url: host + 'addUser',
                withCredentials: true,
                params: {
                    username: $scope.username,
                    password: $scope.password
                }
            }).then(function (res) {
                console.log(res);
            }, function () {
                console.error();
            });
        };
    });
