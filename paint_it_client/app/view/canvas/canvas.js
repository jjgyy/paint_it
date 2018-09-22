/**
 * @Description:
 * @author Young Gu
 * @date 2018/9/16
*/

angular.module('myApp.canvas', [])

    .config(function($stateProvider, $urlRouterProvider){

    })

    .controller('CanvasCtrl',function($scope, $route, $http, $state, $cookies, $stateParams, canvas_object) {

        $scope.canvas_id = $stateParams.canvas_id;

        //DOM对象化
        let topElement = document.getElementById("topElement");


        //生成画板
        let drawCanvas = canvas_object.DrawCanvas(document.getElementById("drawCanvas"), $scope);
        drawCanvas.setLocationAndSize(300, 100, 1000, 1000);

        //生成网格背景
        let netBackground = canvas_object.NetBackground(document.getElementById("netBackground"));
        netBackground.imitate(drawCanvas);
        netBackground.generateNet();

        //加载云端画板内容
        $http({
            method: 'get',
            url: host + 'getCanvas',
            params: {
                canvas_id: $scope.canvas_id
            },
            headers: {'authorization': 'Bearer ' + $cookies.get('token')}
        }).then(function (res) {
            drawCanvas.loadTrailRecord(res.data[0].trail_record);
        }, function () {
            console.error();
        });


        $scope.log = function () {
            console.log(drawCanvas.getIdentifiedTrail().getLeftBorder());
            console.log(drawCanvas.getIdentifiedTrail().getRightBorder());
            console.log(drawCanvas.getIdentifiedTrail().getTopBorder());
            console.log(drawCanvas.getIdentifiedTrail().getBottomBorder());
        };

        $scope.save = function () {
            $http({
                method: 'get',
                url: host + 'updateCanvas',
                params: {
                    canvas_id: $scope.canvas_id,
                    trail_record: JSON.stringify(drawCanvas.trailRecord)
                },
                headers: {'authorization': 'Bearer ' + $cookies.get('token')}
            }).then(function (res) {

            }, function () {
                console.error();
            });
        };

        $scope.delete = function () {
            $http({
                method: 'get',
                url: host + 'deleteCanvas',
                params: {
                    canvas_id: $scope.canvas_id
                },
                headers: {'authorization': 'Bearer ' + $cookies.get('token')}
            }).then(function (res) {
                $state.go('home');
            }, function () {
                console.error();
            });
        };

    });
