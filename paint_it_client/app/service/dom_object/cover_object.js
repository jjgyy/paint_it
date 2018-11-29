/**
 * @Description:
 * 页面半透明盖膜，需要传入dom对象来生成
 * @author Young Gu
 * @date 2018/9/23
 */

angular.module('myApp.dom_object.cover_object', [])

    .service('cover_object', function() {

        const service = this;


        service.Cover = function (dom, canvas) {
            let cover = {};
            cover.dom = dom;
            cover.canvas = canvas;

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
                this.dom.style.left = (this.canvas.getLeftBorder() + parseFloat(x)) + 'px';
                this.dom.style.top = (this.canvas.getTopBorder() + parseFloat(y)) + 'px';
            };



            cover.setLocationAndSize = function (x, y, width, height) {
                this.setLocation(x, y);
                this.setSize(width, height);
            };



            cover.setInnerText = function (text) {
                this.dom.innerHTML = '<h5>' + text + '</h5>';
            };


            cover.log = function () {
                this.canvas.addCoverLog({
                    x: parseFloat(this.dom.style.left) - this.canvas.getLeftBorder(),
                    y: parseFloat(this.dom.style.top) - this.canvas.getTopBorder(),
                    width: parseFloat(this.dom.style.width),
                    height: parseFloat(this.dom.style.height),
                    innerHTML: this.dom.innerHTML
                });
            };


            cover.generateByLog = function (log) {
                this.setLocationAndSize(log.x, log.y, log.width, log.height);
                this.setInnerText(log.innerHTML);
            };


            return cover;
        };


    });
