
require.register("Renderer/Point", function(exports, require, module) {

    function Point(x, y) {
        this.x = x;
        this.y = y;
    }

    // 坐标相加
    Point.prototype.add = function (otherPoint) {
        return new Point(this.x + otherPoint.x, this.y + otherPoint.y);
    }

    // 坐标相减
    Point.prototype.sub = function (otherPoint) {
        return new Point(this.x - otherPoint.x, this.y - otherPoint.y);
    }

    module.exports = Point;
});
