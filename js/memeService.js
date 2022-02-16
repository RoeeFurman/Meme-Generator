'use strict'

var gCurrMemeIdx = 0;

var gMemes = [
    {
        selectedImgId: 2,
        selectedLineIdx: 0,
        lines: [{ txt: 'I sometimes eat Falafel', size: 25, align: 'left', color: 'blue' }]
    },
    {
        selectedImgId: 5,
        selectedLineIdx: 0,
        lines: [{ txt: 'I  eat Falafel', size: 38, align: 'left', color: 'blue' }]
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

var gMeme = {
    selectedImgId: 2,
    selectedLineIdx: 0,
    lines: [{ txt: 'I sometimes eat Falafel', size: 25, align: 'left', color: 'blue' }]
}


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
    gMemes[gCurrMemeIdx].lines[0].txt = value; //get position
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