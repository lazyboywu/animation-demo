require.register("Animation/GridBase", function(exports, require, module) {
    var IntervalTime = require('Animation/IntervalTime');

    function GridBase() {
        IntervalTime.apply(this);

        this.gridSize = null;
        this.grid = null;
    };

    window.Core.extend(GridBase, IntervalTime);

    GridBase.prototype.init = function(gridSize, duration) {
        this.gridSize = gridSize;
        this.duration = duration;
    };

    module.exports = GridBase;

});
