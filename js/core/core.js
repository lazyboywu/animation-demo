(function (w) {

    // 注册 jquery
    w.require.register("$", function(exports, require, module) {
        module.exports = w.jQuery;
    });

    Array.prototype.remove = function(index) {
        if (index < 0 || index >= this.length) {
            return this;
        }
        return this.slice(0, index).concat(this.slice(index + 1, this.length));
    }

    // 使用数组sort方法对数组元素随机排序
    Array.prototype.shuffle = function(n) {
        var len = this.length ,
            num = n ? Math.min(n,len) : len,
            arr = this.slice(0);
        arr.sort(function(a,b){
            return Math.random()-0.5;
        });
        return arr.slice(0,num-1);
    }

    if (!Array.prototype.fill) {
        Array.prototype.fill = function(value) {

        // Steps 1-2.
        if (this == null) {
            throw new TypeError('this is null or not defined');
        }

        var O = Object(this);

        // Steps 3-5.
        var len = O.length >>> 0;

        // Steps 6-7.
        var start = arguments[1];
        var relativeStart = start >> 0;

        // Step 8.
        var k = relativeStart < 0 ?
        Math.max(len + relativeStart, 0) :
        Math.min(relativeStart, len);

        // Steps 9-10.
        var end = arguments[2];
        var relativeEnd = end === undefined ?
        len : end >> 0;

        // Step 11.
        var final = relativeEnd < 0 ?
        Math.max(len + relativeEnd, 0) :
        Math.min(relativeEnd, len);

        // Step 12.
        while (k < final) {
            O[k] = value;
            k++;
        }

        // Step 13.
        return O;
        };
    }

    var Core = w.Core = {
        time : 0,
        fps : 60,
        renderer : null,
        animator : null,
        init : function() {
            this.renderer = require('renderer');
            this.renderer.setCanvas(document.getElementById('renderer-canvas'));

            this.animator = require('animator');
        },
        run : function() {

            // 第一次运行, 记录下时间
            if (this.time == 0) {
                this.time = +(new Date());
            }

            var time = +(new Date());
            var dt = time - this.time;
            this.time = time;

            this.animator.update(dt);

            this.renderer.render();

            if (this.animator.isDone()) {
                return;
            }

            // 定时器
            var that = this;
            setTimeout(function(){
                that.run();
            }, 1000 / this.fps);
        }
    };

    //类继承方法
    Core.extend = function(child, parent) {
        var F = function() {};
        F.prototype = parent.prototype;
        child.prototype = new F();
        child.prototype.constructor = child;

        child.prototype.super = parent.prototype;
        if(parent.prototype.constructor == parent.prototype.constructor) {
            parent.prototype.constructor = parent;
        }
    };

    Core.clone = function(p) {
        var c = {};
　　　　for (var i in p) {
　　　　　　if (typeof p[i] === 'object' && p[i] !== null) {
　　　　　　　　c[i] = (p[i].constructor === Array) ? [] : {};
　　　　　　　　Core.clone(p[i], c[i]);
　　　　　　} else {
　　　　　　　　　c[i] = p[i];
　　　　　　}
　　　　}
　　　　return c;
    }

})(window);
