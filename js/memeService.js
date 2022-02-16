'use strict'


var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['funny', 'politics'] },
    { id: 2, url: 'img/2.jpg', keywords: ['funny', 'dog', 'dogs'] },
];

var gMeme = {
    selectedImgId: 2,
    selectedLineIdx: 0,
    lines: [{ txt: 'I sometimes eat Falafel', size: 25, align: 'left', color: 'blue' }] //array?
}


function getMeme() {
    //TODO: gMeme = loadFromStorage(currMeme)
    return gMeme;
}


function setLineText(value){
    // value = ;
    gMeme.lines[0].txt = value;
}