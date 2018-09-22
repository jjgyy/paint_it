/**
 * @Description:
 * @author Young Gu
 * @date 2018/9/15
 */

const host = 'http://localhost:3000/';

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
        $urlRouterProvider.when('', '/login');

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


    .controller('MainCtrl', function($scope, $http, $state, $window){
        $scope.logged = false;
    })


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
