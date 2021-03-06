'use strict'

const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

function init() {
    gMemes = createMemes(22)
    console.log(gMemes)
    // renderMeme(gMemes[0])
    addListeners()
    openGallery()
    renderGallery(gSortBy)
    renderWordsToBar()
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
}

function addMouseListeners() {
    gCanvas.addEventListener('mousemove', onMove)
    gCanvas.addEventListener('mousedown', onDown)
    gCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gCanvas.addEventListener('touchmove', onMove)
    gCanvas.addEventListener('touchstart', onDown)
    gCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    const pos = getEvPos(ev)
    // console.log('onDown()');
    // console.log(pos, 'pos');
    if (isLineClicked(pos) < 0) return
    setLineDrag(true)
    gStartPos = pos
    document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
    // console.log('onMove()');
    if (gDragLine) {
        // console.log('now drag')
        const pos = getEvPos(ev)
        const dx = pos.x - gStartPos.x
        const dy = pos.y - gStartPos.y
        moveLine(dx, dy)
        gStartPos = pos
        // console.log(gStartPos);
        renderMeme(gMemes[gCurrMemeIdx]);
    }
}

function onUp() {
    // console.log('onUp()');
    setLineDrag(false)
    document.body.style.cursor = 'grab'
}

function getEvPos(ev) {
    // console.log(ev);
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}

