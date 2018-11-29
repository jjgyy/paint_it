/**
 * @Description:
 * @author Young Gu
 * @date 2018/9/16
*/

angular.module('myApp.canvas', [])

    .config(function($stateProvider, $urlRouterProvider){

    })

    .controller('CanvasCtrl',function($scope, $route, $http, $state, $cookies, $stateParams, canvas_object, cover_object) {

        //加载路由中画板id参数
        $scope.canvas_id = $stateParams.canvas_id;



        //使用canvas_object (service/dom_object/canvas_object) 生成画板
        let drawCanvas = canvas_object.DrawCanvas(document.getElementById("drawCanvas"), $scope);
        drawCanvas.setLocationAndSize(200, 100, 1000, 1000);



        //使用canvas_object (service/dom_object/canvas_object) 生成网格背景
        let netBackground = canvas_object.NetBackground(document.getElementById("netBackground"));
        //大小位置模仿画板
        netBackground.imitate(drawCanvas);
        //生成网格
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

        $http({
            method: 'get',
            url: host + 'getCanvasCover',
            params: {
                canvas_id: $scope.canvas_id
            },
            headers: {'authorization': 'Bearer ' + $cookies.get('token')}
        }).then(function (res) {
            let cover_record = eval(res.data[0].cover_record);
            if (Array.isArray(cover_record)) {
                $scope.loadCoverLog(cover_record);
            }
        }, function () {
            console.error();
        });



        //识别图形
        $scope.identity = function () {
            //页面上创建dom
            let cover_dom = document.createElement('div');
            document.getElementById("coverContainer").appendChild(cover_dom);

            //覆盖需要识别的区域
            (() => {
                let cover = cover_object.Cover(cover_dom, drawCanvas);
                let trail = drawCanvas.getIdentifiedTrail();
                cover.setLocationAndSize(
                    trail.getLeftBorder(),
                    trail.getTopBorder(),
                    trail.getWidth(),
                    trail.getHeight()
                );
                cover.setInnerText(trail.getShape().getName());
                //记录cover
                cover.log();
                drawCanvas.clearTrailRecordNeedingIdentify();
            })();

        };



        //保存
        $scope.save = function () {
            console.log(drawCanvas.coverLog);
            $http({
                method: 'get',
                url: host + 'updateCanvas',
                params: {
                    canvas_id: $scope.canvas_id,
                    trail_record: JSON.stringify(drawCanvas.trailRecord),
                    cover_record: JSON.stringify(drawCanvas.coverLog)
                },
                headers: {'authorization': 'Bearer ' + $cookies.get('token')}
            }).then(function (res) {

            }, function () {
                console.error();
            });
        };



        //保存并退出
        $scope.saveAndQuit = function () {
            $scope.save();
            $state.go('home');
        };



        //清空画板
        $scope.clear = function () {
            drawCanvas.clear();
            document.getElementById('coverContainer').innerHTML = '';
        };



        //删除画板方法
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



        $scope.loadCoverLog = function (logs) {
            logs = eval(logs);
            console.log(logs);
            for (let i=0, len=logs.length; i<len; i++) {
                //画板加载cover记录
                drawCanvas.loadCoverLog(logs);

                //页面上创建dom
                let cover_dom = document.createElement('div');
                document.getElementById("coverContainer").appendChild(cover_dom);

                //覆盖需要识别的区域
                (() => {
                    let cover = cover_object.Cover(cover_dom, drawCanvas);
                    cover.generateByLog(logs[i]);
                })();

            }

        };


    });
