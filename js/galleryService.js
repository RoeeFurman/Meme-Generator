'use strict'

var gImgs = [
    { id: 5, url: 'img/1.jpg', keywords: ['funny', 'politics'] },
    { id: 9, url: 'img/9.jpg', keywords: ['funny', 'dog', 'dogs'] },
    { id: 8, url: 'img/8.jpg', keywords: ['funny', 'dog', 'dogs'] },
    { id: 7, url: 'img/7.jpg', keywords: ['funny', 'dog', 'dogs'] }
];

function getImgById(id){
    return gImgs.find((img) => id === img.id)
}