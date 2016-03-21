// Animation/MoveTo 移动动画

require.register("Animation/MoveTo", function(exports, require, module) {
    var IntervalTime = require('Animation/IntervalTime');
    var Point = require('Renderer/Point');

    function MoveTo() {
        IntervalTime.apply(this);

        // 开始点
        this.startPosition = null;

        // 结束点
        this.endPosition = null;

        // 记录下偏移
        this.delta = null;
    };

    window.Core.extend(MoveTo, IntervalTime);

    MoveTo.prototype.init = function(duration, position) {
        this.duration = duration;
        this.endPosition = position;
    };

    MoveTo.prototype.start = function() {
        // 调用基类
        this.super.start.call(this);
        this.delta = this.endPosition.sub(this.startPosition);
    };

    MoveTo.prototype.update = function(progress) {
        if (this.isDone()) {
            return;
        }

        if (this.target) {
            this.target.setPosition(new Point(
                this.startPosition.x + this.delta.x * progress,
                this.startPosition.y + this.delta.y * progress
            ));
        }
    }

    MoveTo.prototype.setTarget = function(target) {
        // 调用基类
        this.super.setTarget.call(this, target);

        this.startPosition = target.getPosition();
    }

    MoveTo.create = function(duration, point) {
        var animation = new MoveTo();
        animation.init(duration, point);
        return animation;
    }

    module.exports = MoveTo;

});
