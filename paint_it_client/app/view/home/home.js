/**
 * @Description:
 * @author Young Gu
 * @date 2018/9/18
*/

angular.module('myApp.home', [
])

    .config(function($stateProvider,$urlRouterProvider){

    })

    .controller('HomeCtrl',function($scope, $route, $http, $state, $cookies, canvas_object) {

        $http({
            method: 'get',
            url: host + 'getUserCanvases',
            headers: {'authorization': 'Bearer ' + $cookies.get('token')}
        })
            .then(function (res) {
                $scope.canvasList = res.data;
            }, function () {
                console.error();
            });


        //ng-repeat执行完毕后, 执行此方法
        $scope.$on('ngRepeatFinished', function() {
            for (let i=0, len=$scope.canvasList.length; i<len; i++){
                let canvas_id = $scope.canvasList[i].canvas_id;
                let canvas = canvas_object.DrawCanvas(document.getElementById(canvas_id), $scope);
                canvas.zoom(0.3, 0.15);
                //加载云端画板内容
                $http({
                    method: 'get',
                    url: host + 'getCanvas',
                    params: {
                        canvas_id: canvas_id
                    },
                    headers: {'authorization': 'Bearer ' + $cookies.get('token')}
                }).then(function (res) {
                    canvas.loadTrailRecord(res.data[0].trail_record);
                }, function () {
                    console.error();
                });
            }
        });


        $scope.newCanvas = function () {
            $http({
                method: 'get',
                url: host + 'addCanvas',
                headers: {'authorization': 'Bearer ' + $cookies.get('token')}
            }).then(function (res) {
                $state.go('canvas', {canvas_id: res.data.canvas_id});
            }, function () {
                console.error();
            });
        }


    });
