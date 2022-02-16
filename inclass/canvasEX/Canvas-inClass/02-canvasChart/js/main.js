var gStars = [
    {
        name: 'Shabi',
        rate: 200,
    },
    {
        name: 'Uza',
        rate: 130
    },
    {
        name: 'Batz',
        rate: 250
    }
]

var gCanvas
var gCtx
var gBarWidth = 40

function init() {
    gCanvas = document.getElementById('my-canvas')
    gCtx = gCanvas.getContext('2d')

    drawCharts()
    // gCtx.fillStyle = 'pink'
    // gCtx.fillRect(0, 0, gCanvas.width, gCanvas.height)
}

function drawCharts() {
    // TODO: start from drawing a bar for single star
    // TODO: draw a bar for each star
    const PAD_START = 20
    const PAD_BETWEEN = 40
    gStars.forEach((star, idx) => {
        star.x = PAD_START + (idx * (gBarWidth + PAD_BETWEEN))
        star.y = gCanvas.height - star.rate

        gCtx.fillRect(star.x, star.y, gBarWidth, star.rate)
    })
}

function canvasClicked(ev) {
    const clickedStar = gStars.find(star =>
        ev.offsetX >= star.x && ev.offsetX <= star.x + gBarWidth &&
        ev.offsetY >= star.y && ev.offsetY <= star.y + star.rate
    )
    console.log(clickedStar);
    // TODO: find out if clicked a star bar
    // ev.offsetX >= star.x && ev.offsetX <= star.x + gBarWidth &&
    // ev.offsetY >= star.y && ev.offsetY <= star.y + star.rate


    if (clickedStar) openModal(clickedStar.name, clickedStar.rate, ev.clientX, ev.clientY)
    else closeModal()
}

function openModal(starName, starRate, x, y) {
    // TODO: open the modal with the given text in the given coordinates 
    // (style.top = style.left = 18 + 'px')
    const elModal = document.querySelector('.modal')
    elModal.style.top = y + 'px'
    elModal.style.left = x + 'px'
    const msg = `${starName} is ${starRate}% awesome`
    elModal.innerText = msg
    elModal.hidden = false
}

function closeModal() {
    const elModal = document.querySelector('.modal')
    elModal.hidden = true
}