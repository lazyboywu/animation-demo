
require.register("animator", function(exports, require, module) {

    function TargetAnimation() {
        this.target = null;
        this.animations = [];

        this.isPaused = false;
    }

    TargetAnimation.prototype.getTarget = function() {
        return this.target;
    }

    TargetAnimation.prototype.setTarget = function(target) {
        this.target = target;
    }

    TargetAnimation.prototype.add = function(animation, isPaused) {
        this.animations.push(animation);
        animation.start();
        this.isPaused = !!isPaused;
        if (this.isPaused) {
            animation.pause();
        }
    }

    TargetAnimation.prototype.isDone = function() {
        for (var i = 0; i < this.animations.length; i++) {
            var animation = this.animations[i];
            if (!animation.isDone()) {
                return false;
            }
        }
        return true;
    }

    TargetAnimation.prototype.remove = function() {
        this.animations = [];
        this.target = null;
    }

    TargetAnimation.prototype.pause = function() {
        this.isPaused = true;
    }

    TargetAnimation.prototype.resume = function() {
        this.isPaused = false;
    }

    TargetAnimation.prototype.removeAnimation = function(animation) {
    }

    TargetAnimation.prototype.pauseAnimation = function(animation) {
    }

    TargetAnimation.prototype.resumeAnimation = function(animation) {
    }

    TargetAnimation.prototype.update = function(dt) {
        for (var i = 0; i < this.animations.length; i++) {
            var animation = this.animations[i];
            animation.setp(dt);

            // 完成则移除动画
            if (animation.isDone()) {
                animation.stop();
                this.animations.remove(i);
            }
        }
    }

    function Animator() {
        // 记录多个 TargetAnimation
        this.targetAnimations = [];
    }

    Animator.prototype.findTargetAnimationIndex = function(target) {
        var index = -1;
        for (var i = 0; i < this.targetAnimations.length; i++) {
            var targetAnimation = this.targetAnimations[i];
            if (targetAnimation.getTarget() == target) {
                index = i;
                break;
            }
        }
        return index;
    }

    Animator.prototype.findTargetAnimation = function(target) {
        var targetAnimation = null;
        var index = this.findTargetAnimationIndex(target);
        if (index > -1) {
            targetAnimation = this.targetAnimations[index];
        }
        return targetAnimation;
    }

    Animator.prototype.add = function(target, animation, isPaused) {
        var targetAnimation = this.findTargetAnimation(target);

        // 如果没有找到，则新建立一个
        if (targetAnimation == null) {
            targetAnimation = new TargetAnimation();
            targetAnimation.setTarget(target);
            this.targetAnimations.push(targetAnimation);
        }

        targetAnimation.add(animation, isPaused);
    }

    Animator.prototype.isDone = function() {
        for (var i = 0; i < this.targetAnimations.length; i++) {
            var targetAnimation = this.targetAnimations[i];
            if (!targetAnimation.isDone()) {
                return false;
            }
        }
        return true;
    }

    Animator.prototype.pauseAllAnimations = function() {

    }

    Animator.prototype.resumeAllAnimations = function() {

    }

    Animator.prototype.removeAllAnimations = function() {
        for (var i = 0; i < this.targetAnimations.length; i++) {
            this.targetAnimations[i].remove();
        }
        this.targetAnimations = [];
    }

    Animator.prototype.pauseTarget = function(target) {
        var targetAnimation = this.findTargetAnimation(target);

        if (targetAnimation != null) {
            targetAnimation.pause();
        }
    }

    Animator.prototype.resumeTarget = function(target) {
        var targetAnimation = this.findTargetAnimation(target);

        if (targetAnimation != null) {
            targetAnimation.resume();
        }
    }

    Animator.prototype.removeTarget = function(target) {
        var targetAnimation = this.findTargetAnimation(target);

        if (targetAnimation != null) {
            targetAnimation.remove();
        }
    }

    Animator.prototype.pauseTargetAnimation = function(target, animation) {
        var targetAnimation = this.findTargetAnimation(target);

        if (targetAnimation != null) {
            targetAnimation.pauseAnimation(animation);
        }
    }

    Animator.prototype.resumeTargetAnimation = function(target, animation) {
        var targetAnimation = this.findTargetAnimation(target);

        if (targetAnimation != null) {
            targetAnimation.resumeAnimation(animation);
        }
    }

    Animator.prototype.removeTargetAnimation = function(target, animation) {
        var targetAnimation = this.findTargetAnimation(target);

        if (targetAnimation != null) {
            targetAnimation.removeAnimation(animation);
        }
    }

    Animator.prototype.update = function(dt) {
        // @TODO加速判断
        // dt *= 0.1;
        for (var i = 0; i < this.targetAnimations.length; i++) {
            var targetAnimation = this.targetAnimations[i];
            targetAnimation.update(dt);
        }
    }

    module.exports = new Animator();
});
