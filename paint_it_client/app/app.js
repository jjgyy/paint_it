/**
 * @Description:
 * @author Young Gu
 * @date 2018/9/15
 */

//后端地址
//const host = 'http://118.25.41.139:3000/';
const host = 'http://localhost:3000/';

angular.module('myApp', [
    'ngRoute',
    'ui.router',
    'ngCookies',
    'oc.lazyLoad',
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
                controller: 'LoginCtrl',
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load('view/login/login.js');
                    }]
                }
            })
            .state('register', {
                url: '/register',
                templateUrl: 'view/register/register.html',
                controller: 'RegisterCtrl',
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load('view/register/register.js');
                    }]
                }
            })
            .state('home', {
                url: '/home',
                templateUrl: 'view/home/home.html',
                controller: 'HomeCtrl',
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load('view/home/home.js');
                    }]
                }
            })
            .state('canvas', {
                params:{"canvas_id": null},
                url: '/canvas/?:canvas_id',
                templateUrl: 'view/canvas/canvas.html',
                controller: 'CanvasCtrl',
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load('view/canvas/canvas.js');
                    }]
                }
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
