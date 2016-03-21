
require.register("Element/Circle", function(exports, require, module) {
    var ElementShape = require('Element/Shape');

    function Circle() {
        ElementShape.apply(this);
        this.color = '';
    }

    window.Core.extend(Circle, ElementShape);

    Circle.prototype.setArea = function(x, y, w, h) {
        h = w; // 正圆形
        this.super.setArea.apply(this, arguments);
    }

    Circle.prototype.drawSelf = function(c) {
        var area = this.getArea();

        var radius = Math.floor(area.w / 2);

        c.beginPath();
        c.arc(radius, radius, Math.floor(area.w / 2), 0, Math.PI * 2, true);
        c.closePath();
        c.fillStyle = this.color;
        c.fill();
        //c.stroke();
    }

    module.exports = Circle;

});
