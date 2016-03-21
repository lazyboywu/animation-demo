
require.register("Element/Grid", function(exports, require, module) {
    var ElementGroup = require('Element/Group');

    function Grid() {
        ElementGroup.apply(this);

        this.number = 1;
    }

    window.Core.extend(Grid, ElementGroup);

    Grid.prototype.setNumber = function(number) {
        this.number = number;
    }

    Grid.prototype.draw = function(renderer) {
        var c = renderer.getCanvasContext2d();
        c.save();

        var area = this.getArea();

        // 改变画布的顶点坐标为 Group 的顶点坐标
        c.translate(area.x, area.y);

        c.globalAlpha = this.opacity / 255;

        // 缩放
        this.scale(c);

        this.drawSelf(c);

        this.childImageDatas = [];

        var grids = this.splitGrids(this.number, this.number);
        var gridImageData = [];

        // 遍历所有子元素进行绘制
        if (this.childs.length > 0) {
            for (var i = 0; i < this.childs.length; i++) {
                this.childs[i].draw(renderer);

                // 将当前的元素内容保存下来
                gridImageData.push(this.copyChildGridImageData(c, grids));
            }
        }

        this.drawGrids(c, grids, gridImageData);

        c.restore();
    }

    // 根据分隔好的网格信息 grids 和网格图像数据 gridImageData 绘制
    Grid.prototype.drawGrids = function(c, grids, gridImageData) {
        var area = this.getArea();
        for (var i = 0; i < grids.length; i++) {
            var rowGrids = grids[i];
            for (var j = 0; j < rowGrids.length; j++) {
                var gridArea = rowGrids[j];
                this.drawGrid(c, i, j, area, gridArea, gridImageData);
            }
        }
    }

    Grid.prototype.drawGrid = function(c, row, col, area, gridArea, gridImageData) {
        var childGridImageData = gridImageData[0];
        var process = this.animationProgress;

        c.putImageData(
            childGridImageData[row][col],
            area.x + gridArea.x, area.y + gridArea.y,
            0, 0,
            gridArea.w * process, gridArea.h
        );
    }

    // 对已经进行分隔好的格子区域获取图像数据
    Grid.prototype.copyChildGridImageData = function(c, grids) {
        var area = this.getArea();
        var gridImageData = [];

        for (var i = 0; i < grids.length; i++) {
            var rowGrids = grids[i];
            var cellImageData = [];
            for (var j = 0; j < rowGrids.length; j++) {
                var gridArea = rowGrids[j];
                cellImageData.push(c.getImageData(area.x+gridArea.x, area.y+gridArea.y, gridArea.w, gridArea.h));
            }
            gridImageData.push(cellImageData);
        }
        return gridImageData;
    }

    // 按照指定 一行几个格子 和 一列几个格子 分隔网格
    Grid.prototype.splitGrids = function(row, col) {
        var area = this.getArea();
        var grids = [];

        var rowHeight = Math.ceil(area.h / row);
        var colWidth = Math.ceil(area.w / col);

        for (var i = 0; i < row; i++) {
            var rowGrids = [];
            for (var j = 0; j < col; j++) {
                var gridArea = {
                    x : j * colWidth,
                    y : i * rowHeight,
                    w : colWidth,
                    h : rowHeight
                };
                rowGrids.push(gridArea);
            }
            grids.push(rowGrids);
        }
        return grids;
    }

    module.exports = Grid;

});
