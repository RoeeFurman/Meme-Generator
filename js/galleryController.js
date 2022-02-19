'use strict'

var gSortBy;

function renderGallery(gSortBy) {
    var imgs = getImgsToShow(gSortBy);
    console.log(imgs)
    // var gImgs = getimgs();

    var strHtmls = imgs.map((img) => {
        return `<img src="${img.url}" id="${img.id}" class="img ${img.id}" onclick="onImgClicked(${img.id})">`
    });

    document.querySelector('.gallery-grid').innerHTML = strHtmls.join('');
}


function onImgClicked(idx){
    console.log(idx, 'imgID');
    var currMeme = getMemeIdxByPicId(idx);
    console.log(currMeme, 'currMeme')
    gCurrMemeIdx = currMeme;
    console.log(gCurrMemeIdx, 'gcurrMEMEidx');
    renderMeme(gMemes[currMeme]);
    closeGallery();
    clearInput()
}

function closeGallery(){
    var elGallery = document.querySelector('.gallery-container');
    elGallery.classList.add('none')

    var elGalleryBtn = document.querySelector('.gallery');
    elGalleryBtn.classList.remove('clicked-btn');
    
    openEditor();
}

function openGallery(){
    renderGallery()
    var elGallery = document.querySelector('.gallery-container');
    elGallery.classList.remove('none');

    var elGalleryBtn = document.querySelector('.gallery');
    elGalleryBtn.classList.add('clicked-btn');
    closeModal()
    closeEditor();
}


function onFlexible(){
    console.log('flexy');
    var randomMeme = doFlexiblaMode();
    renderMeme(randomMeme)
    closeGallery();
    openEditor();
}

function onSort(value){
    gSortBy = value;
    console.log(gSortBy)
    getImgsToShow(gSortBy);
    renderGallery(gSortBy)
}


function onGoToMyMemes(){
    console.log('going to saved memes')
    var savedMemes = getSavedImgs()
    console.log(savedMemes)
    getImgsToShow('saved');
    renderGallery('saved')
}