

function main() {

    var demo = require("demo");

    var demos = demo.list();
    for (var i = 0; i < demos.length; i++) {
        insertDemoButton(demos[i].name, demo[demos[i].func]);
    }
}

function insertDemoButton(demoName, demoFunc) {
    var $ = require('$');

    $('#button-container').append($('<button/>')
        .html(demoName)
        .addClass("btn btn-default")
        .on('click', function() {
            displayDemoCode(demoFunc);
            demoFunc();
        })
    ).append("<br/>");
}

function displayDemoCode(demoFunc) {

    var text = demoFunc.toString()
        .replace(new RegExp('        ', 'g'), '')
        .replace(new RegExp('<', 'g'), '&lt;')
        .replace(new RegExp('>', 'g'), '&gt;');

    $('#code-container').html("<pre>" + text + "</pre>");
}

// function xxxDemo() {
//     // 调用renderer
//     var renderer = require('renderer');
//     renderer.setCanvas(document.getElementById('renderer-canvas'));
//     console.log(renderer);
// }





