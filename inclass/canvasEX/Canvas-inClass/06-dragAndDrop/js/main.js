var gElCanvas
var gCtx
var gStartPos
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    resizeCanvas()
    const center = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }
    createCircle(center)

    addListeners()
    renderCanvas()
}

function renderCanvas() {
    gCtx.save()
    gCtx.fillStyle = "#ede5ff"
    gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
    renderCircle()
    gCtx.restore()
}

function renderCircle() {
    const { pos, color, size } = getCircle()
    drawArc(pos.x, pos.y, size, color)
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderCanvas()
    })
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    const pos = getEvPos(ev)
    console.log('onDown()');
    if (!isCircleClicked(pos)) return
    setCircleDrag(true)
    gStartPos = pos
    document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
    console.log('onMove()');
    const circle = getCircle();
    if (circle.isDrag) {
        const pos = getEvPos(ev)
        const dx = pos.x - gStartPos.x
        const dy = pos.y - gStartPos.y
        moveCircle(dx, dy)
        gStartPos = pos
        renderCanvas()
    }
}

function onUp() {
    console.log('onUp()');
    setCircleDrag(false)
    document.body.style.cursor = 'grab'
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}

function getEvPos(ev) {
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

function drawArc(x, y, size = 60, color = 'blue') {
    gCtx.beginPath()
    gCtx.lineWidth = '6'
    gCtx.arc(x, y, size, 0, 2 * Math.PI)
    gCtx.strokeStyle = 'white'
    gCtx.stroke()
    gCtx.fillStyle = color
    gCtx.fill()
}

