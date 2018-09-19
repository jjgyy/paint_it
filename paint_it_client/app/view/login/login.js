/**
 * @Description:
 * @author Young Gu
 * @date 2018/9/18
*/

angular.module('myApp.login', [

])

    .config(function($stateProvider,$urlRouterProvider){

    })

    .controller('LoginCtrl',function($scope, $route, $http, $state, $cookies) {

        $scope.login = function () {
            $http({
                method: 'get',
                url: host + 'login',
                params: {
                    username: $scope.username,
                    password: $scope.password
                }
            }).then(function (res) {
                if (res.data.code === 1) {
                    $cookies.put('token', res.data.token);
                    console.log(res);
                    $state.go('home');
                } else {
                    console.log(res);
                }
            }, function () {
                console.error();
            });
        };


    });
