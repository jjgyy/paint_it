/**
 * @Description:
 * @author Young Gu
 * @date 2018/9/23
 */

angular.module('myApp.model_object.trail_object', [])

    .service('trail_object', function () {

        const service = this;


        service.Trail = function (trailRecord) {
            let trail = {};
            trail.trailRecord = trailRecord;

            trail.getLeftBorder = function () {
                let leftest = this.trailRecord[0][0].x;
                for (let i=0, trailRecordLen=trailRecord.length; i<trailRecordLen; i++) {
                    for (let j=0, trailLen=trailRecord[i].length; j<trailLen; j++) {
                        leftest = (trailRecord[i][j].x < leftest) ? trailRecord[i][j].x : leftest;
                    }
                }
                return leftest;
            };

            trail.getRightBorder = function () {
                let rightest = this.trailRecord[0][0].x;
                for (let i=0, trailRecordLen=trailRecord.length; i<trailRecordLen; i++) {
                    for (let j=0, trailLen=trailRecord[i].length; j<trailLen; j++) {
                        rightest = (trailRecord[i][j].x > rightest) ? trailRecord[i][j].x : rightest;
                    }
                }
                return rightest;
            };

            trail.getBottomBorder = function () {
                let bottomest = this.trailRecord[0][0].y;
                for (let i=0, trailRecordLen=trailRecord.length; i<trailRecordLen; i++) {
                    for (let j=0, trailLen=trailRecord[i].length; j<trailLen; j++) {
                        bottomest = (trailRecord[i][j].y < bottomest) ? trailRecord[i][j].y : bottomest;
                    }
                }
                return bottomest;
            };

            trail.getTopBorder = function () {
                let toppest = this.trailRecord[0][0].y;
                for (let i=0, trailRecordLen=trailRecord.length; i<trailRecordLen; i++) {
                    for (let j=0, trailLen=trailRecord[i].length; j<trailLen; j++) {
                        toppest = (trailRecord[i][j].y > toppest) ? trailRecord[i][j].y : toppest;
                    }
                }
                return toppest;
            };

            return trail;
        };


    });
