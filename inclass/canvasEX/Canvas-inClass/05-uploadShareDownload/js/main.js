var gElCanvas;
var gCtx;

function init() {
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
    resizeCanvas()
}


function downloadImg(elLink) {
    var imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}


// The next 2 functions handle IMAGE UPLOADING to img tag from file system: 
function onImgInput(ev) {
    loadImageFromInput(ev, renderImg)
}

function loadImageFromInput(ev, onImageReady) {
    document.querySelector('.share-container').innerHTML = ''
    var reader = new FileReader()

    reader.onload = function (event) {
        console.log('onload');
        var img = new Image()
        // Render on canvas
        img.onload = onImageReady.bind(null, img)
        img.src = event.target.result
        gImg = img
    }
    console.log('after');
    reader.readAsDataURL(ev.target.files[0])
}


function renderImg(img) {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
}


function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}

