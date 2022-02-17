'use strict'

var gCurrMemeIdx = 0;

var gMemes = [
    {
        selectedImgId: 1,
        selectedLineIdx: 0,
        lines: [
            { txt: '', size: 25, align: 'left', color: 'blue' },
            { txt: 'I sometimes eat shakshuka', size: 25, align: 'left', color: 'green' }
        ]
    },
    {
        selectedImgId: 2,
        selectedLineIdx: 0,
        lines: [
            { txt: 'sometimes eat ', size: 25, align: 'left', color: 'blue' },
            { txt: 'I shakshuka', size: 25, align: 'left', color: 'green' }
        ]
    },
    {
        selectedImgId: 3,
        selectedLineIdx: 0,
        lines: [
            { txt: 'sometimes eat ', size: 25, align: 'left', color: 'blue' },
            { txt: 'I shakshuka', size: 25, align: 'left', color: 'green' }
        ]
    },
    {
        selectedImgId: 4,
        selectedLineIdx: 0,
        lines: [
            { txt: 'sometimes eat ', size: 25, align: 'left', color: 'blue' },
            { txt: 'I shakshuka', size: 25, align: 'left', color: 'green' }
        ]
    },
    {
        selectedImgId: 5,
        selectedLineIdx: 0,
        lines: [
            { txt: 'I  eat Falafel', size: 38, align: 'left', color: 'blue' },
            { txt: 'I love shakshuka', size: 30, align: 'left', color: 'red' },
        ]
    },
    {
        selectedImgId: 6,
        selectedLineIdx: 0,
        lines: [
            { txt: 'I  eat Falafel', size: 38, align: 'left', color: 'blue' },
            { txt: 'I love shakshuka', size: 30, align: 'left', color: 'red' },
        ]
    },
    {
        selectedImgId: 7,
        selectedLineIdx: 0,
        lines: [{ txt: 'I', size: 55, align: 'left', color: 'blue' }]
    },
    {
        selectedImgId: 8,
        selectedLineIdx: 0,
        lines: [{ txt: 'eat Falafel', size: 45, align: 'left', color: 'blue' }]
    },
    {
        selectedImgId: 9,
        selectedLineIdx: 0,
        lines: [{ txt: 'I  Falafel', size: 15, align: 'left', color: 'blue' }]
    },
    {
        selectedImgId: 10,
        selectedLineIdx: 0,
        lines: [{ txt: 'I  Falafel', size: 15, align: 'left', color: 'blue' }]
    },
    {
        selectedImgId: 11,
        selectedLineIdx: 0,
        lines: [{ txt: 'I  Falafel', size: 15, align: 'left', color: 'blue' }]
    },
    {
        selectedImgId: 12,
        selectedLineIdx: 0,
        lines: [{ txt: 'I  Falafel', size: 15, align: 'left', color: 'blue' }]
    },
    {
        selectedImgId: 13,
        selectedLineIdx: 0,
        lines: [{ txt: 'I  Falafel', size: 15, align: 'left', color: 'blue' }]
    },
    {
        selectedImgId: 14,
        selectedLineIdx: 0,
        lines: [{ txt: 'I  Falafel', size: 15, align: 'left', color: 'blue' }]
    },
    {
        selectedImgId: 15,
        selectedLineIdx: 0,
        lines: [{ txt: 'I  Falafel', size: 15, align: 'left', color: 'blue' }]
    },
    {
        selectedImgId: 16,
        selectedLineIdx: 0,
        lines: [{ txt: 'I  Falafel', size: 15, align: 'left', color: 'blue' }]
    },
    {
        selectedImgId: 17,
        selectedLineIdx: 0,
        lines: [{ txt: 'I  Falafel', size: 15, align: 'left', color: 'blue' }]
    },
    {
        selectedImgId: 18,
        selectedLineIdx: 0,
        lines: [{ txt: 'I  Falafel', size: 15, align: 'left', color: 'blue' }]
    },
]

function getMeme() {
    //TODO: gMeme = loadFromStorage(currMeme)
    // get meme - update
    return gMeme;
}

function setLineText(value) {

    // var currImgIdx = getMemeIdxByPicId(gCurrMemeIdx);
    // console.log(currImgIdx, 'currImgIdx');
    console.log(gCurrMemeIdx);
    // var currmemeidx = gMemes[gCurrMemeIdx];
    // var curridx = getMemeIdxByPicId(gCurrMemeIdx);
    // console.log(curridx, 'curridx')
    // console.log(gMemes[gCurrMemeIdx].lines[0], 'this') //get position
    gMemes[gCurrMemeIdx].lines[gCurrLine].txt = value; //get position
    // console.log(gMemes[curridx]);
    return
}

function setImg() {

}

function getMemeByPicId(picId) {
    return gMemes.find((meme) => picId === meme.selectedImgId)
}

function getMemeIdxByPicId(picId) {
    return gMemes.findIndex((meme) => {
        console.log(meme.selectedImgId, 'meme.selectedImgId')
        console.log(picId, 'picid')
        if (picId === meme.selectedImgId) return picId;
    })
}

function changeColor(newColor) {
    gMemes[gCurrMemeIdx].lines[gCurrLine].color = newColor;
    return
}

function changeFontSize(diff) {
    console.log(diff)
    if (diff === '+') {
        gMemes[gCurrMemeIdx].lines[gCurrLine].size += 2;
        console.log(gMemes[gCurrMemeIdx].lines[gCurrLine].size)
    } else gMemes[gCurrMemeIdx].lines[gCurrLine].size -= 2;

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

    // console.log(lines);
    console.log(ev.offsetX, 'x clicked')
    console.log(ev.offsetY, 'y clicked')
    const clickedLineIdx = lines.findIndex(line =>
        ev.offsetX >= line.x && ev.offsetX <= line.x + gCtx.measureText(line.txt).width &&
        ev.offsetY >= line.y - line.size && ev.offsetY <= line.y

    )
    // console.log(lineX, lineY, textLength, fontSize);
    gCurrLine = clickedLineIdx;
    if(clickedLineIdx >=0){
        var lineX = lines[clickedLineIdx].x;
        var lineY = lines[clickedLineIdx].y;
        var textLength = gCtx.measureText(lines[clickedLineIdx].txt).width;
        console.log(textLength, 'textlen')
        var fontSize = lines[clickedLineIdx].size;

        renderTextToInput(lines[clickedLineIdx].txt);

        openModal(lineX, lineY, textLength, fontSize);
    } else {
        closeModal();
        clearInput()
    }
}