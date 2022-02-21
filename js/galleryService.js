'use strict'

var gImgsToShow = [];

var gImgs = [
    { id: 20, url: 'img/20.jpeg', keywords: ['funny', 'dog', 'maggie', 'cute'] },
    { id: 1, url: 'img/1.jpg', keywords: ['funny', 'trump', 'politics'] },
    { id: 2, url: 'img/2.jpg', keywords: ['funny', 'dogs','dog', 'two', 'love'] },
    { id: 3, url: 'img/3.jpg', keywords: ['funny', 'dogs', 'dog', 'baby', 'two', 'cute','sleep'] },
    { id: 4, url: 'img/4.jpg', keywords: ['funny', 'cat', 'sleep', 'computer', 'cute'] },
    { id: 5, url: 'img/5.jpg', keywords: ['funny', 'baby', 'power', 'sucsses'] },
    { id: 6, url: 'img/6.jpg', keywords: ['funny', 'man'] },
    { id: 7, url: 'img/7.jpg', keywords: ['funny', 'baby', 'curious', 'shock'] },
    { id: 22, url: 'img/22.jpeg', keywords: ['funny', 'dog', 'maggie', 'cute'] },
    { id: 8, url: 'img/8.jpg', keywords: ['funny', 'man', 'men', 'curious', 'bizar'] },
    { id: 9, url: 'img/9.jpg', keywords: ['funny', 'baby', 'evil', 'laughing'] },
    { id: 10, url: 'img/10.jpg', keywords: ['funny', 'politics', 'man', 'laughing', 'obama'] },
    { id: 19, url: 'img/19.jpeg', keywords: ['funny', 'dog', 'maggie'] },
    { id: 11, url: 'img/11.jpg', keywords: ['funny', 'men', 'man', 'sport'] },
    { id: 12, url: 'img/12.jpg', keywords: ['funny', 'man', 'haim', 'hecht'] },
    { id: 13, url: 'img/13.jpg', keywords: ['funny', 'man', 'cheers', 'leonardo', 'drink'] },
    { id: 14, url: 'img/14.jpg', keywords: ['funny', 'matrix', 'man', 'sunglasses'] },
    { id: 15, url: 'img/15.jpg', keywords: ['funny', 'man'] },
    { id: 21, url: 'img/21.jpeg', keywords: ['funny', 'dog', 'maggie', 'cute'] },
    { id: 16, url: 'img/16.jpg', keywords: ['funny', 'man', 'evil', 'bald', 'laughing'] },
    { id: 17, url: 'img/17.jpg', keywords: ['funny', 'politics', 'putin', 'two'] },
    { id: 18, url: 'img/18.jpg', keywords: ['funny', 'toys', 'toy story', 'budd'] }
];

var keywords = ["funny","maggie", "dogs", "dog", "love", "politics", "trump", "obama", "baby", "cute", "cat", "computer", "sleep", "power", "sucsses", "curious",
    "shock", "man", "men", "bizar", "evil", "laughing", "sport", "cheers", "drink", "leonardo", "matrix", "sunglasses", "bald", "putin",
    "two", "toys", "toy story", "budd", "bald"]

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
                if (key.startsWith(value)) gImgsToShow.push(img)
            })
        })
    }
    return (gImgsToShow);
}

function getSavedMemes() {
    return loadFromStorage('Saved memes');
}

function getSavedImgs() {
    return loadFromStorage('Saved Imgs');
}

function clearSaved() {
    saveToStorage('Saved memes', '')
    saveToStorage('Saved Imgs', '')
}

function getImgFromMemeIdx(meme){
    var id = meme.selectedImgId;
    // console.log(id);
    return gImgs.find(img => img.id === id)
}
