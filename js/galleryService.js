'use strict'

var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['funny', 'politics'] },
    { id: 2, url: 'img/2.jpg', keywords: ['funny', 'politics'] },
    { id: 3, url: 'img/3.jpg', keywords: ['funny', 'politics'] },
    { id: 4, url: 'img/4.jpg', keywords: ['funny', 'politics'] },
    { id: 5, url: 'img/5.jpg', keywords: ['funny', 'politics'] },
    { id: 6, url: 'img/6.jpg', keywords: ['funny', 'politics'] },
    { id: 7, url: 'img/7.jpg', keywords: ['funny', 'dog', 'dogs'] },
    { id: 8, url: 'img/8.jpg', keywords: ['funny', 'dog', 'dogs'] },
    { id: 9, url: 'img/9.jpg', keywords: ['funny', 'dog', 'dogs'] },
    { id: 10, url: 'img/10.jpg', keywords: ['funny', 'dog', 'dogs'] },
    { id: 11, url: 'img/11.jpg', keywords: ['funny', 'dog', 'dogs'] },
    { id: 12, url: 'img/12.jpg', keywords: ['funny', 'dog', 'dogs'] },
    { id: 13, url: 'img/13.jpg', keywords: ['funny', 'dog', 'dogs'] },
    { id: 14, url: 'img/14.jpg', keywords: ['funny', 'dog', 'dogs'] },
    { id: 15, url: 'img/15.jpg', keywords: ['funny', 'dog', 'dogs'] },
    { id: 16, url: 'img/16.jpg', keywords: ['funny', 'dog', 'dogs'] },
    { id: 17, url: 'img/17.jpg', keywords: ['funny', 'dog', 'dogs'] },
    { id: 18, url: 'img/18.jpg', keywords: ['funny', 'dog', 'dogs'] }
];

function getImgById(id){
    return gImgs.find((img) => id === img.id)
}