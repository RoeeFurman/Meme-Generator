'use strict';

$(onInit);

function onInit() {
    renderBooks();
}

function renderBooks() {
    var books = getBooks();
    var strHtmls = books.map((book) => {
        return `<tr>
                <td class="book-id">${book.id}</td>
                <td class="book-name">${book.name}</td>
                <td class="book-price" data-price="${book.price}">
                   ${getConvertedCurr(book.price)}
                </td>
                <td><button class="btn-read" data-trans="read" onclick="onReadBook('${
                    book.id
                }')">${getTrans('read')}</button></td>
                <td><button class="btn-update" data-trans="update" onclick="onUpdateBook('${
                    book.id
                }')">${getTrans('update')}</button></td>
                <td><button class="btn-delete" data-trans="delete" onclick="onRemoveBook('${
                    book.id
                }')">${getTrans('delete')}</button></td>
                </td>`;
    });

    document.querySelector('.books-table').innerHTML = strHtmls.join('');
    renderPagesCount();
}

function onRemoveBook(bookId) {
    removeBook(bookId);

    var elNotification = document.querySelector('.notification');
    elNotification.classList.add('open');

    setTimeout(() => elNotification.classList.remove('open'), 1000);

    renderBooks();
}

function onAddBook() {
    var elName = document.querySelector('.input-name');
    var name = elName.value;
    var elPrice = document.querySelector('.input-price');
    var price = elPrice.value;

    if (price && name) {
        addBook(name, price);
        renderBooks();
    }
}

function onUpdateBook(bookId) {
    var newPrice = prompt('What is the new price of the book?');

    updateBook(bookId, newPrice);
    renderBooks();
}

function onReadBook(bookId) {
    var book = getBookById(bookId);
    _saveBooksToStorage('currBook', book);
    var elModal = document.querySelector('.modal');
    elModal.querySelector('h3').innerText = book.name;
    elModal.querySelector('.id-span').innerText = book.id;
    elModal.querySelector('.price-span').innerText = book.price;
    elModal.querySelector('.rate').innerText = book.rate;
    elModal.classList.add('open');
    var elImg = document.querySelector('.img');
    elImg.src = `./img/${book.imgUrl}.png`;
}

function onChangeRate(val) {
    var newRate = changeRate(val);
    var elRate = document.querySelector('.rate');
    elRate.innerText = newRate;
}

function closeModal() {
    _saveBooksToStorage('currBook', null);
    var elModal = document.querySelector('.modal');
    elModal.classList.remove('open');
}

function onSetSort(val) {
    getBooksToShow(val);
    renderBooks();
}

function onSetNextPage(val) {
    setNextPage(val);
    renderBooks();
}

function renderPagesCount() {
    setPagesCount();
    var pagesInfo = getPagesInfo();
    var pagesCount = pagesInfo.count;
    var currPageIdx = pagesInfo.idx;
    var strHtml = '';
    for (var i = 0; i < pagesCount; i++) {
        strHtml += `<span class="page-num ${i} ${
            currPageIdx === i ? 'selected' : ''
        }" onclick="onSetNextPage(${i})" > ${i + 1}</span>`;
    }
    var elPageNums = document.querySelector('.pages-nav');
    elPageNums.innerHTML = strHtml;
}

function onSetLang(value) {
    setLang(value);
    if (value === 'he') document.body.classList.add('rtl');
    else document.body.classList.remove('rtl');
    doTrans();
    doConvert();
    var els = document.querySelectorAll('.languege span');
    els.forEach((el) => el.classList.toggle('selected'));

}

function doTrans() {
    var els = document.querySelectorAll('[data-trans]');
    els.forEach((el) => {
        var transKey = el.dataset.trans;
        if (!transKey) return 'UNKNOWN';

        var txt = getTrans(transKey);

        if (el.nodeName === 'INPUT') el.placeholder = txt;
        else el.innerText = txt;
    });
}

function doConvert() {
    var elPrices = document.querySelectorAll('[data-price]');
    elPrices.forEach((el) => {
        el.innerText = getConvertedCurr(el.dataset.price);
    });
}
