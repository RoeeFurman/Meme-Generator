'use strict'


//utils JS

function renderBoard(mat, selector) {
    var strHTML = '<table border="0"><tbody class="board-table">';
    for (var i = 0; i < mat.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < mat[0].length; j++) {
            var cell = mat[i][j];
            var className = 'cell-' + i + '-' + j;

            strHTML += `<td id='${[i]}-${[j]}' onClick="cellClicked(this, ${i},${j})" class="${className}" oncontextmenu="cellMarked(this, ${i},${j})"></td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>';
    var elContainer = document.querySelector(selector);
    elContainer.innerHTML = strHTML;
}

function runTimer() {
    var clock;
    var min = 0;

    gInterval = setInterval(() => {
        gGame.secsPassed += 1;
        if (gGame.secsPassed < 10) {
            clock = '0' + min + ':0' + gGame.secsPassed;
        } else if (gGame.secsPassed < 60) {
            clock = '0' + min + ':' + gGame.secsPassed;
        } else {
            min += 1;
            gGame.secsPassed = 0;
            clock = '0' + min + ':0' + gGame.secsPassed;
        }

        var elTimer = document.querySelector('.timer');
        elTimer.innerText = clock;
    }, 1000)
}

function renderCell(location, value) {
    var elCell = document.querySelector(`.cell-${location.i}-${location.j}`);
    elCell.innerHTML = value;
}

function changeHTML(value, classname) {
    var smiley = document.querySelector(classname);
    return smiley.innerHTML = value;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function shuffle(items) {
    var randIdx, keep
    for (var i = items.length - 1; i > 0; i--) {
        randIdx = getRandomInt(0, items.length - 1);

        keep = items[i];
        items[i] = items[randIdx];
        items[randIdx] = keep;
    }
    return items;
}

function makeEmptyCellsArr(board) {
    var emptyCellsArr = [];

    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (isCellEmpty(i, j, board)) {
                emptyCellsArr.push({ i: i, j: j });
            }
        }
    }
    return emptyCellsArr;
}

function isCellEmpty(idxI, idxJ, board) {
    if (board[idxI][idxJ] === ' ') return true;
    else return false;
}

function makeId(length = 4) {
    const possible = '0123456789';
    var txt = '';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function makeLorem(wordCount = 100) {
    const words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', 'All', 'this happened', 'more or less', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', 'It', 'was', 'a pleasure', 'to', 'burn'];
    var txt = '';
    while (wordCount > 0) {
        wordCount--;
        txt += words[Math.floor(Math.random() * words.length)] + ' ';
    }
    return txt;
}