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
                $scope.success_info = '注册成功，即将跳转';
                setTimeout( function () {
                    $state.go('login')
                }, 1000)
            }, function () {
                $scope.success_info = '注册失败，请重新注册';
                console.error();
            });
        };

    });
