require.register("Grid/Base", function(exports, require, module) {

    function Base() {
        this.w = 0;
        this.h = 0;

        this.canvasData = null;
        this.grids = [];
    }

    Base.prototype.setSize = function(w, h) {
        this.w = w;
        this.h = h;
    }

    Base.prototype.beforeDraw = function(renderer, element) {

        // 将 canvas 的数据保存下来
        this.canvasData = renderer.getFullScreen();
    }

    Base.prototype.afterDraw = function(renderer, element) {

        var gridImageData = this.copyChildGridImageData(renderer, element);

        // 还原之前的场景信息
        renderer.putFullScreen(this.canvasData);

        this.drawGrids(renderer, element, gridImageData);
    }

    // 根据分隔好的网格信息 grids 和网格图像数据 gridImageData 绘制
    Base.prototype.drawGrids = function(renderer, element, gridImageData) {

        var c = renderer.getCanvasContext2d();
        var grids = this.grids;
        var area = element.getArea();
        for (var i = 0; i < grids.length; i++) {
            var rowGrids = grids[i];
            for (var j = 0; j < rowGrids.length; j++) {
                var gridArea = rowGrids[j];
                this.drawGrid(c, element, i, j, gridArea, gridImageData[i][j]);
            }
        }
    }

    Base.prototype.drawGrid = function(c, element, row, col, gridArea, imageData) {
        var area = element.getArea();

        c.putImageData(
            imageData,
            area.x + gridArea.x, area.y + gridArea.y,
            0, 0,
            gridArea.w, gridArea.h
        );
    }

    // 对已经进行分隔好的格子区域获取图像数据
    Base.prototype.copyChildGridImageData = function(renderer, element) {
        var c = renderer.getCanvasContext2d();
        var grids = this.grids;
        var area = element.getArea();
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
    Base.prototype.splitGrids = function(element) {
        var area = element.getArea();
        var grids = [];

        var row = Math.ceil(area.h / this.h);
        var col = Math.ceil(area.w / this.w);

        for (var i = 0; i < row; i++) {
            var rowGrids = [];
            for (var j = 0; j < col; j++) {
                var gridArea = {
                    x : i * this.h,
                    y : j * this.w,
                    w : this.w,
                    h : this.h
                };
                rowGrids.push(gridArea);
            }
            grids.push(rowGrids);
        }
        this.grids = grids;
    }

    module.exports = Base;
});
