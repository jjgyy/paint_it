/**
 * @Description:
 * @author Young Gu
 * @date 2018/9/16
*/

angular.module('myApp.canvas', [
    'myApp.canvas.canvas_object'
])

    .config(function($stateProvider, $urlRouterProvider){

    })

    .controller('CanvasCtrl',function($scope, $route, $http, $state, canvas_object) {
        //DOM对象化
        let topElement = document.getElementById("topElement");


        //生成画板
        let drawCanvas = canvas_object.DrawCanvas(document.getElementById("drawCanvas"), $scope);
        drawCanvas.setLocationAndSize(100, 100, 1000, 600);

        //生成网格背景
        let netBackground = canvas_object.NetBackground(document.getElementById("netBackground"));
        netBackground.imitate(drawCanvas);
        netBackground.generateNet();


        $scope.log = function () {
          console.log($scope);
          console.log(drawCanvas.identifyShape());
        };

        $http({
            method: 'get',
            url: host + 'users',
            withCredentials: true
        }).then(function (res) {
            console.log(res);
        }, function () {
            console.error();
        });

    });
