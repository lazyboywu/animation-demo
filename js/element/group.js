
require.register("Element/Group", function(exports, require, module) {
    var ElementBase = require('Element/Base');

    function Group() {
        ElementBase.apply(this);

        // 子父层级控制
        this.childs = [];
    }

    window.Core.extend(Group, ElementBase);

    Group.prototype.addChild = function(child) {
        this.childs.push(child);
    }

    Group.prototype.draw = function(renderer) {
        var c = renderer.getCanvasContext2d();
        c.save();

        var area = this.getArea();

        // 改变画布的顶点坐标为 Group 的顶点坐标
        c.translate(area.x, area.y);

        // 限制可绘制的区域
        c.rect(0, 0, area.w, area.h);
        c.clip();

        c.globalAlpha = this.opacity / 255;

        // 缩放
        this.scale(c);

        this.drawSelf(c);

        // 遍历所有子元素进行绘制
        if (this.childs.length > 0) {
            for (var i = 0; i < this.childs.length; i++) {
                this.childs[i].draw(renderer);
            }
        }

        c.restore();
    }

    module.exports = Group;

});
