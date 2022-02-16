'use strict'

var gCurrMemeIdx = 0;

var gMemes = [
    {
        selectedImgId: 2,
        selectedLineIdx: 0,
        lines: [
            { txt: 'I sometimes eat Falafel', size: 25, align: 'left', color: 'blue' },
            { txt: 'I sometimes eat shakshuka', size: 25, align: 'left', color: 'green' }
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
        selectedImgId: 9,
        selectedLineIdx: 0,
        lines: [{ txt: 'I  Falafel', size: 15, align: 'left', color: 'blue' }]
    },
    {
        selectedImgId: 8,
        selectedLineIdx: 0,
        lines: [{ txt: 'eat Falafel', size: 45, align: 'left', color: 'blue' }]
    },
    {
        selectedImgId: 7,
        selectedLineIdx: 0,
        lines: [{ txt: 'I', size: 55, align: 'left', color: 'blue' }]
    },
]

// var gMeme = {
//     selectedImgId: 2,
//     selectedLineIdx: 0,
//     lines: [{ txt: 'I sometimes eat Falafel', size: 25, align: 'left', color: 'blue' }]
// }


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