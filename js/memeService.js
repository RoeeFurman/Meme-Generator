'use strict'

var gDragLine = false;
var gCurrMemeIdx = 0;
var gStartPos;
var gSavedMemes = [];
var gSavedImgs = [];
var gCurrentMeme;


var gMemes = []

function createMemes(val) {
    for (var i = 0; i < val; i++) {
        gMemes[i] = {
            selectedImgId: i + 1,
            selectedLineIdx: 0,
            lines: []
        }
    }
    return gMemes
}

function saveCurrMeme(currMeme) {
    gCurrentMeme = currMeme
}

function getMeme() {
    return gMeme;
}

function setLineText(value) {
    var currLine = gCurrentMeme.selectedLineIdx;

    // console.log(gCurrMemeIdx);
    gCurrentMeme.lines[currLine].txt = value; //get position
    return
}

function getMemeByPicId(picId) {
    return gMemes.find((meme) => picId === meme.selectedImgId)
}

function getMemeIdxByPicId(picId) {
    return gMemes.findIndex((meme) => {
        // console.log(meme.selectedImgId, 'meme.selectedImgId')
        // console.log(picId, 'picid')
        if (picId === meme.selectedImgId) return picId;
    })
}

function changeColor(newColor) {
    var currLine = gCurrentMeme.selectedLineIdx;

    gCurrentMeme.lines[currLine].color = newColor;
    return
}

function changeFontSize(diff) {
    // console.log(diff)
    var currLine = gCurrentMeme.selectedLineIdx;
    // console.log(currLine);
    if (diff === '+') {
        gCurrentMeme.lines[currLine].size += 2;
        // console.log(gCurrentMeme.lines[currLine].size)
    } else gCurrentMeme.lines[currLine].size -= 2;

    return;
}

function downloadCanvas(elLink) {
    // console.log('downloading')
    const data = gCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'MyAwsomeMEME';
}

function canvasClicked(ev) {
    0
    var lines = gCurrentMeme.lines;
    // console.log(lines);
    // console.log(ev.offsetX, ev.offsetY)

    const clickedLineIdx = lines.findIndex(line =>
        ev.offsetX >= line.x && ev.offsetX <= line.x + gCtx.measureText(line.txt).width &&
        ev.offsetY > line.y - line.size && ev.offsetY < line.y
    )
    // console.log(gCurrLine, 'gcurrline');
    if (clickedLineIdx >= 0) {
        gCurrentMeme.selectedLineIdx = clickedLineIdx;
        renderTextToInput(gCurrentMeme.lines[clickedLineIdx].txt)
    } else {
        clearInput()
    }
}

function addLine(val) {
    var text;

    if (val !== 'line') text = val
    else text = ' '

    // console.log(gCurrentMeme.lines.length, 'length')
    // console.log(gCurrentMeme.selectedLineIdx, 'curr idx')

    if (!gCurrentMeme.lines.length) gCurrentMeme.selectedLineIdx = 0
    else if (gCurrentMeme.lines.length && gCurrentMeme.selectedLineIdx === 0) {
        gCurrentMeme.selectedLineIdx = gCurrentMeme.lines.length;
        // console.log(gCurrentMeme.selectedLineIdx, 'here')
    } else gCurrentMeme.selectedLineIdx++


    var newLine = { txt: text, size: 30, align: 'left', color: getRandomColor(), txtLength: '' };
    gCurrentMeme.lines.push(newLine)
}

function deleteLine() {
    var lines = gCurrentMeme.lines;
    // console.log(lines)
    var currMeme = gCurrentMeme.selectedLineIdx;
    lines.splice(currMeme, 1)
}

function setLineDrag(isDrag) {
    gDragLine = isDrag
    // console.log(gDragLine, 'gdragLine');
}

function isLineClicked(clickedPos) { //get line idx
    var lines = gCurrentMeme.lines;
    // console.log(lines)




    var lineIdxToDrag = lines.findIndex(line =>
    (clickedPos.x >= line.x && clickedPos.x <= line.x + gCtx.measureText(line.txt).width &&
        clickedPos.y >= line.y - line.size && clickedPos.y <= line.y))
    if (lineIdxToDrag > 0) gCurrentMeme.selectedLineIdx = lineIdxToDrag;
    return lineIdxToDrag;
}

function moveLine(dx, dy) {
    var currLine = gCurrentMeme.selectedLineIdx;
    gCurrentMeme.lines[currLine].x += dx
    gCurrentMeme.lines[currLine].y += dy
}

function saveMeme() {
    gSavedMemes.push(gCurrentMeme);
    var currImgIdx = gCurrentMeme.selectedImgId;
    gImgs.forEach(img => {
        if (img.id === currImgIdx) gSavedImgs.unshift(img)
    })
    console.log(gSavedMemes)
    console.log(gSavedImgs, 'saved imgs')
}

function alignText(val) {
    // console.log(val);
    if (!gCurrentMeme.lines.length) return
    gCurrentMeme.lines[gCurrentMeme.selectedLineIdx].align = val;
    // console.log(gCurrentMeme.lines.align)
}