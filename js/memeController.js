'use strict'

var gCanvas;
var gCtx;
var gCurrLine = 0;
var gColor = 'black';


gCanvas = document.getElementById('my-canvas');
gCtx = gCanvas.getContext('2d');

function renderMeme(meme) {
    console.log(gCurrLine,'gcurrline')
    console.log(gMemes[gCurrMemeIdx].selectedLineIdx,'selected line')
    drawImg(meme, meme.lines);
}

function onSetLineText() {
    // console.log('text changed');
    var eltxt = document.querySelector('.text-input');
    var text = eltxt.value;
    if (!gMemes[gCurrMemeIdx].lines.length) addLine();
    setLineText(text);
    renderMeme(gMemes[gCurrMemeIdx]);
}

function drawImg(meme, lines) {
    var currLine = 0;
    // console.log(meme.selectedImgId, 'meme id')
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
    if (!meme.lines[currLine].x && !meme.lines[currLine].y) {
        var x;
        var y;
        if (currLine === 0) {
            x = 20;
            y = gCanvas.height / 6;
        } else if (currLine === 1) {
            x = 20;
            y = gCanvas.height * 7 / 8;
        } else {
            x = 20;
            y = gCanvas.height / 2;
        }
        meme.lines[currLine].x = x;
        meme.lines[currLine].y = y;
    } else {
        x = meme.lines[currLine].x;
        y = meme.lines[currLine].y;
    }

    meme.lines[currLine].txtLength = gCtx.measureText(txt).width
    console.log(meme.lines[currLine].txtLength, 'txt length')

    gCtx.lineWidth = 1;
    gCtx.strokeStyle = 'black';
    gCtx.textAlign = meme.lines[currLine].align;
    gCtx.fillStyle = meme.lines[currLine].color;
    gCtx.font = `${meme.lines[currLine].size}px arial`;
    gCtx.fillText(txt, x, y);
    gCtx.strokeText(txt, x, y);

    if(meme.selectedLineIdx === currLine) markLine(meme, currLine)

}

function onGetColor() {
    gColor = document.querySelector('[name=user-background-color]').value;
    console.log(gColor);

    changeColor(gColor);
    renderMeme(gMemes[gCurrMemeIdx])
}

function onChangeFontSize(diff) {
    // console.log('change font size', diff)

    changeFontSize(diff);
    renderMeme(gMemes[gCurrMemeIdx])
}

function onSwitchline() {
    var currLine = gMemes[gCurrMemeIdx].selectedLineIdx;
    if (currLine < gMemes[gCurrMemeIdx].lines.length - 1) {
        gMemes[gCurrMemeIdx].selectedLineIdx++;
        // console.log('currLine', gMemes[gCurrMemeIdx].selectedLineIdx);
    } else (gMemes[gCurrMemeIdx].selectedLineIdx = 0)
    // console.log('currLine', gMemes[gCurrMemeIdx].selectedLineIdx);
    var gCurrMeme = gMemes[gCurrMemeIdx];
    var currLine = gMemes[gCurrMemeIdx].selectedLineIdx;
    console.log(gCurrMeme.selectedLineIdx, 'selected line')
    // currLine = gMemes[gCurrMemeIdx].selectedLineIdx;
    markLine(gCurrMeme, currLine)
    // openModal(gMemes[gCurrMemeIdx].lines[currLine]);
    renderMeme(gMemes[gCurrMemeIdx])
    renderTextToInput(gMemes[gCurrMemeIdx].lines[currLine].txt)
}

function markLine(currMeme, currLine) {
    console.log(currMeme, currLine, 'currmeme', 'currline')
    // if(!currMeme.lines[currLine]) console.log('en shura')
    var x = currMeme.lines[currLine].x
    var y = currMeme.lines[currLine].y

    console.log(x, y, 'x - y')
    drawRect(x, y, currMeme.lines[currLine].txtLength, currMeme.lines[currLine].size)
}

function drawRect(x, y, txtLength, height) {
    console.log(height)
    gCtx.beginPath();
    gCtx.rect(x, y - height + 5, txtLength, height);
    // gCtx.fillStyle = 'orange';
    // gCtx.fillRect(x, y, 150, 150);
    gCtx.strokeStyle = 'black';
    gCtx.stroke();
}


function onCanvasClicked(event) {
    console.log('canvas clicked!!!')
    canvasClicked(event)
}

function openModal(currMeme, currLine) {
    console.log(currMeme, currLine, 'currmeme', 'currline')

    markLine(currMeme, currLine)
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
        randomMeme.lines[i].align = 'left';
    }
    gMemes[randomNum] = randomMeme;
    return randomMeme;
}

function checkTextLength() {
    var randtext = makeLorem(4)
    while (gCtx.measureText(randtext).width + 200 > gCanvas.width) {
        randtext = makeLorem(4);
        // console.log(gCtx.measureText(randtext).width + 100, '<', gCanvas.width, 'new')
    }

    return randtext
}

function onSaveMeme() {
    console.log('saving....')
    saveMeme();
    saveToStorage('Saved memes', gSavedMemes)
    saveToStorage('Saved Imgs', gSavedImgs)
}

function closeMsg() {
    var elGallery = document.querySelector('.masseges');
    elGallery.classList.add('none');
}

function openMsg() {
    var elGallery = document.querySelector('.masseges');
    elGallery.classList.remove('none');
}

function doAlignText(val) {
    console.log(val);

    alignText(val);
    renderMeme(gMemes[gCurrMemeIdx])
}

function doUploadImg(imgDataUrl, onSuccess) {

    const formData = new FormData();
    formData.append('img', imgDataUrl)

    fetch('//ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
        .then(res => res.text())
        .then((url) => {
            console.log('Got back live url:', url);
            onSuccess(url)
        })
        .catch((err) => {
            console.error(err)
        })
}

function onImgInput(ev) {
    loadImageFromInput(ev, renderImg)
}

function loadImageFromInput(ev, onImageReady) {
    document.querySelector('.share-container').innerHTML = ''
    var reader = new FileReader()

    reader.onload = function (event) {
        console.log('onload');
        var img = new Image()
        // Render on canvas
        img.onload = onImageReady.bind(null, img)
        img.src = event.target.result
        gImg = img
    }
    console.log('after');
    reader.readAsDataURL(ev.target.files[0])
}

function renderImg(img) {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
}