
require.register("Animation/Base", function(exports, require, module) {
    function Base() {
        this.target = null;
    }

    /**
     * 实例方法(集中在一起定义会好点么？)
     */
    Base.prototype = {
        isDone: function() {
            // 默认返回true，需要子类实现控制
            return true;
        },

        start: function() {
            // @TODO 这里暂且先占位吧
        },

        stop: function() {
            this.target = null;
        },

        // 每次更新周期动画进度计算，得出update用到progress
        step: function(dt) {
            console.log('需要子类实现');
        },

        /**
         * 动画进度映射计算
         * progress 进度值，取值范围(0-1)，0未开始，1结束
         */
        update: function(progress) {
            console.log('需要子类实现');
        },

        setTarget: function(node) {
            this.target = node;
        },

        getTarget: function() {
            return target;
        }
    };

    /**
     * 静态方法
     */
    Base.create = function() {
        console.log('需要子类实现');
    }

    module.exports = Base;
});
