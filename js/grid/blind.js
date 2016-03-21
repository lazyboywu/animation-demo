require.register("Grid/Blind", function(exports, require, module) {

    var GridBase = require('Grid/Base');

    function Blind() {
        GridBase.apply(this);

        this.animationProgress = 0;
    }

    window.Core.extend(Blind, GridBase);

    // 动画执行进度
    Blind.prototype.setAnimationProgress = function(progress) {
        this.animationProgress = progress;
    }

    Blind.prototype.drawGrid = function(c, element, row, col, gridArea, imageData) {
        var area = element.getArea();

        c.putImageData(
            imageData,
            area.x + gridArea.x, area.y + gridArea.y,
            0, 0,
            gridArea.w, gridArea.h * this.animationProgress
        );
    }

    module.exports = Blind;

});
