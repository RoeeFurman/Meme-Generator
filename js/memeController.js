'use strict'

var gCanvas;
var gCtx;
var gCurrLine = 0;
var gColor = 'black';

gCanvas = document.getElementById('my-canvas');
gCtx = gCanvas.getContext('2d');


function renderMeme(meme) {
    console.log('hello')
    // var txt = meme.lines[0].txt;
    // console.log(txt);
    // console.log(meme.lines,'lines')
    drawImg(meme, meme.lines);
    // drawText(meme, 100, 100)
}


function onSetLineText() {
    console.log('text changed');
    var eltxt = document.querySelector('.text-input');
    var text = eltxt.value;
    setLineText(text);
    renderMeme(gMemes[gCurrMemeIdx]);
}


function drawImg(meme, lines) {
    var currLine = 0;
    console.log(meme.selectedImgId, 'meme id')
    var id = meme.selectedImgId;
    var img = new Image();
    img.src = `img/${id}.jpg`;
    console.log(lines[0].txt);
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
        lines.forEach(line => {
            drawText(currLine, meme, line.txt)
            currLine++
        })
    };
}


function drawText(currLine, meme, txt, x, y = 70) {
    // gCtx.font = '48px serif';
    // gCtx.fillText(text, x, y);
    if (currLine === 0) {
        x = gCanvas.width / 6;
        y = gCanvas.height / 6;
    } else if (currLine === 1) {
        x = gCanvas.width / 8;
        y = gCanvas.height * 7 / 8;
    }

    gCtx.lineWidth = 1;
    gCtx.strokeStyle = 'black';
    gCtx.fillStyle = meme.lines[currLine].color;
    gCtx.font = `${meme.lines[currLine].size}px arial`; //TODO: add font
    gCtx.fillText(txt, x, y);
    gCtx.strokeText(txt, x, y);
    // gCtx.lineWidth = 1;
    // gCtx.strokeStyle = 'black';
    // gCtx.fillStyle = meme.lines[gCurrLine].color;
    // gCtx.font = `${meme.lines[gCurrLine].size}px arial`; //TODO: add font
    // gCtx.fillText(meme.lines[gCurrLine].txt, x, y);
    // gCtx.strokeText(meme.lines[gCurrLine].txt, x, y);
}


// function resizeCanvas() {
//     var elContainer = document.querySelector('.canvas-container');
//     // Note: changing the canvas dimension this way clears the canvas
//     gCanvas.width = elContainer.offsetWidth - 20
//     // Unless needed, better keep height fixed.
//     //   gCanvas.height = elContainer.offsetHeight
// }


function onGetColor() {
    gColor = document.querySelector('[name=user-background-color]').value;
    console.log(gColor);

    changeColor(gColor);
    renderMeme(gMemes[gCurrMemeIdx])
}


function onChangeFontSize(diff) {
    console.log('change font size', diff)

    changeFontSize(diff);
    renderMeme(gMemes[gCurrMemeIdx])
}


function onSwitchline() {
    console.log('currLine', gCurrLine)
    console.log('now switch')
    // console.log(gMemes[gCurrMemeIdx].lines.length-1, 'this');
    if (gCurrLine < gMemes[gCurrMemeIdx].lines.length - 1) gCurrLine++;
    else (gCurrLine = 0)
    console.log('new line', gCurrLine)

}




function canvasClicked(ev) {
    const clickedStar = gStars.find(star =>
        ev.offsetX >= star.x && ev.offsetX <= star.x + gBarWidth &&
        ev.offsetY >= star.y && ev.offsetY <= star.y + star.rate
    )
    console.log(clickedStar);
    // TODO: find out if clicked a star bar
    // ev.offsetX >= star.x && ev.offsetX <= star.x + gBarWidth &&
    // ev.offsetY >= star.y && ev.offsetY <= star.y + star.rate


    if (clickedStar) openModal(clickedStar.name, clickedStar.rate, ev.clientX, ev.clientY)
    else closeModal()
}

function openModal(starName, starRate, x, y) {
    // TODO: open the modal with the given text in the given coordinates 
    // (style.top = style.left = 18 + 'px')
    const elModal = document.querySelector('.modal')
    elModal.style.top = y + 'px'
    elModal.style.left = x + 'px'
    const msg = `${starName} is ${starRate}% awesome`
    elModal.innerText = msg
    elModal.hidden = false
}

function closeModal() {
    const elModal = document.querySelector('.modal')
    elModal.hidden = true
}