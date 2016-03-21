// Animation/FiniteTime 限定时间动画基类，根据时间执行动画的基础类

require.register("Animation/FiniteTime", function(exports, require, module) {
    var Base = require('Animation/Base');

    function FiniteTime() {
        Base.apply(this);

        // 限定的时间长度
        this.duration = 0;
    };

    window.Core.extend(FiniteTime, Base);

    FiniteTime.prototype.getDuration = function() {
        return this.duration;
    };

    FiniteTime.prototype.setDuration = function(duration) {
        this.duration = duration;
    };

    module.exports = FiniteTime;
});
