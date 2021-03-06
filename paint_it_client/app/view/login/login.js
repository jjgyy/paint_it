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

        if ($cookies.get('token')) {
            $state.go('home');
        }

        $scope.login = function () {
            $http({
                method: 'get',
                url: host + 'login',
                params: {
                    email: $scope.email,
                    password: $scope.password
                }
            }).then(function (res) {
                if (res.data.code === 1) {
                    $cookies.put('token', res.data.token);
                    $state.go('home');
                } else {
                    $scope.warning_info = '用户名或密码错误';
                }
            }, function () {
                $scope.warning_info = '用户名或密码错误';
                console.error();
            });
        };


    });
