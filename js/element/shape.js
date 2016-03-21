
require.register("Element/Shape", function(exports, require, module) {
    var ElementBase = require('Element/Base');

    function Shape() {
        ElementBase.apply(this);
        this.color = '';
    }

    window.Core.extend(Shape, ElementBase);

    Shape.prototype.setColor = function(color) {
        this.color = color;
    }

    module.exports = Shape;

});
