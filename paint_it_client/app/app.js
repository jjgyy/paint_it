/**
 * @Description:
 * @author Young Gu
 * @date 2018/9/15
 */

//后端地址
const host = 'http://118.25.41.139:3000/';

angular.module('myApp', [
    'ngRoute',
    'ui.router',
    'ngCookies',

    'myApp.login',
    'myApp.register',
    'myApp.home',
    'myApp.canvas',

    'myApp.serviceRouter',
])


    .config(function($stateProvider, $urlRouterProvider){
        //默认路由路径
        $urlRouterProvider.when('', '/login');

        //路由表
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'view/login/login.html',
                controller: 'LoginCtrl'
            })
            .state('register', {
                url: '/register',
                templateUrl: 'view/register/register.html',
                controller: 'RegisterCtrl'
            })
            .state('home', {
                url: '/home',
                templateUrl: 'view/home/home.html',
                controller: 'HomeCtrl'
            })
            .state('canvas', {
                params:{"canvas_id": null},
                url: '/canvas/?:canvas_id',
                templateUrl: 'view/canvas/canvas.html',
                controller: 'CanvasCtrl'
            });
    })


    .controller('MainCtrl', function($scope, $http, $state, $window, $cookies){
        $scope.logout = function () {
            $cookies.remove('token');
            console.log($cookies.get('token'));
            $state.go('login');
        };
    })


    //ng-repeat触发渲染完成事件的标签
    .directive('onFinishRender',['$timeout', '$parse', function ($timeout, $parse) {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                if (scope.$last === true) {
                    $timeout(function () {
                        scope.$emit('ngRepeatFinished'); //事件通知
                    });
                }
            }
        }
    }]);
