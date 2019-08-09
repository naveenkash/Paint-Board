var canvas = document.querySelector('#canvas');
var btn = document.getElementById('button');
var undo = document.getElementById('undo');
var range = document.getElementById('range');
var rangeOpacity = document.getElementById('rangeOpacity');
var lineWidth = document.getElementById('line-width');
var lineOpacity = document.getElementById('line-Opacity');
var colorInput = document.getElementById('color-input');
var canCon = document.getElementById('can-con');
var brushId = document.getElementById('brushId');
var colorWrapper = document.getElementById('colorWrapper');
var colorBox = document.getElementsByClassName('colorBox');
var brushImage = document.getElementsByClassName('brush-image');
var save = document.getElementById('download');
var thickbrush = document.getElementById('thickbrush');
var glow = document.getElementById('glow');
var brushname = document.getElementById('brushname');
var erase = document.getElementById('erase');
var marker = document.getElementById('marker');
var calligraphy = document.getElementById('calligrapgy-pen');



// var line = 5;
var nreLineWidth=4;
var Opacity=100;
var newColor = 'black';
var refresh;

var newColorArray = ['blue', 'green', 'indigo', 'violet', 'red', 'magenta', 'skyblue', 'white', 'black', 'dodgerblue', 'coral', 'aqua'];

colorInput.value = '#222323';
lineWidth.innerHTML = nreLineWidth;
lineOpacity.innerHTML = rangeOpacity.value + '%'

brushId.classList.add('addBrush');
range.value=nreLineWidth;
range.addEventListener('change', function () {
    lineWidth.innerHTML = range.value;
    nreLineWidth = range.value;
})

rangeOpacity.value=Opacity;
lineOpacity.innerHTML = Opacity + '%';
rangeOpacity.addEventListener('change', function () {
    lineOpacity.innerHTML = rangeOpacity.value + '%';
    Opacity = rangeOpacity.value;
    console.log('rangeOpacity listener'+Opacity);
    
})

for (let i = 0; i < newColorArray.length; i++) {
    // for (let j = 0; j < newColorArray.length; j++) {
    var newdiv = document.createElement('div');
    newdiv.classList.add('colorBox');
    newdiv.style.background = newColorArray[i];
    colorWrapper.appendChild(newdiv);
    // console.log(newColorArray[i]);
    // }
}

for (let i = 0; i < colorBox.length; i++) {
    const colorbox = colorBox[i]
    colorbox.addEventListener('click', function () {
        newColor = colorbox.style.background;
        console.log(colorbox.style.background);
    });
}

btn.addEventListener('mousedown', function () {
    btn.classList.add('skrink');
    console.log('mousedown');

});
btn.addEventListener('mouseup', function () {
    btn.classList.remove('skrink');
    console.log('mouseup');

})
btn.addEventListener('mouseleave', function () {
    btn.classList.remove('skrink');
    console.log('mouseleave');
    return

})
btn.addEventListener('click', function (e) {
    refresh = !refresh;

    if (refresh) {

        // brushId.classList.add('addBrush');
        brushId.classList.add('hidebrush');

        brushId.classList.remove('addBrush');
    } else {

        // brushId.classList.remove('addBrush');

        brushId.classList.remove('hidebrush');
        brushId.classList.add('addBrush');
    }
    // draw(e);
})
colorInput.addEventListener('input', function () {
    newColor = colorInput.value;
    console.log(newColor);
})

save.addEventListener('click', function () {
    var img = canvas.toDataURL("image/png").replace("image/png");
    console.log('<img src="' + img + '"/>');

    var link = document.getElementById('downloadLink');
    link.setAttribute('download', 'paint.png');
    link.setAttribute('href', img);
    link.click();
})

var spray = false;
var glowwrite = false;
var eraseCnavas = false;
var markerPen = true;
var calligraphyPen = false;
marker.classList.add('glowbrush');
brushname.innerHTML = 'Marker';

thickbrush.addEventListener('click', function () {
    spray = true;
    eraseCnavas = false;
    glowwrite = false;
    markerPen = false;
    calligraphyPen = false;
    brushname.innerHTML = 'Spray can';
    thickbrush.classList.add('glowbrush');
    glow.classList.remove('glowbrush');
    erase.classList.remove('glowbrush');
    marker.classList.remove('glowbrush');
    calligraphy.classList.remove('glowbrush');
})

glow.addEventListener('click', function () {
    spray = false;
    eraseCnavas = false;
    glowwrite = true;
    markerPen = false;
    calligraphyPen = false;
    brushname.innerHTML = 'Glow';
    glow.classList.add('glowbrush');
    thickbrush.classList.remove('glowbrush');
    erase.classList.remove('glowbrush');
    marker.classList.remove('glowbrush');
    calligraphy.classList.remove('glowbrush');
})
erase.addEventListener('click', function () {
    eraseCnavas = true;
    spray = false;
    glowwrite = false;
    markerPen = false;
    calligraphyPen = false;
    brushname.innerHTML = 'Eraser';
    erase.classList.add('glowbrush');
    thickbrush.classList.remove('glowbrush');
    glow.classList.remove('glowbrush');
    calligraphy.classList.remove('glowbrush');
    marker.classList.remove('glowbrush');
})
marker.addEventListener('click', function () {
    eraseCnavas = false;
    spray = false;
    glowwrite = false;
    markerPen = true;
    calligraphyPen = false;
    brushname.innerHTML = 'Marker';
    erase.classList.remove('glowbrush');
    thickbrush.classList.remove('glowbrush');
    glow.classList.remove('glowbrush');
    marker.classList.add('glowbrush');
    calligraphy.classList.remove('glowbrush');
})
calligraphy.addEventListener('click', function () {
    eraseCnavas = false;
    spray = false;
    glowwrite = false;
    markerPen = false;
    calligraphyPen = true;
    brushname.innerHTML = 'Calligraphy pen';
    erase.classList.remove('glowbrush');
    thickbrush.classList.remove('glowbrush');
    glow.classList.remove('glowbrush');
    marker.classList.remove('glowbrush');
    calligraphy.classList.add('glowbrush');
})

function getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
}
canvas.width = 1080;
canvas.height = 720;

var c = canvas.getContext('2d');

c.lineCap = 'round';
c.strokeStyle = newColor;
var painting;

let linesArray = [];
let points = [];


var mouse = {
    x: 0,
    y: 0
};
var previous = {
    x: 0,
    y: 0
};

function startPainting(e) {
    c.beginPath();
    // exitdraw(e);
    painting = true;

    // spray=true;
    previous = {
        x: mouse.x,
        y: mouse.y
    };
    points = [];
    mouse = oMousePos(canvas, e);
    draw(e);
    console.log('this is points arr = ' + JSON.stringify(points));

}

function finishedPainting(e) {
    painting = false;
    linesArray.push(points);
    console.log('finishedPainting ' + points.length + ' points length ' + linesArray.length + ' linesarray length ');

    points = [];
    // Adding the path to the array or the paths
    c.beginPath();
    // spray=false;
}

function draw(e) {
    if (painting) {

        previous = {
            x: mouse.x,
            y: mouse.y
        };
        mouse = oMousePos(canvas, e);

        points.push({
            x: mouse.x,
            y: mouse.y,
            color: newColor,
            lineWidth: nreLineWidth,
            isEraser: eraseCnavas,
            isMarker: markerPen,
            isSpray: spray,
            isGlow: glowwrite,
            iscaligraphyPen: calligraphyPen,
            opacity: Opacity,

        });
        c.beginPath();
        c.moveTo(previous.x, previous.y);

        if (markerPen) {
            drawMarker(mouse.x, mouse.y, newColor, nreLineWidth);
            return;
        }
        if (eraseCnavas) {
            drawEraser(mouse.x, mouse.y, nreLineWidth);
            return;
        }
        if (glowwrite) {
            drawGlowMarker(mouse.x, mouse.y, newColor, nreLineWidth);
            return;
        }
        if (spray) {
            drawSpray(mouse.x, mouse.y, Opacity, newColor);
            return;
        }
        if (calligraphyPen) {
            drawCaligraphy(mouse.x, mouse.y, newColor, Opacity);
        }
    }

}

function drawMarker(x, y, color, lineWidth) {
    console.log('draw marker x = ' + x + 'y = ' + y);
    console.log(' marker linewidth = '+lineWidth);
    c.globalAlpha = 1;
    c.strokeStyle = color;
    c.lineWidth = lineWidth;
    c.lineTo(x, y);
    c.stroke();
}

function drawEraser(x, y, lineWidth) {
    c.globalAlpha = 1;
    c.strokeStyle = 'rgba(255, 255, 255,1)';
    c.lineWidth = lineWidth;
    c.lineTo(x, y);
    c.stroke();

}

function drawSpray(x, y, opacity, color) {

    var density = 100;
    //console.log('pushing to pints length = ' + points.length);
    //drawing a line from the previous point to the current point.
    c.globalAlpha = Math.floor(opacity) / 100;
    for (var i = density; i--;) {
        var dx = -20 + Math.random() * 40;
        var dy = -20 + Math.random() * 40;
        var distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
        // console.log(distance + 'distance');

        if (distance < 20) {
            c.fillStyle = color;
            c.fillRect(
                x + dx,
                y + dy,
                1, 1);
        }

    }
    c.globalAlpha = 1;
}

function drawGlowMarker(x, y, color, linewidth) {
    
    c.globalAlpha = 1;
    c.strokeStyle = color;
    c.lineWidth = linewidth;
    c.lineTo(x, y);
    c.shadowBlur = 10;
    c.shadowColor = color;
    c.stroke();
    c.shadowBlur = 0;
    c.shadowColor = 'none';
}

function drawCaligraphy(x, y, color, opacity) {
    console.log(' drawCaligraphy opacity = '+ opacity + " global Opacity = "+Opacity);

    c.strokeStyle = color;
    c.lineWidth = 3;
    c.lineCap = 'round'
    c.globalAlpha = opacity / 100;
    c.moveTo(previous.x, previous.y);
    c.lineTo(x, y);
    c.stroke();

    c.moveTo(previous.x - 2, previous.y - 2);
    c.lineTo(x - 2, y - 2);
    c.stroke();

    c.moveTo(previous.x - 2, previous.y - 2);
    c.lineTo(x - 2, y - 2);
    c.stroke();

    c.moveTo(previous.x + 2, previous.y + 2);
    c.lineTo(x + 2, y + 2);
    c.stroke();

    c.moveTo(previous.x + 4, previous.y + 4);
    c.lineTo(x + 4, y + 4);
    
    c.stroke();
}

function decelerate(x) {
    return (1.0 - Math.pow((1.0 - x), 2 * 3))
}

function oMousePos(canvas, evt) {
    var ClientRect = canvas.getBoundingClientRect();
    return { //objeto
        x: Math.round(evt.clientX - ClientRect.left),
        y: Math.round(evt.clientY - ClientRect.top)
    }
}
console.log(canvas.offsetHeight);
console.log(canvas.offsetWidth);

function exitdraw(e) {
    console.log('mouse x = ' + mouse.x + 'mouse.y = ' + mouse.y);
    stopDraw();
}

function stopDraw() {
    painting = false;
}

undo.addEventListener("click", Undo);

function drawPaths() {
    // delete everything
    c.clearRect(0, 0, canvas.width, canvas.height);
    if (linesArray.length === 0) {
        return;
    }
    console.log(linesArray.length + ' lines array ');

    for (let j = 0; j < linesArray.length; j++) {
        points = linesArray[j];

        previous.x = points[0].x
        previous.y = points[0].y
        console.log(points.length);
        console.table(points);
        
        for (let i = 1; i < points.length; i++) {
            const element = points[i];
            const Opi = element.opacity;
            // console.log('Opi '+Opi);
            
            c.beginPath();
            c.moveTo(previous.x, previous.y);
            if (element.isEraser) {
                drawEraser(element.x, element.y, element.lineWidth);
            } else if (element.isGlow) {
                drawGlowMarker(element.x, element.y, element.color, element.lineWidth);
            } else if (element.isSpray) {
                console.log('drawPaths isSpray ');
                drawSpray(element.x, element.y, Opi, element.color);
            } else if (element.iscaligraphyPen) {
                drawCaligraphy(element.x, element.y, element.color, Opi);
            } else {
                console.log('drawPaths marker ');

                drawMarker(element.x, element.y, element.color, element.lineWidth);
            }
            previous.x = element.x
            previous.y = element.y
        }
    }
}



undo.addEventListener('mousedown', function () {
    undo.classList.add('skrink');
    console.log('mousedown');

});
undo.addEventListener('mouseup', function () {
    undo.classList.remove('skrink');
    console.log('mouseup');

})
undo.addEventListener('mouseleave', function () {
    undo.classList.remove('skrink');
    console.log('mouseleave');
    return;
})

function Undo() {
    // remove the last path from the paths array
    linesArray.splice(-1, 1);
    // draw all the paths in the paths array
    drawPaths();
}

canvas.addEventListener('mousedown', startPainting);
canvas.addEventListener('mouseup', finishedPainting);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseleave', exitdraw);