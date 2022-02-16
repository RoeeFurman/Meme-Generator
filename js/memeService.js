'use strict'


var gImgs = [
    { id: 5, url: 'img/1.jpg', keywords: ['funny', 'politics'] },
    { id: 9, url: 'img/9.jpg', keywords: ['funny', 'dog', 'dogs'] },
    { id: 8, url: 'img/8.jpg', keywords: ['funny', 'dog', 'dogs'] },
    { id: 7, url: 'img/7.jpg', keywords: ['funny', 'dog', 'dogs'] }
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