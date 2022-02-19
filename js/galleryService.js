'use strict'

var gImgsToShow = [];

var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['funny', 'trump', 'politics'] },
    { id: 2, url: 'img/2.jpg', keywords: ['funny', 'dogs', 'dog', 'two', 'love'] },
    { id: 3, url: 'img/3.jpg', keywords: ['funny', 'dogs', 'dog', 'baby', 'two', 'cute'] },
    { id: 4, url: 'img/4.jpg', keywords: ['funny', 'cat', 'sleep', 'computer'] },
    { id: 5, url: 'img/5.jpg', keywords: ['funny', 'baby', 'power', 'sucsses'] },
    { id: 6, url: 'img/6.jpg', keywords: ['funny', 'man'] },
    { id: 7, url: 'img/7.jpg', keywords: ['funny', 'baby', 'curious', 'shock'] },
    { id: 8, url: 'img/8.jpg', keywords: ['funny', 'man', 'men', 'curious', 'bizar'] },
    { id: 9, url: 'img/9.jpg', keywords: ['funny', 'baby', 'evil', 'laughing'] },
    { id: 10, url: 'img/10.jpg', keywords: ['funny', 'politics', 'man', 'laughing', 'obama'] },
    { id: 11, url: 'img/11.jpg', keywords: ['funny', 'men', 'man', 'sport'] },
    { id: 12, url: 'img/12.jpg', keywords: ['funny', 'man', 'haim', 'hecht'] },
    { id: 13, url: 'img/13.jpg', keywords: ['funny', 'man', 'cheers', 'leonardo', 'drink'] },
    { id: 14, url: 'img/14.jpg', keywords: ['funny', 'matrix', 'man', 'sunglasses'] },
    { id: 15, url: 'img/15.jpg', keywords: ['funny', 'man'] },
    { id: 16, url: 'img/16.jpg', keywords: ['funny', 'man', 'evil', 'bald', 'laughing'] },
    { id: 17, url: 'img/17.jpg', keywords: ['funny', 'politics', 'putin', 'two'] },
    { id: 18, url: 'img/18.jpg', keywords: ['funny', 'toys', 'toy story', 'budd'] }
];

function getImgById(id) {
    return gImgs.find((img) => id === img.id)
}

function getRandImg() {
    return gImgs[getRandomInt(0, gImgs.length)];
}

function getImgsToShow(value) {
    if (value === 'saved') gImgsToShow = getSavedImgs();
    else if (!value) gImgsToShow = gImgs
    else {
        gImgsToShow = [];
        gImgs.forEach(img => {
            var keyword = img.keywords;
            keyword.forEach(key => {
                if (key === value) gImgsToShow.push(img)
            })
        })
    }
    console.log(gImgsToShow)
    return (gImgsToShow);
}


function getSavedMemes() {
    return loadFromStorage('Saved memes');
}

function getSavedImgs() {
    return loadFromStorage('Saved Imgs');
}