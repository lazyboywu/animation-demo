
require.register("Element/Rect", function(exports, require, module) {
    var ElementShape = require('Element/Shape');

    function Rect() {
        ElementShape.apply(this);
        this.color = '';
    }

    window.Core.extend(Rect, ElementShape);

    Rect.prototype.drawSelf = function(c) {
        var area = this.getArea();
        c.fillStyle = this.color;

        var x = y = 0;

        // 旋转的话，需要将坐标偏移
        if (this.angle != 0) {
            x = -(area.w / 2);
            y = -(area.h / 2);
        }

        c.fillRect(x, y, area.w, area.h);
        //c.strokeRect(x, y, area.w, area.h);
    }

    module.exports = Rect;

});
