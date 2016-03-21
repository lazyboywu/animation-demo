require.register("Animation/GridBlind", function(exports, require, module) {
    var GridBase = require('Animation/GridBase');

    function GridBlind() {
        GridBase.apply(this);

        this.gridSize = null;
    };

    window.Core.extend(GridBlind, GridBase);

    GridBlind.prototype.start = function() {
        // 调用基类
        this.super.start.call(this);
        var Blind = require('Grid/Blind');
        var blind = new Blind();
        blind.setSize(this.gridSize.w, this.gridSize.h);
        this.target.setGrid(blind);
        this.grid = blind;
    };

    GridBlind.prototype.update = function(progress) {
        if (this.isDone()) {
            return;
        }

        if (this.target) {
            this.grid.setAnimationProgress(progress);
        }
    }

    GridBlind.create = function(gridSize, duration) {
        var animation = new GridBlind();
        animation.init(gridSize, duration);
        return animation;
    }

    module.exports = GridBlind;

});
