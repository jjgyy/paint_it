/**
 * @Description:
 * @author Young Gu
 * @date 2018/9/23
 */

angular.module('myApp.dom_object.cover_object', [])

    .service('cover_object', function() {

        const service = this;



        service.Cover = function (dom) {
            let cover = {};
            cover.dom = dom;

            (() => {
                cover.dom.style.position = 'absolute';
                cover.dom.style.display = 'flex';
                cover.dom.style.alignItems = 'center';
                cover.dom.style.justifyContent = 'center';
                cover.dom.style.background = 'rgba(0,0,0,0.4)';
            })();

            cover.setSize = function (width, height) {
                this.dom.style.width = parseFloat(width) + 'px';
                this.dom.style.height = parseFloat(height) + 'px';
            };

            cover.setLocation = function (x, y) {
                this.dom.style.left = parseFloat(x) + 'px';
                this.dom.style.top = parseFloat(y) + 'px';
            };

            cover.setLocationAndSize = function (x, y, width, height) {
                this.setLocation(x, y);
                this.setSize(width, height);
            };

            cover.setInnerText = function (text) {
                this.dom.innerHTML = '<h5>' + text + '</h5>';
            };

            return cover;
        };


    });
