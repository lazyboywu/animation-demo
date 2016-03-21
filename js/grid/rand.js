require.register("Grid/Rand", function(exports, require, module) {

    var GridBase = require('Grid/Base');

    function Rand() {
        GridBase.apply(this);

        this.animationProgress = 0;

        this.total = 0;
        this.rows = 0;
        this.cols = 0;
        this.draweds = null;
    }

    window.Core.extend(Rand, GridBase);

    // 动画执行进度
    Rand.prototype.setAnimationProgress = function(progress) {
        this.animationProgress = progress;

        var randArr = [];
        for (var i = 0; i < this.draweds.length; i++) {
            if (this.draweds[i] == 0) {
                randArr.push(i);
            }
        }

        var randNum = Math.ceil(this.total * this.animationProgress) - (this.draweds.length - randArr.length);

        if (progress != 1) {
            randArr = randArr.shuffle().slice(0, randNum);
        }

        for (var i = 0; i < this.draweds.length; i++) {
            if (randArr.indexOf(i) > -1) {
                this.draweds[i] = 1;
            }
        }
    }

    Rand.prototype.splitGrids = function(element) {
        this.super.splitGrids.apply(this, arguments);

        if (this.draweds == null) {
            this.rows = this.grids.length;
            this.cols = this.grids[0].length;
            var total = this.rows * this.cols;
            this.draweds = (new Array(total)).fill(0);
            this.total = total;
        }
    }

    Rand.prototype.drawGrid = function(c, element, row, col, gridArea, imageData) {
        var area = element.getArea();
//console.log(row * this.cols + col);
        if (this.draweds[row * this.cols + col] == 1) {
            c.putImageData(
                imageData,
                area.x + gridArea.x, area.y + gridArea.y,
                0, 0,
                gridArea.w, gridArea.h
            );
        }
    }

    module.exports = Rand;

});
