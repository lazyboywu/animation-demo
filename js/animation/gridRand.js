require.register("Animation/GridRand", function(exports, require, module) {
    var GridBase = require('Animation/GridBase');

    function GridRand() {
        GridBase.apply(this);

        this.gridSize = null;
    };

    window.Core.extend(GridRand, GridBase);

    GridRand.prototype.start = function() {
        // 调用基类
        this.super.start.call(this);
        var Rand = require('Grid/Rand');
        var rand = new Rand();
        rand.setSize(this.gridSize.w, this.gridSize.h);
        this.target.setGrid(rand);
        this.grid = rand;
    };

    GridRand.prototype.update = function(progress) {
        if (this.isDone()) {
            return;
        }

        if (this.target) {
            this.grid.setAnimationProgress(progress);
        }
    }

    GridRand.create = function(gridSize, duration) {
        var animation = new GridRand();
        animation.init(gridSize, duration);
        return animation;
    }

    module.exports = GridRand;

});
