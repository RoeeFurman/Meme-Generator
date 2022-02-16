'use strict'

var gCanvas;
var gCtx;
var gColor = 'black';

gCanvas = document.getElementById('my-canvas');
gCtx = gCanvas.getContext('2d');


function renderMeme(meme) {
    console.log('hello')
    // var txt = meme.lines[0].txt;
    // console.log(txt);
    drawImg(meme);
    // drawText(meme, 100, 100)
}


function onSetLineText() {
    console.log('text changed');
    var eltxt = document.querySelector('.text-input');
    var text = eltxt.value;
    setLineText(text);
    renderMeme(gMemes[gCurrMemeIdx]);
}


function drawImg(meme) {
    console.log(meme.selectedImgId, 'meme id')
    var id = meme.selectedImgId;
    var img = new Image();
    img.src = `img/${id}.jpg`;

    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
        drawText(meme, 120, 80)
    };
}


function drawText(meme, x, y) {
    // gCtx.font = '48px serif';
    // gCtx.fillText(text, x, y);

    gCtx.lineWidth = 1;
    gCtx.strokeStyle = 'black';
    gCtx.fillStyle = meme.lines[0].color;
    gCtx.font = `${meme.lines[0].size}px arial`; //TODO: add font
    gCtx.fillText(meme.lines[0].txt, x, y);
    gCtx.strokeText(meme.lines[0].txt, x, y);
}


// function resizeCanvas() {
//     var elContainer = document.querySelector('.canvas-container');
//     // Note: changing the canvas dimension this way clears the canvas
//     gCanvas.width = elContainer.offsetWidth - 20
//         // Unless needed, better keep height fixed.
//         //   gCanvas.height = elContainer.offsetHeight
// }