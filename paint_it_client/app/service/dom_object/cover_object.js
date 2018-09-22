/**
 * @Description:
 * @author Young Gu
 * @date 2018/9/23
 */

angular.module('myApp.dom_object.canvas_object', [])

    .service('canvas_object', function() {

        const service = this;



        service.Cover = function (dom) {
            let cover = {};
            cover.dom = dom;

        };


    });
