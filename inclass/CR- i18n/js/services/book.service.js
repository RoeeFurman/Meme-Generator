'use strict';

const STORAGE_KEY = 'bookDB';
const PAGE_SIZE = 8;

var gBooks = loadFromStorage('books');
var gSortBy;
var gPageIdx = 0;
var gPagesCount;

_createBooks();

function _createBook(name, price = getRandomInt(1, 99)) {
    return {
        id: makeId(),
        name,
        price,
        imgUrl: getRandomInt(1, 8),
        rate: 0,
    };
}

function getBooksForDisplay() {
    return gBooks;
}

function _createBooks() {
    var books = loadFromStorage('books');

    if (!books || !books.length) {
        books = [];
        books[0] = _createBook('hatafsan');
        books[1] = _createBook('lohed hahalomot');
        books[2] = _createBook('milonit');
        books[3] = _createBook('abba ashir');
        books[4] = _createBook('abba ani');

        _saveBooksToStorage('books', books);
    }
    gBooks = books;
}

function removeBook(bookId) {
    const bookIdx = gBooks.findIndex((book) => bookId === book.id);
    gBooks.splice(bookIdx, 1);
    _saveBooksToStorage();
}

function addBook(name, price) {
    var newBook = _createBook(name, price);
    gBooks.unshift(newBook);
    _saveBooksToStorage('books', gBooks);
}

function updateBook(bookId, newPrice) {
    const book = gBooks.find((book) => bookId === book.id); //book
    book.price = newPrice;

    _saveBooksToStorage('books', gBooks);
    return book;
}

function changeRate(val) {
    var currBook = loadFromStorage('currBook');
    if (
        (val === '+' && currBook.rate >= 10) ||
        (val === '-' && currBook.rate <= 0)
    )
        return;

    currBook.rate += val === '+' ? 1 : -1;

    var changeBookIdx = gBooks.findIndex((book) => book.name === currBook.name);
    gBooks.splice(changeBookIdx, 1);
    gBooks.unshift(currBook);

    _saveBooksToStorage('currBook', currBook);
    _saveBooksToStorage('books', gBooks);

    return currBook.rate;
}

function getBooksToShow(val) {
    gSortBy = val;

    if (val === 'PRICE') gBooks.sort((c1, c2) => c1.price - c2.price);
    else if (val === 'TITLE')
        gBooks.sort((c1, c2) => c1.name.localeCompare(c2.name));
    else if (val === 'ID') gBooks.sort((c1, c2) => c1.id - c2.id);

    _saveBooksToStorage('books', gBooks);
    return gBooks;
}

function getBooks() {
    var books = gBooks;
    const startIdx = gPageIdx * PAGE_SIZE;
    books = books.slice(startIdx, startIdx + PAGE_SIZE);
    return books;
}

function setNextPage(val) {
    gPageIdx = val;
}

function getPagesInfo() {
    return { idx: gPageIdx, count: gPagesCount };
}

function setPagesCount() {
    gPagesCount = Math.ceil(gBooks.length / PAGE_SIZE);
}

function getBookById(bookId) {
    return gBooks.find((book) => bookId === book.id);
}
