var selectedSlide = null;
// mode = 1 pre mode != 1 screen
var mode = 1;
var canEdit = false;
var json = null;
const {ipcRenderer} = require('electron'); 

var sList = [];

window.onload = () => {
    ipcRenderer.send('getJSON', ''); 
    setInterval(render, 1000); 
}

ipcRenderer.on('ajson', (event, msg) => {
    json = msg;
    mode = 1;
    canEdit = true;
    loadSlidesToTable(); 
});

function render() {
    if (!canEdit) {
        ipcRenderer.send('getJSON', '');
        return;
    }
    // render list
        if (mode == 1) {
            json.slidePre.forEach((element, index) => {
                let cc = document.getElementById('pre-' + index);
                let ctx = cc.getContext('2d');
                ctx.width = cc.width;
                ctx.height = cc.height;
                sbackground(ctx, element.backgroundc);
                element.contents.forEach((element, index) => {
                    if (element.type == 'text') {
                        sfill(ctx, element.color);
                        ctx.font = element.font;
                        text(ctx, element.x * Math.round(ctx.width/100), element.y * Math.round(ctx.height/100), element.text);
                    }
                });
            });
        } else {

        }
    //render big
    let canvas = document.getElementById('preCanvasScreen');
    let ctx = canvas.getContext('2d');
    ctx.width = canvas.width;
    ctx.height = canvas.height;
    if (!selectedSlide) {
        background(ctx, 55, 55, 55);
        ctx.font = Math.round(canvas.height/20) + "px Verdana";
        fill(ctx, 255);
        text(ctx, 'Not selectect', ctx.width/2 - getTextWidth(ctx, 'Not selectect')/2, ctx.height/2 - canvas.height/40);
    } else {
        let element = json.slidePre[selectedSlide];
        sbackground(ctx, element.backgroundc);
        element.contents.forEach((element, index) => {
            if (element.type == 'text') {
                sfill(ctx, element.color);
                ctx.font = element.font;
                text(ctx, element.x * Math.round(ctx.width/100), element.y * Math.round(ctx.height/100), element.text);
            }
        });
    }
}

function addTextPre() {
    if (selectedSlide == null) {return;}
    let text = {
        "type": 'text',
        "x": 50,
        "y": 50,
        "color": "#ffffff",
        "text": "Text",
        "font": "12px Verdana"
    };
    json.slidePre[selectedSlide].contents.push(text);
}

function preAdd () {
    if (!canEdit) return;
    let indexToAdd = 0;
    if (selectedSlide == null) {
        indexToAdd = -1;
    } else {
        indexToAdd = selectedSlide + 1;
    }
    if (indexToAdd == -1) {
        json.slidePre.push({
            "contents": [],
            "backgroundc": '#000000',
        });
        addSlideToListPre(json.slidePre.length - 1);
    } else {
        json.slidePre.push(indexToAdd, {
            "contents": [],
            "backgroundc": '#000000',
        });
        addSlideToListPre(indexToAdd);
    }
}

function preRemove () {
    if (!canEdit) return;
}

function loadSlidesToTable() {
    let colum = document.getElementById('colum');
    if (mode == 1) {
        json.slidePre.forEach((element, index) => {
            addSlideToListPre(index);
        });
    } else {

    }
}

function addSlideToListPre(index) {
    let td = document.createElement('td');
    let cv = document.createElement('canvas');
    cv.id = "pre-" + index;
    cv.index = index;
    cv.addEventListener('click', function (event) {
        let index = event.toElement.id.slice(4);
        selectedSlide = index;
    });
    td.appendChild(cv);
    document.getElementById('colum').appendChild(td);

}

//Graphics

/**
 * 
 * @param {CanvasRenderingContext2D} s 
 * @param {Number} r 
 * @param {Number} g 
 * @param {Number} b 
 */
function fill(s,r,g,b) {
  if (!g || !b) {
    g = r;
    b = r;
  }
  s.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
}

/**
 * 
 * @param {CanvasRenderingContext2D} s 
 * @param {String} str
 */
function sfill(s, str) {
  s.fillStyle = str;
}

/**
 * 
 * @param {CanvasRenderingContext2D} s 
 * @param {Number} r 
 * @param {Number} g 
 * @param {Number} b 
 */
function background(s,r,g,b) {
    fill(s,r,g,b);
    rect(s,0,0, s.width, s.height);
}

/**
 * 
 * @param {CanvasRenderingContext2D} s 
 * @param {String} t
 */
function sbackground(s, t) {
    sfill(s, t);
    rect(s, 0,0, s.width, s.height, 0);
}

/**
 * 
 * @param {CanvasRenderingContext2D} s 
 * @param {Number} x 
 * @param {Number} y 
 * @param {Number} w 
 * @param {Number} h 
 */
function rect(s, x,y, w,h, stroke) {
    stroke = (!stroke) ? 0 : stroke;
    let lfill = s.fillStyle;
    fill(s, 0);
    s.fillRect(x - stroke/2, y - stroke/2, w + stroke, h + stroke);
    sfill(s, lfill);
    s.fillRect(x,y, w,h);
}

/**
 * 
 * @param {CanvasRenderingContext2D} s 
 * @param {String} t 
 * @param {Number} x 
 * @param {Number} y 
 */
function text(s, t,x,y) {
    s.fillText(t, x, y);
}

/**
 * 
 * @param {CanvasRenderingContext2D} s 
 */
function defFont(s) {
    s.font = height/15 + 'px Verdana'
}
 
/**
 * 
 * @param {CanvasRenderingContext2D} s 
 * @param {String} t 
 */
function getTextWidth(s, t) {
    return Math.round(s.measureText(t).width);
}