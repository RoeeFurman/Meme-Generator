'use strict';

var gCurrLang = 'en';

var gCurrency = {
    currencyState: {
        en: 'en-US',
        he: 'he-IL',
    },
    currencyCode:{
        en: 'USD' ,
        he: 'ILS'
    },
    conversionRate:{
        en: 1 ,
        he: 3.22
    }
}

var gTrans = {
    subtitle: {
        en: 'MVC - Model-View-Controller',
        he: 'מודל - ויו - קונטרולר',
    },
    title: {
        en: 'Title',
        he: 'שם הספר',
    },
    price: {
        en: 'Price',
        he: 'מחיר',
    },
    id: {
        en: 'Id',
        he: 'מס סידורי',
    },
    read: {
        en: 'Read',
        he: 'קרא עוד',
    },
    update: {
        en: 'Update',
        he: 'עדכן',
    },
    delete: {
        en: 'Delete',
        he: 'מחק',
    },
    actions: {
        en: 'Actions',
        he: 'פעולות',
    },
    'Insert Book name': {
        en: 'Insert Book name',
        he: 'הכנס שם ספר',
    },
    'add-book': {
        en: 'Add book',
        he: 'הוסף ספר',
    },
    'book-shop': {
        en: 'Book Shop',
        he: 'חנות ספרים',
    },
    welcome: {
        en: 'Welcome to my bookshop',
        he: 'ברוכים הבאים',
    },
    'book-deleted': {
        en: 'Book deleted',
        he: 'ספר נמחק',
    },
};

function setLang(val) {
    gCurrLang = val;
    console.log(gCurrLang, 'gcurrlang');
}

function getTrans(word) {
    return gTrans[word][gCurrLang];
}

function getConvertedCurr(val) {
 // For i18n formatting
 var currencyState = gCurrency.currencyState[gCurrLang];
 var currencyCode =gCurrency.currencyCode[gCurrLang];
 // For converting the currency value
 var conversionRate = gCurrency.conversionRate[gCurrLang];
 var newVal = +val *conversionRate

 return new Intl.NumberFormat(currencyState, {
     style: 'currency',
     currency: currencyCode,
 }).format(newVal);
}
