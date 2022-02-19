'use strict'

var gSortBy;
const gPopularKeywords = {cute: 2, funny: 5, dogs: 2, politics: 1, maggie: 10, sucsses: 1};

function renderGallery(gSortBy) {
    var imgs = getImgsToShow(gSortBy);

    var strHtmls;
    if (gSortBy === 'empty') {
        strHtmls = '<br> No saved Memes';
        closeSmallModal()
        document.querySelector('.gallery-grid').innerHTML = strHtmls;
    } else {
        strHtmls = imgs.map((img) => {
            return `<img src="${img.url}" id="${img.id}" class="img ${img.id}" onclick="onImgClicked(${img.id})">`
        });

        document.querySelector('.gallery-grid').innerHTML = strHtmls.join('');
    }
}

function onImgClicked(idx) {
    console.log(idx, 'imgID');
    var currMeme = getMemeIdxByPicId(idx);
    console.log(currMeme, 'currMeme')
    gCurrMemeIdx = currMeme;
    console.log(gCurrMemeIdx, 'gcurrMEMEidx');
    renderMeme(gMemes[currMeme]);
    closeGallery();
    clearInput()
}

function closeGallery() {
    var elGallery = document.querySelector('.gallery-container');
    elGallery.classList.add('none')

    var elGalleryBtn = document.querySelector('.gallery');
    elGalleryBtn.classList.remove('clicked-btn');

    openEditor();
}

function openGallery() {
    closeSmallModal()
    renderGallery()
    var elGallery = document.querySelector('.gallery-container');
    elGallery.classList.remove('none');

    var elGalleryBtn = document.querySelector('.gallery');
    elGalleryBtn.classList.add('clicked-btn');
    closeModal()
    closeEditor();
}

function onFlexible() {
    console.log('flexy');
    var randomMeme = doFlexiblaMode();
    renderMeme(randomMeme)
    closeGallery();
    openEditor();
}

function onSort(value) {
    gSortBy = value;
    if (keywords.includes(value)) {

        if (value) {
            if (gPopularKeywords[gSortBy]) gPopularKeywords[gSortBy]++
            else gPopularKeywords[gSortBy] = 1;
        }
        renderWordsToBar();
        getImgsToShow(gSortBy);
        renderGallery(gSortBy)
    }
}


function onGoToMyMemes() {
    var elGalleryBtn = document.querySelector('.gallery');
    elGalleryBtn.classList.remove('clicked-btn');

    var savedMemes = getSavedImgs()
    if (!savedMemes) renderGallery('empty')
    else {
        openSmallModal()
        console.log('going to saved memes')
        console.log(savedMemes)
        getImgsToShow('saved');
        renderGallery('saved')
    }
}

function onClearSaved() {
    gSavedImgs = []
    gSavedMemes = []
    clearSaved()
    gSortBy = 'empty'
    renderGallery(gSortBy)
}

function openSmallModal() {
    var elClearBtm = document.querySelector('.small-modal');
    elClearBtm.classList.remove('none')
}

function closeSmallModal() {
    var elClearBtm = document.querySelector('.small-modal');
    elClearBtm.classList.add('none')
}

function renderWordsToBar() {
    var elBar = document.querySelector('.top-search-words');
    var strHtmls = '';

    for (const [key, value] of Object.entries(gPopularKeywords)) {
        strHtmls += `<span style="font-size: ${value + 16}px; margin-left:1em">${key}</span>`
    }
    elBar.innerHTML = strHtmls;
}