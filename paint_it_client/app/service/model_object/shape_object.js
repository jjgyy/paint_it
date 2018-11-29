/**
 * @Description:
 * 逻辑对象形状
 * @author Young Gu
 * @date 2018/9/23
 */

angular.module('myApp.model_object.shape_object', [])

    .service('shape_object', function () {

        const service = this;

        service.Shape = function (trail) {
            let shape = {};
            shape.trail = trail;


            shape.getLeftBorder = function () {
                let leftest = this.trail[0].x;
                for (let i=0, len=this.trail.length; i<len; i++) {
                    leftest = (this.trail[i].x < leftest) ? this.trail[i].x : leftest;
                }
                return leftest;
            };



            shape.getRightBorder = function () {
                let rightest = this.trail[0].x;
                for (let i=0, len=this.trail.length; i<len; i++) {
                    rightest = (this.trail[i].x > rightest) ? this.trail[i].x : rightest;
                }
                return rightest;
            };



            shape.getBottomBorder = function () {
                let bottomest = this.trail[0].y;
                for (let i=0, len=this.trail.length; i<len; i++) {
                    bottomest = (this.trail[i].y > bottomest) ? this.trail[i].y : bottomest;
                }
                return bottomest;
            };



            shape.getTopBorder = function () {
                let toppest = this.trail[0].y;
                for (let i=0, len=this.trail.length; i<len; i++) {
                    toppest = (this.trail[i].y < toppest) ? this.trail[i].y : toppest;
                }
                return toppest;
            };



            shape.getWidth = function () {
                return this.getRightBorder() - this.getLeftBorder();
            };



            shape.getHeight = function () {
                return this.getBottomBorder() - this.getTopBorder();
            };



            shape.getCenter = function () {
                let center = {};
                center.x = ( this.getLeftBorder() + this.getRightBorder() ) / 2;
                center.y = ( this.getTopBorder() + this.getBottomBorder() ) / 2;
                return center;
            };



            shape.getAngleNumber = function () {
                let trail = this.trail,
                    center = this.getCenter();

                //计算两点间长度的平方
                let calDistancePow = function (a, b) {
                    return Math.pow((a.x - b.x), 2) + Math.pow((a.y - b.y), 2);
                };

                let lastDistancePow = calDistancePow(center, trail[0]),
                    distanceTrendList = [];
                for (let i=1, len=trail.length; i<len; i++) {
                    //true 代表 离中点距离 变长趋势， false反之
                    calDistancePow(center, trail[i]) > lastDistancePow ? distanceTrendList.push(true) : distanceTrendList.push(false);
                    lastDistancePow = calDistancePow(center, trail[i]);
                }

                //看后4个趋势，防止溢出，同时连接首尾
                for (let i=0; i<4; i++) {
                    distanceTrendList.push(distanceTrendList[i]);
                }

                let trendChangeCount = 0,
                    trendNow = distanceTrendList[0];
                for (let i=1, len=distanceTrendList.length; i<len; i++) {
                    if (distanceTrendList[i] !== trendNow) {
                        let isChange = true;
                        //后面四个趋势都跟这个趋势保持一致，才算作一次趋势变化
                        for (let j=1; j<=4; j++) {
                            if (distanceTrendList[i+j] !== distanceTrendList[i]) {
                                isChange = false;
                                break;
                            }
                        }
                        if (isChange) {
                            trendChangeCount ++;
                            trendNow = !trendNow;
                        }
                    }
                }
                console.log(trendChangeCount/2);

                return trendChangeCount/2;
            };


            shape.getName = function () {
                let angleNum = this.getAngleNumber(),
                    width = this.getWidth(),
                    height = this.getHeight();
                let WHRatio = width / height;
                if (angleNum <= 1) {
                    return '直线';
                }
                if (1.5 <= angleNum && angleNum <= 2) {
                    return '圆形';
                }
                if (2.5 <= angleNum && angleNum <= 3) {
                    return '三角形';
                }
                if (3.5 <= angleNum && angleNum <= 4) {
                    if (WHRatio >= 0.8 && WHRatio <=1.25) {
                        return '正方形';
                    } else {
                        return '长方形';
                    }
                }
                if (4.5 <= angleNum && angleNum <= 5) {
                    return '五边形';
                }

                return '多边形';
            };


            return shape;
        };


    });
