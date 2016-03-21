
require.register("renderer", function(exports, require, module) {

    function renderer() {
        this.canvas = null;
        this.element = null;

        this.w;
        this.h;

    }

    renderer.prototype = {
        setCanvas : function(canvas) {
            this.canvas = canvas;
            this.w = parseInt(this.canvas.getAttribute("width"));
            this.h = parseInt(this.canvas.getAttribute("height"));
        },

        getCanvasContext2d : function () {
            return this.canvas.getContext("2d");
        },

        getFullScreen : function() {
            var c = this.getCanvasContext2d();
            return c.getImageData(0, 0, this.w, this.h);
        },

        putFullScreen : function(imageData) {
            var c = this.getCanvasContext2d();
            c.putImageData(imageData, 0, 0);
        },

        addElement : function(element) {
            this.clear();
            this.element = element;
        },

        clear : function() {
            var c = this.getCanvasContext2d();
            c.clearRect(0, 0, this.w, this.h);
        },

        render : function() {
            this.clear();
            this.element.draw(this);
        }
    };

    module.exports = new renderer();
})
