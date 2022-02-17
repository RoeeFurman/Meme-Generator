'use strict'

var gCurrMemeIdx = 0;
// var gAddLine = 0;

var gMemes = [
    {
        selectedImgId: 1,
        selectedLineIdx: 0,
        lines: [
            { txt: 'I am trump', size: 25, align: 'center', color: 'blue' },
            { txt: 'I sometimes eat shakshuka', size: 25, align: 'center', color: 'green' }
        ]
    },
    {
        selectedImgId: 2,
        selectedLineIdx: 0,
        lines: [
            { txt: 'sometimes eat ', size: 25, align: 'center', color: 'blue' },
            { txt: 'I shakshuka', size: 25, align: 'center', color: 'green' }
        ]
    },
    {
        selectedImgId: 3,
        selectedLineIdx: 0,
        lines: [
            { txt: 'sometimes eat ', size: 25, align: 'center', color: 'blue' },
            { txt: 'I shakshuka', size: 25, align: 'center', color: 'green' }
        ]
    },
    {
        selectedImgId: 4,
        selectedLineIdx: 0,
        lines: [
            { txt: 'sometimes eat ', size: 25, align: 'center', color: 'blue' },
            { txt: 'I shakshuka', size: 25, align: 'center', color: 'green' }
        ]
    },
    {
        selectedImgId: 5,
        selectedLineIdx: 0,
        lines: [
            { txt: 'I  eat Falafel', size: 38, align: 'center', color: 'blue' },
            { txt: 'I love shakshuka', size: 30, align: 'center', color: 'red' },
        ]
    },
    {
        selectedImgId: 6,
        selectedLineIdx: 0,
        lines: [
            { txt: 'I  eat Falafel', size: 38, align: 'center', color: 'blue' },
            { txt: 'I love shakshuka', size: 30, align: 'center', color: 'red' },
        ]
    },
    {
        selectedImgId: 7,
        selectedLineIdx: 0,
        lines: [{ txt: 'I', size: 55, align: 'center', color: 'blue' }]
    },
    {
        selectedImgId: 8,
        selectedLineIdx: 0,
        lines: [{ txt: 'eat Falafel', size: 45, align: 'center', color: 'blue' }]
    },
    {
        selectedImgId: 9,
        selectedLineIdx: 0,
        lines: [{ txt: 'I  Falafel', size: 15, align: 'center', color: 'blue' }]
    },
    {
        selectedImgId: 10,
        selectedLineIdx: 0,
        lines: [{ txt: 'I  Falafel', size: 15, align: 'center', color: 'blue' }]
    },
    {
        selectedImgId: 11,
        selectedLineIdx: 0,
        lines: [{ txt: 'I  Falafel', size: 15, align: 'center', color: 'blue' }]
    },
    {
        selectedImgId: 12,
        selectedLineIdx: 0,
        lines: [{ txt: 'I  Falafel', size: 15, align: 'center', color: 'blue' }]
    },
    {
        selectedImgId: 13,
        selectedLineIdx: 0,
        lines: [{ txt: 'I  Falafel', size: 15, align: 'center', color: 'blue' }]
    },
    {
        selectedImgId: 14,
        selectedLineIdx: 0,
        lines: [{ txt: 'I  Falafel', size: 15, align: 'center', color: 'blue' }]
    },
    {
        selectedImgId: 15,
        selectedLineIdx: 0,
        lines: [{ txt: 'I  Falafel', size: 15, align: 'center', color: 'blue' }]
    },
    {
        selectedImgId: 16,
        selectedLineIdx: 0,
        lines: [{ txt: 'I  Falafel', size: 15, align: 'center', color: 'blue' }]
    },
    {
        selectedImgId: 17,
        selectedLineIdx: 0,
        lines: [{ txt: 'I  Falafel', size: 15, align: 'center', color: 'blue' }]
    },
    {
        selectedImgId: 18,
        selectedLineIdx: 0,
        lines: [{ txt: 'I  Falafel', size: 15, align: 'center', color: 'blue' }]
    },
]

function getMeme() {
    // get meme - update
    return gMeme;
}

function setLineText(value) {
    var currLine = gMemes[gCurrMemeIdx].selectedLineIdx;

    console.log(gCurrMemeIdx);
    gMemes[gCurrMemeIdx].lines[currLine].txt = value; //get position
    return
}

// function setImg() {
//     //todo
// }

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
    var currLine = gMemes[gCurrMemeIdx].selectedLineIdx;

    gMemes[gCurrMemeIdx].lines[currLine].color = newColor;
    return
}

function changeFontSize(diff) {
    console.log(diff)
    var currLine = gMemes[gCurrMemeIdx].selectedLineIdx;
    console.log(currLine);
    if (diff === '+') {
        gMemes[gCurrMemeIdx].lines[currLine].size += 2;
        console.log(gMemes[gCurrMemeIdx].lines[currLine].size)
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

    const clickedLineIdx = lines.findIndex(line =>
        ev.offsetX >= line.x && ev.offsetX <= line.x + gCtx.measureText(line.txt).width &&
        ev.offsetY >= line.y - line.size && ev.offsetY <= line.y
    )
    gCurrLine = clickedLineIdx;
    if (clickedLineIdx >= 0) {
        gMemes[gCurrMemeIdx].selectedLineIdx = clickedLineIdx;
        openModal(gMemes[gCurrMemeIdx].lines[clickedLineIdx])
        console.log(gMemes[gCurrMemeIdx].selectedLineIdx);
    } else {
        gMemes[gCurrMemeIdx].selectedLineIdx = 0;
        closeModal();
        clearInput()
    }
}


function addLine() {
    if (gMemes[gCurrMemeIdx].lines.length > 2) return

    var newLine = { txt: 'new line here', size: 30, align: 'center', color: 'orange' };
    gMemes[gCurrMemeIdx].lines.push(newLine)
    console.log(gMemes[gCurrMemeIdx].lines);
}

function deleteLine() {
    var lines = gMemes[gCurrMemeIdx].lines;
    console.log(lines)
    var currMeme = gMemes[gCurrMemeIdx].selectedLineIdx;
    lines[currMeme].txt = '';
}