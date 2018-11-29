/**
 * @Description:
 * 逻辑对象轨迹
 * @author Young Gu
 * @date 2018/9/23
 */

angular.module('myApp.model_object.trail_object', [])

    .service('trail_object', function (shape_object) {

        const service = this;


        service.Trail = function (trailRecord) {
            let trail = {};
            trail.trailRecord = trailRecord;



            trail.getLeftBorder = function () {
                let leftest = this.trailRecord[0][0].x;
                for (let i=0, trailRecordLen=this.trailRecord.length; i<trailRecordLen; i++) {
                    for (let j=0, trailLen=this.trailRecord[i].length; j<trailLen; j++) {
                        leftest = (this.trailRecord[i][j].x < leftest) ? this.trailRecord[i][j].x : leftest;
                    }
                }
                return leftest;
            };



            trail.getRightBorder = function () {
                let rightest = this.trailRecord[0][0].x;
                for (let i=0, trailRecordLen=this.trailRecord.length; i<trailRecordLen; i++) {
                    for (let j=0, trailLen=this.trailRecord[i].length; j<trailLen; j++) {
                        rightest = (this.trailRecord[i][j].x > rightest) ? this.trailRecord[i][j].x : rightest;
                    }
                }
                return rightest;
            };



            trail.getBottomBorder = function () {
                let bottomest = this.trailRecord[0][0].y;
                for (let i=0, trailRecordLen=this.trailRecord.length; i<trailRecordLen; i++) {
                    for (let j=0, trailLen=this.trailRecord[i].length; j<trailLen; j++) {
                        bottomest = (this.trailRecord[i][j].y > bottomest) ? this.trailRecord[i][j].y : bottomest;
                    }
                }
                return bottomest;
            };



            trail.getTopBorder = function () {
                let toppest = this.trailRecord[0][0].y;
                for (let i=0, trailRecordLen=this.trailRecord.length; i<trailRecordLen; i++) {
                    for (let j=0, trailLen=this.trailRecord[i].length; j<trailLen; j++) {
                        toppest = (this.trailRecord[i][j].y < toppest) ? this.trailRecord[i][j].y : toppest;
                    }
                }
                return toppest;
            };



            trail.getWidth = function () {
                return this.getRightBorder() - this.getLeftBorder();
            };



            trail.getHeight = function () {
                return this.getBottomBorder() - this.getTopBorder();
            };



            trail.getMergedTrail = function () {
                //拷贝一份对象
                let trailRecord = [];
                for (let i=0, len=this.trailRecord.length; i<len; i++) {
                    trailRecord.push(this.trailRecord[i])
                }

                if(trailRecord.length === 1) {
                    return trailRecord[0];
                }

                //计算两点间长度的平方
                let calDistancePow = function (a, b) {
                    return Math.pow((a.x - b.x), 2) + Math.pow((a.y - b.y), 2);
                };
                //反转list
                let reverseList = function (list) {
                    let result = [];
                    for ( let i = 0, len = list.length; i < len; i ++ ){
                        result.push( list[len - 1 - i] );
                    }
                    return result;
                };

                //选定trailRecord的第一条轨迹
                let mergedTrail = trailRecord[0];
                trailRecord.splice(0, 1);

                let closestDistance = calDistancePow( mergedTrail[mergedTrail.length - 1], trailRecord[0][0] ),
                    closestTrailIndex = 0,
                    reverseClosestTrail = false;

                while ( trailRecord.length > 0 ) {
                    for ( let i = 0, len = trailRecord.length; i < len; i++ ) {
                        //离选中边的起始点比较近，不用翻转
                        if ( closestDistance > calDistancePow( mergedTrail[mergedTrail.length - 1], trailRecord[i][0] ) ) {
                            closestDistance = calDistancePow( mergedTrail[mergedTrail.length - 1], trailRecord[i][0] );
                            closestTrailIndex = i;
                            reverseClosestTrail = false;
                        }
                        //离选中边的末尾点比较近，要翻转
                        if ( closestDistance > calDistancePow( mergedTrail[mergedTrail.length - 1], trailRecord[i][trailRecord[i].length - 1] ) ) {
                            closestDistance = calDistancePow( mergedTrail[mergedTrail.length - 1], trailRecord[i][trailRecord[i].length - 1] );
                            closestTrailIndex = i;
                            reverseClosestTrail = true;
                        }
                    }
                    if ( Array.isArray(reverseClosestTrail) ) {
                        trailRecord[closestTrailIndex].reverse();
                    }
                    mergedTrail = mergedTrail.concat( trailRecord[closestTrailIndex] );
                    trailRecord.splice( closestTrailIndex, 1 );
                }
                console.log(mergedTrail);
                return mergedTrail;
            };



            trail.getShape = function () {
                return shape_object.Shape( this.getMergedTrail() );
            };



            return trail;

        };


    });
