'use strict'

var gCanvas;
var gCtx;
var gCurrLine = 0;
var gColor = 'black';

gCanvas = document.getElementById('my-canvas');
gCtx = gCanvas.getContext('2d');


function renderMeme(meme) {
    console.log('hello')
    drawImg(meme, meme.lines);
}

function onSetLineText() {
    console.log('text changed');
    var eltxt = document.querySelector('.text-input');
    var text = eltxt.value;
    if (!gMemes[gCurrMemeIdx].lines.length) addLine();
    setLineText(text);
    renderMeme(gMemes[gCurrMemeIdx]);
}

function drawImg(meme, lines) {
    var currLine = 0;
    console.log(meme.selectedImgId, 'meme id')
    var id = meme.selectedImgId;
    var img = new Image();
    img.src = `img/${id}.jpg`;
    // console.log(lines[0].txt);
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
        lines.forEach(line => {
            if (lines.length === 0) return
            drawText(currLine, meme, line.txt)
            currLine++
        })
    };
}

function drawText(currLine, meme, txt, x, y) {
    if (currLine === 0) {
        x = gCanvas.width / 2;
        y = gCanvas.height / 6;
    } else if (currLine === 1) {
        x = gCanvas.width / 2;
        y = gCanvas.height * 7 / 8;
    } else {
        x = gCanvas.width / 2;
        y = gCanvas.height / 2;
    }

    meme.lines[currLine].x = x;
    meme.lines[currLine].y = y;

    gCtx.lineWidth = 1;
    gCtx.strokeStyle = 'black';
    gCtx.textAlign = meme.lines[currLine].align;
    gCtx.fillStyle = meme.lines[currLine].color;
    gCtx.font = `${meme.lines[currLine].size}px arial`; //TODO: add font
    gCtx.fillText(txt, x, y);
    gCtx.strokeText(txt, x, y);

}

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
    var currLine = gMemes[gCurrMemeIdx].selectedLineIdx;
    // console.log(gMemes[gCurrMemeIdx].lines.length-1, 'this');
    if (currLine < gMemes[gCurrMemeIdx].lines.length - 1) {
        gMemes[gCurrMemeIdx].selectedLineIdx++;
        console.log('currLine', gMemes[gCurrMemeIdx].selectedLineIdx);
    } else (gMemes[gCurrMemeIdx].selectedLineIdx = 0)
    console.log('currLine', gMemes[gCurrMemeIdx].selectedLineIdx);

    currLine = gMemes[gCurrMemeIdx].selectedLineIdx;

    // console.log('currLine', gMemes[gCurrMemeIdx].selectedLineIdx);

    openModal(gMemes[gCurrMemeIdx].lines[currLine]);

    // if (gCurrLine < gMemes[gCurrMemeIdx].lines.length - 1) gCurrLine++;
    // else (gCurrLine = 0)
    // console.log('new line', gCurrLine)

}

function onCanvasClicked(event) {
    console.log('canvas clicked!!!')
    canvasClicked(event)
}

function openModal(currMeme) {

    var x = currMeme.x;
    var y = currMeme.y;
    // var textLength = gCtx.measureText(currMeme.txt).width;
    var height = currMeme.size;

    renderTextToInput(currMeme.txt);

    const elModal = document.querySelector('.modal')
    elModal.style.top = y - height + 'px'
    elModal.style.left = 0 + 'px'
    elModal.style.height = 60 + 'px'

    elModal.hidden = false
}

// function openModal(x, y, length, height) {
//     console.log(length)
//     console.log(x, y, length, height);
//     // TODO: open the modal with the given text in the given coordinates 
//     // (style.top = style.left = 18 + 'px')
//     const elModal = document.querySelector('.modal')
//     elModal.style.top = y - height + 'px'
//     elModal.style.left = 0 + 'px'
//     elModal.style.height = height * 2 + 'px'
//     // elModal.style.width = 380 +'px'
//     // const msg = `${starName} is ${starRate}% awesome`
//     // elModal.innerText = msg
//     elModal.hidden = false
// }

function closeModal() {
    const elModal = document.querySelector('.modal')
    elModal.hidden = true
}

function closeEditor() {
    var elGallery = document.querySelector('.meme-editor');
    elGallery.classList.add('none');
}

function openEditor() {
    var elGallery = document.querySelector('.meme-editor');
    elGallery.classList.remove('none');
}

function renderTextToInput(txt) {
    var eltxt = document.querySelector('.text-input');
    eltxt.value = txt
}

function clearInput() {
    var eltxt = document.querySelector('.text-input');
    eltxt.value = ''
}

function onAddLine() {
    console.log('addline?')

    addLine();
    renderMeme(gMemes[gCurrMemeIdx]);
}

function onDeleteLine() {
    deleteLine();
    clearInput();
    // closeModal();
    renderMeme(gMemes[gCurrMemeIdx]);
}

function renderEmoji() {
    saveEmoji();
    // gCtx.lineWidth = 1;
    // gCtx.strokeStyle = 'black';
    gCtx.textAlign = 'center';
    // gCtx.fillStyle = meme.lines[currLine].color;
    gCtx.font = 25 //TODO: add font
    gCtx.fillText('💥', gCanvas.width / 4, gCanvas.height / 4);
    gCtx.strokeText('💥', gCanvas.width / 4, gCanvas.height / 4);
}


function doFlexiblaMode() {
    var randomNum = getRandomInt(0, gMemes.length);
    gCurrMemeIdx = randomNum; //todo: keep curr

    var randomMeme = gMemes[randomNum];
    var randomLinesNum = getRandomInt(1, 3);
    randomMeme.lines = [];
    for (var i = 0; i < randomLinesNum; i++) {
        var randtxt = checkTextLength();
        randomMeme.lines.push({ 'txt': randtxt });
        randomMeme.lines[i].size = getRandomInt(20, 40);
        randomMeme.lines[i].color = getRandomColor();
        randomMeme.lines[i].align = 'center';
    }
    gMemes[randomNum] = randomMeme;
    console.log(randomMeme, 'random meme');
    renderMeme(randomMeme);
}


function checkTextLength(){
    var randtext = makeLorem(2);
    console.log(gCtx.measureText(randtext).width ,'<', gCanvas.width)
    if (gCtx.measureText(randtext).width < gCanvas.width) return randtext
    else randtext = makeLorem(2)
}