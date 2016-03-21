// Animation/FadeTo 旋转动画

require.register("Animation/FadeTo", function(exports, require, module) {
    var IntervalTime = require('Animation/IntervalTime');

    function FadeTo() {
        IntervalTime.apply(this);

        // 开始透明度
        this.startOpacity = null;

        // 结束透明度
        this.endOpacity = null;

        // 记录下偏移
        this.delta = null;
    };

    window.Core.extend(FadeTo, IntervalTime);

    FadeTo.prototype.init = function(duration, opacity) {
        // 调用基类
        this.super.start.call(this);
        this.duration = duration;
        this.endOpacity = opacity;
    };

    FadeTo.prototype.start = function() {
        this.delta = this.endOpacity - this.startOpacity;
    };

    FadeTo.prototype.update = function(progress) {
        if (this.isDone()) {
            return;
        }

        if (this.target) {
            this.target.setOpacity(
                this.startOpacity + this.delta * progress
            );
        }
    }

    FadeTo.prototype.setTarget = function(target) {
        // 调用基类
        this.super.setTarget.call(this, target);

        this.startOpacity = target.getOpacity();
    }

    FadeTo.create = function(duration, opacity) {
        var animation = new FadeTo();
        animation.init(duration, opacity);
        return animation;
    }

    module.exports = FadeTo;

});
