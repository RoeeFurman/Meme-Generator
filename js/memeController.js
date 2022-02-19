'use strict'

var gCanvas;
var gCtx;
var gCurrLine = 0;
var gColor = 'black';

gCanvas = document.getElementById('my-canvas');
gCtx = gCanvas.getContext('2d');


function renderMeme(meme) {
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
    var currImg = getImgFromMemeIdx(meme)
    var img = new Image();
    img.src = currImg.url;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
        lines.forEach(line => {
            if (lines.length === 0) return
            drawText(currLine, meme, line.txt)
            currLine++
        })
    };
}

function drawText(currLine, meme, txt) {
    if(!meme.lines[currLine].x && !meme.lines[currLine].y){
        var x;
        var y;
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
    } else {
        x = meme.lines[currLine].x;
        y=meme.lines[currLine].y;
    }

    gCtx.lineWidth = 1;
    gCtx.strokeStyle = 'black';
    gCtx.textAlign = meme.lines[currLine].align;
    gCtx.fillStyle = meme.lines[currLine].color;
    gCtx.font = `${meme.lines[currLine].size}px arial`; 
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
    if (currLine < gMemes[gCurrMemeIdx].lines.length - 1) {
        gMemes[gCurrMemeIdx].selectedLineIdx++;
        console.log('currLine', gMemes[gCurrMemeIdx].selectedLineIdx);
    } else (gMemes[gCurrMemeIdx].selectedLineIdx = 0)
    console.log('currLine', gMemes[gCurrMemeIdx].selectedLineIdx);

    currLine = gMemes[gCurrMemeIdx].selectedLineIdx;


    openModal(gMemes[gCurrMemeIdx].lines[currLine]);
}

function onCanvasClicked(event) {
    console.log('canvas clicked!!!')
    canvasClicked(event)
}

function openModal(currMeme) {

    var x = currMeme.x;
    var y = currMeme.y;
    var height = currMeme.size;

    renderTextToInput(currMeme.txt);

    const elModal = document.querySelector('.modal')
    elModal.style.top = y - height + 'px'
    elModal.style.left = 0 + 'px'
    elModal.style.height = 60 + 'px'

    elModal.hidden = false
}

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

function onAddLine(val) {
    console.log('addline?')

    addLine(val);
    renderMeme(gMemes[gCurrMemeIdx]);
}

function onDeleteLine() {
    deleteLine();
    clearInput();
    closeModal();
    renderMeme(gMemes[gCurrMemeIdx]);
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
        randomMeme.lines[i].size = getRandomInt(20, 35);
        randomMeme.lines[i].color = getRandomColor();
        randomMeme.lines[i].align = 'center';
    }
    gMemes[randomNum] = randomMeme;
    console.log(randomMeme, 'random meme');
    return randomMeme;
}

function checkTextLength() {
    var randtext = makeLorem(4)
    console.log(gCtx.measureText(randtext).width + 100, '<', gCanvas.width)
    while (gCtx.measureText(randtext).width + 200 > gCanvas.width) {
        randtext = makeLorem(4);
        console.log(gCtx.measureText(randtext).width + 100, '<', gCanvas.width, 'new')
    }

    return randtext
}

function onSaveMeme(){
    console.log('saving....')
    saveMeme();
    saveToStorage('Saved memes', gSavedMemes)
    saveToStorage('Saved Imgs', gSavedImgs)
}

function closeMsg(){
    var elGallery = document.querySelector('.masseges');
    elGallery.classList.add('none');
}

function openMsg(){
    var elGallery = document.querySelector('.masseges');
    elGallery.classList.remove('none');
}

function doAlignText(val){
    console.log(val);

    alignText(val);
    renderMeme(gMemes[gCurrMemeIdx])
}