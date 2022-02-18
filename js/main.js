'use strict'


const gTouchEvs = ['touchstart', 'touchmove', 'touchend']




function init() {
    console.log('good luck');
    console.log(gMemes[0], 'gMeme');
    console.log(gMemes, 'gMemes');
    console.log(gImgs, 'gImgs');
    renderMeme(gMemes[0])
    openGallery()
    // openEditor()
    // closeGallery()
    addListeners()

    // resizeCanvas() // responsive
    renderGallery()

    // window.addEventListener('resize', () => {
    //     console.log('resized')
    //     resizeCanvas()

    //     renderMeme(gMemes[gCurrMemeIdx])
    //     // Debouncing?..
    //     //   drawText('Nothing like a good stretch ' + Date.now(), 0, 225)
    // })
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
    // window.addEventListener('resize', () => {
    //     resizeCanvas()
    //     renderCanvas()
    // })
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
    console.log('onDown()');
    console.log(pos, 'pos');
    if (isLineClicked(pos) < 0) return
    setLineDrag(true)
    gStartPos = pos
    document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
    console.log('onMove()');
    // const circle = getCircle();
    if (gDragLine) {
        console.log('now drag')
        const pos = getEvPos(ev)
        const dx = pos.x - gStartPos.x
        const dy = pos.y - gStartPos.y
        moveLine(dx, dy)
        gStartPos = pos
        console.log(gStartPos);
        renderMeme(gMemes[gCurrMemeIdx]);
    }
}

function onUp() {
    console.log('onUp()');
    setLineDrag(false)
    document.body.style.cursor = 'grab'
}

function getEvPos(ev) {
    console.log(ev);
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

