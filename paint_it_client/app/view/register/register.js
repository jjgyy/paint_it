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
                params: {
                    username: $scope.username,
                    password: $scope.password
                }
            }).then(function (res) {
                $state.go('login')
            }, function () {
                console.error();
            });
        };
    });
