// Animation/IntervalTime 区间时间动画基类，给定时间执行动画的基础类

require.register("Animation/IntervalTime", function(exports, require, module) {
    var FiniteTime = require('Animation/FiniteTime');

    function IntervalTime() {
        FiniteTime.apply(this);

        // 消耗的时间
        this.elapsed = 0.0;

        // 是否第一次触发
        this.isFirstTick = true;

        this.isEnd = false;
    };

    window.Core.extend(IntervalTime, FiniteTime);

    // 防止除0
    IntervalTime.prototype.EPSILON = 2.2204460492503130808472633361816E-16;

    IntervalTime.prototype.getDuration = function() {
        return this.duration;
    };

    IntervalTime.prototype.isDone = function() {
        // 消耗的时间是否大于等于动画的总时间
        return this.isEnd && this.elapsed >= this.duration;
    };

    IntervalTime.prototype.start = function() {
        this.elapsed = 0;
        this.isFirstTick = true;
    };

    IntervalTime.prototype.setp = function(dt) {
        if (this.isFirstTick) {
            this.isFirstTick = false;
            this.elapsed = 0;
        } else {
            this.elapsed += dt;
        }

        var progress = Math.max(
            0,
            Math.min(
                1,
                this.elapsed / Math.max(this.duration, this.EPSILON)
            )
        );

        this.update(progress);

        if (progress == 1) {
            this.isEnd = true;
        }
    }

    module.exports = IntervalTime;

});
