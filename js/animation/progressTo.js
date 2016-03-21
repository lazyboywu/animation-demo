// Animation/ProgressTo 时间进度动画

require.register("Animation/ProgressTo", function(exports, require, module) {
    var IntervalTime = require('Animation/IntervalTime');

    function ProgressTo() {
        IntervalTime.apply(this);
    };

    window.Core.extend(ProgressTo, IntervalTime);

    ProgressTo.prototype.init = function(duration) {
        this.duration = duration;
    };

    ProgressTo.prototype.start = function() {
        // 调用基类
        this.super.start.call(this);
    };

    ProgressTo.prototype.update = function(progress) {
        if (this.isDone()) {
            return;
        }

        if (this.target) {
            this.target.setAnimationProgress(progress);
        }
    }

    ProgressTo.prototype.setTarget = function(target) {
        // 调用基类
        this.super.setTarget.call(this, target);
    }

    ProgressTo.create = function(duration) {
        var animation = new ProgressTo();
        animation.init(duration);
        return animation;
    }

    module.exports = ProgressTo;

});
