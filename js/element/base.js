
require.register("Element/Base", function(exports, require, module) {

    var Point = require('Renderer/Point');

    function Base() {

        // 坐标区域
        this.x = 0;
        this.y = 0;
        this.w = 0;
        this.h = 0;

        // 透明度（0-255）
        this.opacity = 255;

        // 缩放相关（0.0-1.0）
        this.scaleX = 1.0;
        this.scaleY = 1.0;

        // 翻转相关
        this.flippedX = false;
        this.flippedY = false;

        // 旋转相关（0-360）
        this.angle = 0;

        // 动画进度
        this.animationProgress = 0;

        // 网格相关
        this.hasGrid = false;
        this.grid = null;
    }

    Base.prototype.getPosition = function() {
        return new Point(this.x, this.y);
    }

    // Renderer/Point
    Base.prototype.setPosition = function(point) {
        this.x = point.x;
        this.y = point.y;
    }

    Base.prototype.getArea = function() {
        return {
            x : this.x,
            y : this.y,
            w : this.w,
            h : this.h
        };
    };

    Base.prototype.setArea = function(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w || this.w;
        this.h = h || this.h;
    }

    Base.prototype.getOpacity = function(opacity) {
        return this.opacity;
    }

    Base.prototype.setOpacity = function(opacity) {
        if (opacity > 255) {
            opacity = 255;
        } else if (opacity <= 0) {
            opacity = 0;
        }
        this.opacity = opacity;
        this.change = true;
    }

    Base.prototype.getScale = function() {
        return this.scaleX;
    }

    Base.prototype.setScale = function(scale) {
        this.scaleX = this.scaleY = scale;
    }

    Base.prototype.getScaleX = function() {
        return this.scaleX;
    }
    Base.prototype.setScaleX = function(scaleX) {
        this.scaleX = scaleX;
    }

    Base.prototype.getScaleY = function() {
        return this.scaleY;
    }
    Base.prototype.setScaleY = function(scaleY) {
        this.scaleY = scaleY;
    }

    Base.prototype.scale = function(c) {
        if (this.scaleX != 1.0 || this.scaleY != 1.0) {
            var area = this.getArea();

            c.translate((area.w * (1 - this.scaleX) / 2), (area.h * (1 - this.scaleY) / 2));
            c.scale(this.scaleX, this.scaleY);
        }
    }

    Base.prototype.setFlippedX = function(flippedX) {
        this.flippedX = !!flippedX;
    }
    Base.prototype.setFlippedY = function(flippedY) {
        this.flippedY = !!flippedY;
    }
    Base.prototype.flip = function(c) {
        if (this.flippedX || this.flippedY) {
            var rect = this.getRect();

            // 这里加上2倍距离才是翻转的位置（还是坐标的问题啊 - -!)
            var x = this.flippedX ? rect.x + rect.width + rect.x : 0;
            var y = this.flippedY ? rect.y + rect.height + rect.y : 0;
            c.translate(x, y);
            var x = this.flippedX ? -1 : 1;
            var y = this.flippedY ? -1 : 1;
            c.transform(x, 0, 0, y, 0, 0);
        }
    }

    Base.prototype.getAngle = function() {
        return this.angle;
    }
    Base.prototype.setAngle = function(angle) {
        this.angle = angle;
    }
    Base.prototype.rotate = function(c) {
        if (this.angle != 0) {
            var area = this.getArea();

            c.translate(area.w / 2, area.h / 2);

            c.rotate(this.angle * Math.PI / 180);

            // var cosVal = Math.cos(this.angle * Math.PI / 180);
            // var sinVal = Math.sin(this.angle * Math.PI / 180);
            // c.transform(cosVal.toFixed(6), sinVal.toFixed(6), (-1 * sinVal).toFixed(6), cosVal.toFixed(6), 0, 0);
        }
    }

    // 绘制相关
    Base.prototype.draw = function(renderer) {
        var c = renderer.getCanvasContext2d();
        c.save();

        // 移动到绘制的顶点坐标
        var area = this.getArea();
        c.translate(area.x, area.y);

        if (this.hasGrid) {
            this.grid.beforeDraw(renderer, this);
        }

        // 设置透明度
        c.globalAlpha = this.opacity / 255;

        // 缩放
        this.scale(c);

        // 旋转
        this.rotate(c);

        this.drawSelf(c);

        if (this.hasGrid) {
            this.grid.afterDraw(renderer, this);
        }

        c.restore();
    }

    Base.prototype.drawSelf = function(c) {
        // nothing
    }

    // 设置网格结构
    Base.prototype.setGrid = function(grid) {
        this.hasGrid = true;
        this.grid = grid;
        // @todo 这里要检测 element 的 w h 是否设置
        this.grid.splitGrids(this);
    }

    // 运行动画
    Base.prototype.animate = function(animation) {
        animation.setTarget(this);
        //animation.start();
        window.Core.animator.add(this, animation);
    }

    module.exports = Base;

});
