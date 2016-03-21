// Animation/RotateTo 旋转动画

require.register("Animation/RotateTo", function(exports, require, module) {
    var IntervalTime = require('Animation/IntervalTime');

    function RotateTo() {
        IntervalTime.apply(this);

        // 开始角度
        this.startAngle = null;

        // 结束角度
        this.endAngle = null;

        // 相差的角度
        this.diffAngle = null;
    };

    window.Core.extend(RotateTo, IntervalTime);

    RotateTo.prototype.init = function(duration, angle) {
        this.duration = duration;
        this.endAngle = angle;
    };

    RotateTo.prototype.start = function() {
        // 调用基类
        this.super.start.call(this);
        this.diffAngle = this.endAngle - this.startAngle;
    };

    RotateTo.prototype.update = function(progress) {
        if (this.isDone()) {
            return;
        }

        if (this.target) {
            this.target.setAngle(
                this.startAngle + this.diffAngle * progress
            );
        }
    }

    RotateTo.prototype.setTarget = function(target) {
        // 调用基类
        this.super.setTarget.call(this, target);

        var angle = target.getAngle();
        if (angle > 0) {
            angle = angle % 360;
        } else {
            angle = angle % -360;
        }

        this.startAngle = angle;
    }

    RotateTo.create = function(duration, angle) {
        var animation = new RotateTo();
        animation.init(duration, angle);
        return animation;
    }

    module.exports = RotateTo;

});
