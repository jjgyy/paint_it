/**
 * @Description:
 * 页面canvas对象，需要传入dom来创建
 * @author Young Gu
 * @date 2018/9/16
*/

angular.module('myApp.dom_object.canvas_object', [])

    .service('canvas_object', function(trail_object) {

        const service = this;


        /**
         * Canvas
         * @param dom
         */
        service.Canvas = function (dom) {
            let canvas = {};
            canvas.dom = dom;
            canvas.context = canvas.dom.getContext('2d');

            canvas.setSize = function (width, height) {
                this.dom.width = parseFloat(width);
                this.dom.height = parseFloat(height);
            };

            canvas.setLocation = function (x, y) {
                this.dom.style.left = parseFloat(x) + 'px';
                this.dom.style.top = parseFloat(y) + 'px';
            };

            canvas.setLocationAndSize = function (x, y, width, height) {
                this.setLocation(x, y);
                this.setSize(width, height);
            };

            canvas.getLeftBorder = function () {
                return parseFloat(this.dom.style.left);
            };

            canvas.getTopBorder = function () {
                return parseFloat(this.dom.style.top);
            };

            //模仿另一个canvasObject的位置与尺寸
            canvas.imitate = function (canvasObject) {
                this.dom.style.left = parseFloat(canvasObject.dom.style.left) + 'px';
                this.dom.style.top = parseFloat(canvasObject.dom.style.top) + 'px';
                this.dom.width = canvasObject.dom.width;
                this.dom.height = canvasObject.dom.height;
            };

            canvas.zoom = function (widthRatio, heightRatio) {
                heightRatio = (heightRatio === undefined) ? widthRatio : heightRatio;
                this.context.scale(widthRatio, heightRatio);
            };

            return canvas;
        };




        /**
         * extend Canvas
         * @param dom
         */
        service.NetBackground = function (dom) {
            //装饰者模式来继承
            let netBackground = service.Canvas(dom);

            //生成网格背景
            netBackground.generateNet = function (netStep, netColor) {
                netStep = (netStep === undefined) ? 15 : netStep;
                netColor = (netColor === undefined) ? "rgba(0,0,0,0.1)" : netColor;
                let netContext = this.context;
                netContext.beginPath();
                for (let i = netStep, length = netBackground.dom.width; i < length; i += netStep) {
                    netContext.moveTo(i, 0);
                    netContext.lineTo(i, netBackground.dom.height);
                }
                for (let j = netStep, length = netBackground.dom.height; j < length; j += netStep) {
                    netContext.moveTo(0, j);
                    netContext.lineTo(netBackground.dom.width, j);
                }
                netContext.strokeStyle = netColor;
                netContext.stroke();
            };

            return netBackground;
        };




        /**
         * extend Canvas
         * @param dom
         * @param rootScope
         * @constructor
         */
        service.DrawCanvas = function (dom, rootScope) {
            //装饰者模式来继承
            let drawCanvas = service.Canvas(dom);
            drawCanvas.lastTrail = [];
            drawCanvas.trailRecord = [];
            drawCanvas.trailRecordNeedingIdentify = [];
            drawCanvas.coverLog = [];

            (() => {
                rootScope.$drawCanvas = {
                    isDrawing: false,
                    strokeCount: 0
                };
                drawCanvas.scope = rootScope.$drawCanvas;
            })();


            drawCanvas.loadTrailRecord = function (trailRecord) {
                //将转化的职责交给此方法
                if ( (typeof trailRecord) !== 'object' && (typeof trailRecord) !== 'string') {return;}
                if ( (typeof trailRecord) === 'string' ) {trailRecord = eval(trailRecord);}
                if ( !Array.isArray(trailRecord) ) {return;}

                this.context.beginPath();
                for (let i=0, trailNum=trailRecord.length; i<trailNum; i++){
                    this.context.moveTo(trailRecord[i][0].x, trailRecord[i][0].y);
                    for (let j=1, length=trailRecord[i].length; j<length; j++){
                        this.context.lineTo(trailRecord[i][j].x, trailRecord[i][j].y);
                    }
                }
                this.context.stroke();

                this.trailRecord = trailRecord;
            };


            drawCanvas.getIdentifiedTrail = function () {
                return (this.trailRecordNeedingIdentify !== []) ? trail_object.Trail(this.trailRecordNeedingIdentify) : null;
            };


            drawCanvas.addCoverLog = function (log) {
                this.coverLog.push(log);
            };


            drawCanvas.loadCoverLog = function (logs) {
                this.coverLog = logs;
            };


            drawCanvas.clearStrokeCount = function () {
                this.scope.strokeCount = 0;
            };


            drawCanvas.clearLastTrail = function () {
                this.lastTrail = [];
            };


            drawCanvas.clearTrailRecord = function () {
                this.trailRecord = [];
            };


            drawCanvas.clearTrailRecordNeedingIdentify = function () {
                this.trailRecordNeedingIdentify = [];
            };


            drawCanvas.clearCoverLog = function () {
                this.coverLog = [];
            };


            drawCanvas.clearCanvas = function () {
                //关闭路径，下一次画不会出现清空前内容
                this.context.closePath();
                this.context.clearRect(0, 0, this.dom.width, this.dom.height);
            };


            drawCanvas.clear = function () {
                this.clearStrokeCount();
                this.clearTrailRecord();
                this.clearTrailRecordNeedingIdentify();
                this.clearCoverLog();
                this.clearCanvas();
            };


            drawCanvas.dom.onmousedown = function (e) {
                let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop,
                    scrollLeft = document.documentElement.scrollLeft || window.pageXOffset || document.body.scrollLeft;
                drawCanvas.scope.isDrawing = true;
                drawCanvas.context.beginPath();
                drawCanvas.context.moveTo(
                    e.clientX + scrollLeft - drawCanvas.dom.offsetLeft,
                    e.clientY + scrollTop - drawCanvas.dom.offsetTop
                );
                //最后一笔的轨迹清空
                drawCanvas.lastTrail = [];
                drawCanvas.lastTrail.push({
                    x: e.clientX + scrollLeft - drawCanvas.dom.offsetLeft,
                    y: e.clientY + scrollTop - drawCanvas.dom.offsetTop
                });
            };

            drawCanvas.dom.onmousemove = function (e) {
                let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop,
                    scrollLeft = document.documentElement.scrollLeft || window.pageXOffset || document.body.scrollLeft;
                if(!drawCanvas.scope.isDrawing) { return; }
                drawCanvas.context.stroke();
                drawCanvas.context.lineTo(
                    e.clientX + scrollLeft - drawCanvas.dom.offsetLeft,
                    e.clientY + scrollTop - drawCanvas.dom.offsetTop
                );
                drawCanvas.lastTrail.push({
                    x: e.clientX + scrollLeft - drawCanvas.dom.offsetLeft,
                    y: e.clientY + scrollTop - drawCanvas.dom.offsetTop
                });
            };

            drawCanvas.dom.onmouseup = function (e) {
                drawCanvas.scope.isDrawing = false;
                drawCanvas.context.stroke();
                //笔画数+1
                drawCanvas.scope.strokeCount ++;
                //最后一笔的轨迹进入轨迹记录队列
                drawCanvas.trailRecord.push(drawCanvas.lastTrail);
                drawCanvas.trailRecordNeedingIdentify.push(drawCanvas.lastTrail);
            };

            return drawCanvas;
        };




    });
