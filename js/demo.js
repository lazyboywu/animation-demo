
require.register("demo", function(exports, require, module) {

    window.Core.init();
    module.exports = {
        list : function() {
            return [
                {name:'first', func:'first'},
                {name:'render rect', func:'renderRect'},
                {name:'render circle', func:'renderCircle'},
                {name:'render group', func:'renderGroup'},
                {name:'render style', func:'renderStyle'},
                {name:'render move to', func:'renderMoveTo'},
                {name:'render style animation', func:'renderStyleAnimation'},
                {name:'render grid', func:'renderGrid'},
                {name:'render grid animation', func:'renderGridAnimation'},
                {name:'render grid rand', func:'renderGridRand'},
            ];
        },
        first : function() {
            // 获取 canvas 元素，当然也可以用 jquery 的 $('renderer-canvas')
            var canvas = document.getElementById('renderer-canvas');
            var canvasContext2d = canvas.getContext('2d');

            canvasContext2d.fillStyle='#FF9933';
            canvasContext2d.fillRect(10, 10, 250, 180);
        },
        renderRect : function() {
            // 调用renderer
            var renderer = require('renderer');
            renderer.setCanvas(document.getElementById('renderer-canvas'));

            var ElementRect = require('Element/Rect');
            var rect = new ElementRect();

            rect.setColor('#FF9933');
            rect.setArea(10, 10, 250, 180);

            renderer.addElement(rect);
            renderer.render();
        },
        renderCircle : function() {
            // 调用renderer
            var renderer = require('renderer');
            renderer.setCanvas(document.getElementById('renderer-canvas'));

            var ElementCircle = require('Element/Circle');
            var circle = new ElementCircle();

            circle.setColor('#FF9933');
            circle.setArea(10, 10, 250, 250);

            renderer.addElement(circle);
            renderer.render();
        },
        renderGroup : function() {
            // 调用renderer
            var renderer = require('renderer');
            renderer.setCanvas(document.getElementById('renderer-canvas'));

            var ElementGroup = require('Element/Group');
            var group = new ElementGroup();
            group.setArea(100, 100, 200, 200);

            var ElementRect = require('Element/Rect');
            var rect = new ElementRect();
            rect.setColor('#FF9933');
            rect.setArea(0, 0, 100, 100);
            group.addChild(rect);

            var ElementCircle = require('Element/Circle');
            var circle = new ElementCircle();
            circle.setColor('#FF9933');
            circle.setArea(100, 0, 100, 100);
            group.addChild(circle);

            renderer.addElement(group);
            renderer.render();
        },
        renderStyle : function() {
            // 调用renderer
            var renderer = require('renderer');
            renderer.setCanvas(document.getElementById('renderer-canvas'));

            var ElementGroup = require('Element/Group');
            var group = new ElementGroup();
            group.setArea(0, 0, 640, 480);

            var ElementRect = require('Element/Rect');
            var rect = new ElementRect();
            rect.setColor('#FF9933');
            rect.setArea(20, 20, 200, 100);
            group.addChild(rect);

            rectOpacity = window.Core.clone(rect);
            rectOpacity.setArea(330, 20);
            rectOpacity.setOpacity(175);
            group.addChild(rectOpacity);

            rectScale = window.Core.clone(rect);
            rectScale.setArea(20, 200);
            rectScale.setScale(1.2);
            group.addChild(rectScale);

            rectRotate = window.Core.clone(rect);
            rectRotate.setArea(330, 200);
            rectRotate.setAngle(30);
            group.addChild(rectRotate);

            renderer.addElement(group);
            renderer.render();
        },
        renderMoveTo : function() {

            var ElementRect = require('Element/Rect');
            var rect = new ElementRect();

            rect.setColor('#FF9933');
            rect.setArea(10, 10, 250, 180);

            var AnimationMoveTo = require('Animation/MoveTo');
            var Point = require('Renderer/Point');
            rect.animate(AnimationMoveTo.create(2000, new Point(360, 10)));

            window.Core.renderer.addElement(rect);
            window.Core.run();

        },
        renderStyleAnimation : function() {

            var ElementGroup = require('Element/Group');
            var group = new ElementGroup();
            group.setArea(0, 0, 640, 480);

            var ElementRect = require('Element/Rect');
            var rect = new ElementRect();
            rect.setColor('#FF9933');
            rect.setArea(20, 20, 200, 100);
            group.addChild(rect);

            rectOpacity = window.Core.clone(rect);
            rectOpacity.setArea(330, 20);
            var AnimationFadeTo = require('Animation/FadeTo');
            rectOpacity.animate(AnimationFadeTo.create(1000, 0));
            group.addChild(rectOpacity);

            rectScale = window.Core.clone(rect);
            rectScale.setArea(20, 200);
            var AnimationScaleTo = require('Animation/ScaleTo');
            rectScale.animate(AnimationScaleTo.create(1000, 2.0));
            group.addChild(rectScale);

            rectRotate = window.Core.clone(rect);
            rectRotate.setArea(330, 200);
            var AnimationRotateTo = require('Animation/RotateTo');
            rectRotate.animate(AnimationRotateTo.create(1000, 360));
            group.addChild(rectRotate);

            window.Core.renderer.addElement(group);
            window.Core.run();
        },
        renderGrid : function() {

            // 调用renderer
            var renderer = require('renderer');
            renderer.setCanvas(document.getElementById('renderer-canvas'));

            // 获取 grid
            var GridBlind = require('Grid/Blind');
            var gridBlind = new GridBlind();
            gridBlind.setSize(50, 50);
            gridBlind.setAnimationProgress(0.1);

            var ElementRect = require('Element/Rect');
            var rect = new ElementRect();
            rect.setColor('#FF9933');
            rect.setArea(50, 50, 200, 200);
            rect.setGrid(gridBlind);

            renderer.addElement(rect);
            renderer.render();

        },
        renderGridAnimation : function() {

            // 调用renderer
            var renderer = require('renderer');
            renderer.setCanvas(document.getElementById('renderer-canvas'));

            var ElementRect = require('Element/Rect');
            var rect = new ElementRect();
            rect.setColor('#FF9933');
            rect.setArea(50, 50, 200, 200);

            var AnimationGridBlind = require('Animation/GridBlind');
            rect.animate(AnimationGridBlind.create({w:25, h:25}, 1000));

            window.Core.renderer.addElement(rect);
            window.Core.run();

        },
        renderGridRand : function() {

            // 调用renderer
            var renderer = require('renderer');
            renderer.setCanvas(document.getElementById('renderer-canvas'));

            var ElementRect = require('Element/Rect');
            var rect = new ElementRect();
            rect.setColor('#FF9933');
            rect.setArea(50, 50, 200, 200);

            var AnimationGridRand = require('Animation/GridRand');
            rect.animate(AnimationGridRand.create({w:25, h:25}, 1000));

            window.Core.renderer.addElement(rect);
            window.Core.run();

        }
    };

});
