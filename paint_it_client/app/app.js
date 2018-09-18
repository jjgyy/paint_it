/**
 * @Description:
 * @author Young Gu
 * @date 2018/9/15
*/

const host = 'http://localhost:3000/';

angular.module('myApp', [
  'ngRoute',
  'ui.router',
  'myApp.login',
  'myApp.home',
  'myApp.canvas'
])


    .config(function($stateProvider, $urlRouterProvider){
      $urlRouterProvider.when('', '/canvas');

      $stateProvider
          .state('login', {
            url: '/login',
            templateUrl: 'view/login/login.html',
            controller: 'LoginCtrl'
          })
          .state('home', {
            url: '/home',
            templateUrl: 'view/home/home.html',
            controller: 'HomeCtrl'
          })
          .state('canvas', {
            url: '/canvas',
            templateUrl: 'view/canvas/canvas.html',
            controller: 'CanvasCtrl'
          });
    })


    .controller('MainCtrl', function($scope, $http, $state, $window){

    });