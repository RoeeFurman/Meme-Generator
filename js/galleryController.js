'use strict'


function renderGallery() {
    var imgs = gImgs;
    
    // var gImgs = getimgs();

    var strHtmls = imgs.map((img) => {
        return `<img src="${img.url}" id="${img.id}" class="img ${img.id}" onclick="onImgClicked(${img.id})">`
                
        // `<tr>
        // <td class="book-id">${book.id}</td>
        // <td class="book-name">${book.name}</td>
        // <td class="book-price" data-price="${book.price}">
        //            ${getConvertedCurr(book.price)}
        //         </td>
        //         <td><button class="btn-read" data-trans="read" onclick="onReadBook('${book.id
        //     }')">${getTrans('read')}</button></td>
        //         <td><button class="btn-update" data-trans="update" onclick="onUpdateBook('${book.id
        //     }')">${getTrans('update')}</button></td>
        //         <td><button class="btn-delete" data-trans="delete" onclick="onRemoveBook('${book.id
        //     }')">${getTrans('delete')}</button></td>
        //         </td>`;
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
    var elGallery = document.querySelector('.gallery-container');
    elGallery.classList.remove('none');

    var elGalleryBtn = document.querySelector('.gallery');
    elGalleryBtn.classList.add('clicked-btn');
    closeModal()
    closeEditor();
}