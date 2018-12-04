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

        var identifyToken;

        $scope.getIdentifyCode = function () {
            $http({
                method: 'get',
                url: host + 'getIdentifyCode',
                params: {
                    email: $scope.email
                }
            }).then(function (res) {
                identifyToken = res.data.token
            }, function () {
                console.error();
            });
        };

        $scope.register = function () {
            $http({
                method: 'get',
                url: host + 'addUser',
                params: {
                    email: $scope.email,
                    password: $scope.password,
                    identifyCode: $scope.identifyCode
                },
                headers: {'authorization': 'Bearer ' + identifyToken}
            }).then(function (res) {
                $state.go('login')
            }, function () {
                console.error();
            });
        };

    });
