/**
 * @Description:
 * @author Young Gu
 * @date 2018/9/16
*/

angular.module('myApp.canvas.identify_shape', [
])
    .service('identify_shape', function() {
        const service = this;

        let calDistancePow = function (a, b) {
            return Math.pow((a.x - b.x), 2) + Math.pow((a.y - b.y), 2);
        };


        let reverseList = function (list) {
            let result = [];
            for ( let i = 0, len = list.length; i < len; i ++ ){
                result.push( list[len - 1 - i] );
            }
            return result;
        };

        service.mergeTrail = function (record) {
            let trailRecord = [];
            //传的是引用，拷贝一份
            for (let i=0, len=record.length; i<len; i++){
                trailRecord.push(record[i]);
            }
            if(trailRecord.length === 1) {
                return trailRecord;
            }

            //选定TrailRecord的第一条轨迹
            let mergedTrail = trailRecord[0];
            trailRecord.splice( 0, 1 );

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
                if ( reverseClosestTrail ) {
                    trailRecord[closestTrailIndex] = reverseList(trailRecord[closestTrailIndex]);
                }
                mergedTrail = mergedTrail.concat( trailRecord[closestTrailIndex] );
                trailRecord.splice( closestTrailIndex, 1 );
            }
            return mergedTrail;
        };

        service.identify = function () {

        };

    });