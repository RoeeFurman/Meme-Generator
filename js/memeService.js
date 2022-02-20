'use strict'

var gDragLine = false;
var gCurrMemeIdx = 0;
var gStartPos;
var gSavedMemes = [];
var gSavedImgs = [];

var gMemes = [
    {
        selectedImgId: 1,
        selectedLineIdx: 0,
        lines: []
    },
    {
        selectedImgId: 2,
        selectedLineIdx: 0,
        lines: [
        ]
    },
    {
        selectedImgId: 3,
        selectedLineIdx: 0,
        lines: [
        ]
    },
    {
        selectedImgId: 4,
        selectedLineIdx: 0,
        lines: [
        ]
    },
    {
        selectedImgId: 5,
        selectedLineIdx: 0,
        lines: [
        ]
    },
    {
        selectedImgId: 6,
        selectedLineIdx: 0,
        lines: [
        ]
    },
    {
        selectedImgId: 7,
        selectedLineIdx: 0,
        lines: []
    },
    {
        selectedImgId: 8,
        selectedLineIdx: 0,
        lines: []
    },
    {
        selectedImgId: 9,
        selectedLineIdx: 0,
        lines: []
    },
    {
        selectedImgId: 10,
        selectedLineIdx: 0,
        lines: []
    },
    {
        selectedImgId: 11,
        selectedLineIdx: 0,
        lines: []
    },
    {
        selectedImgId: 12,
        selectedLineIdx: 0,
        lines: []
    },
    {
        selectedImgId: 13,
        selectedLineIdx: 0,
        lines: []
    },
    {
        selectedImgId: 14,
        selectedLineIdx: 0,
        lines: []
    },
    {
        selectedImgId: 15,
        selectedLineIdx: 0,
        lines: []
    },
    {
        selectedImgId: 16,
        selectedLineIdx: 0,
        lines: []
    },
    {
        selectedImgId: 17,
        selectedLineIdx: 0,
        lines: []
    },
    {
        selectedImgId: 18,
        selectedLineIdx: 0,
        lines: []
    },
    {
        selectedImgId: 19,
        selectedLineIdx: 0,
        lines: []
    },
    {
        selectedImgId: 20,
        selectedLineIdx: 0,
        lines: []
    },
    {
        selectedImgId: 21,
        selectedLineIdx: 0,
        lines: []
    },
    {
        selectedImgId: 22,
        selectedLineIdx: 0,
        lines: []
    },
]

function getMeme() {
    return gMeme;
}

function setLineText(value) {
    var currLine = gMemes[gCurrMemeIdx].selectedLineIdx;

    // console.log(gCurrMemeIdx);
    gMemes[gCurrMemeIdx].lines[currLine].txt = value; //get position
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
    var currLine = gMemes[gCurrMemeIdx].selectedLineIdx;

    gMemes[gCurrMemeIdx].lines[currLine].color = newColor;
    return
}

function changeFontSize(diff) {
    // console.log(diff)
    var currLine = gMemes[gCurrMemeIdx].selectedLineIdx;
    // console.log(currLine);
    if (diff === '+') {
        gMemes[gCurrMemeIdx].lines[currLine].size += 2;
        // console.log(gMemes[gCurrMemeIdx].lines[currLine].size)
    } else gMemes[gCurrMemeIdx].lines[currLine].size -= 2;

    return;
}

function downloadCanvas(elLink) {
    console.log('downloading')
    const data = gCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'MyAwsomeMEME';
}

function canvasClicked(ev) {
    var lines = gMemes[gCurrMemeIdx].lines;
    console.log(lines);
    console.log(ev.offsetX, ev.offsetY)

    const clickedLineIdx = lines.findIndex(line =>
        ev.offsetX >= line.x && ev.offsetX <= line.x + gCtx.measureText(line.txt).width &&
        ev.offsetY > line.y - line.size && ev.offsetY < line.y
    )
    console.log(gCurrLine, 'gcurrline');
    if (clickedLineIdx >= 0) {
        gMemes[gCurrMemeIdx].selectedLineIdx = clickedLineIdx;
        renderTextToInput(gMemes[gCurrMemeIdx].lines[clickedLineIdx].txt)
    } else {
        clearInput()
    }
}

function addLine(val) {
    var text;

    if (val !== 'line') text = val
    else text = ' '

    console.log(gMemes[gCurrMemeIdx].lines.length, 'length')
    console.log(gMemes[gCurrMemeIdx].selectedLineIdx, 'curr idx')

    if (!gMemes[gCurrMemeIdx].lines.length) gMemes[gCurrMemeIdx].selectedLineIdx = 0
    else if (gMemes[gCurrMemeIdx].lines.length && gMemes[gCurrMemeIdx].selectedLineIdx === 0) {
        gMemes[gCurrMemeIdx].selectedLineIdx = gMemes[gCurrMemeIdx].lines.length;
        console.log(gMemes[gCurrMemeIdx].selectedLineIdx, 'here')
    } else gMemes[gCurrMemeIdx].selectedLineIdx++


    var newLine = { txt: text, size: 30, align: 'left', color: getRandomColor() ,txtLength: ''};
    gMemes[gCurrMemeIdx].lines.push(newLine)
}

function deleteLine() {
    var lines = gMemes[gCurrMemeIdx].lines;
    console.log(lines)
    var currMeme = gMemes[gCurrMemeIdx].selectedLineIdx;
    lines.splice(currMeme, 1)
}

function setLineDrag(isDrag) {
    gDragLine = isDrag
    // console.log(gDragLine, 'gdragLine');
}

function isLineClicked(clickedPos) { //get line idx
    var lines = gMemes[gCurrMemeIdx].lines;
    console.log(lines)




    var lineIdxToDrag = lines.findIndex(line =>
    (clickedPos.x >= line.x && clickedPos.x <= line.x + gCtx.measureText(line.txt).width &&
        clickedPos.y >= line.y - line.size && clickedPos.y <= line.y))
    if (lineIdxToDrag > 0) gMemes[gCurrMemeIdx].selectedLineIdx = lineIdxToDrag;
    return lineIdxToDrag;
}

function moveLine(dx, dy) {
    var currLine = gMemes[gCurrMemeIdx].selectedLineIdx;
    gMemes[gCurrMemeIdx].lines[currLine].x += dx
    gMemes[gCurrMemeIdx].lines[currLine].y += dy
}

function saveMeme() {
    gSavedMemes.push(gMemes[gCurrMemeIdx]);
    var currImgIdx = gMemes[gCurrMemeIdx].selectedImgId;
    gImgs.forEach(img => {
        if (img.id === currImgIdx) gSavedImgs.unshift(img)
    })
    console.log(gSavedMemes)
    console.log(gSavedImgs, 'saved imgs')
}

function alignText(val) {
    console.log(val);
    if (!gMemes[gCurrMemeIdx].lines.length) return
    gMemes[gCurrMemeIdx].lines[gMemes[gCurrMemeIdx].selectedLineIdx].align = val;
    // console.log(gMemes[gCurrMemeIdx].lines.align)
}