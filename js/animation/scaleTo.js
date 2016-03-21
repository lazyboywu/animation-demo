// Animation/ScaleTo 旋转动画

require.register("Animation/ScaleTo", function(exports, require, module) {
    var IntervalTime = require('Animation/IntervalTime');

    function ScaleTo() {
        IntervalTime.apply(this);

        // 开始大小
        this.startScaleX = null;
        this.startScaleY = null;

        // 结束大小
        this.endScaleX = null;
        this.endScaleY = null;

        // 记录下偏移
        this.deltaX = null;
        this.deltaY = null;
    };

    window.Core.extend(ScaleTo, IntervalTime);

    ScaleTo.prototype.init = function(duration, sx, sy) {
        this.duration = duration;

        this.endScaleX = sx;

        if (sy) {
            this.endScaleY = sy;
        } else {
            this.endScaleY = this.endScaleX;
        }
    };

    ScaleTo.prototype.start = function() {
        // 调用基类
        this.super.start.call(this);
        this.deltaX = this.endScaleX - this.startScaleX;
        this.deltaY = this.endScaleY - this.startScaleY;
    };

    ScaleTo.prototype.update = function(progress) {
        if (this.isDone()) {
            return;
        }

        if (this.target) {
            this.target.setScaleX(
                this.startScaleX + this.deltaX * progress
            );

            this.target.setScaleY(
                this.startScaleY + this.deltaY * progress
            );
        }
    }

    ScaleTo.prototype.setTarget = function(target) {
        // 调用基类
        this.super.setTarget.call(this, target);

        this.startScaleX = target.getScaleX();
        this.startScaleY = target.getScaleY();
    }

    ScaleTo.create = function(duration, sx, sy) {
        var animation = new ScaleTo();
        animation.init(duration, sx, sy);
        return animation;
    }

    module.exports = ScaleTo;

});
