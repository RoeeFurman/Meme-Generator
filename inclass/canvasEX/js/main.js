'use strict'

var gCanvas;
var gCtx;
var gCurrShape;
var gColor = 'black';
var gDrag = false;
var gImg;

function init() {
    gCanvas = document.getElementById('my-canvas');
    gCtx = gCanvas.getContext('2d');

    addListeners()
    resizeCanvas()

    //   window.addEventListener('resize', resizeCanvas)
    window.addEventListener('resize', () => {
        console.log('resized')
        resizeCanvas()
            // Debouncing?..
            //   drawText('Nothing like a good stretch ' + Date.now(), 0, 225)
    })
}

function getColor() {
    gColor = document.querySelector('[name=user-background-color]').value;
    console.log(gColor);
}


function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container');
    // Note: changing the canvas dimension this way clears the canvas
    gCanvas.width = elContainer.offsetWidth - 200
        // Unless needed, better keep height fixed.
        //   gCanvas.height = elContainer.offsetHeight
}

// function onDraw(ev) {
//     const offsetX = ev.offsetX;
//     const offsetY = ev.offsetY;

//     if (gCurrShape === 'line') {
//         drawLine(offsetX, offsetY)
//     } else if (gCurrShape === 'triangle') {
//         drawTriangle(offsetX, offsetY);
//     } else if (gCurrShape === 'square') {
//         drawSquare(offsetX, offsetY);
//     } else if (gCurrShape === 'circle') {
//         drawArc(offsetX, offsetY);
//     } else if (gCurrShape === 'rectangle') {
//         drawRect(offsetX, offsetY);
//     } else if (gCurrShape === 'text') {
//         var text = prompt('what do you want to write?');
//         drawText(text, offsetX, offsetY)
//     }
// }

// function drawLine(x, y, xEnd = 250, yEnd = 250) {
//     gCtx.beginPath();
//     gCtx.lineWidth = 2;
//     gCtx.moveTo(x, y);
//     gCtx.lineTo(xEnd, yEnd);
//     gCtx.closePath();
//     gCtx.strokeStyle = gColor;
//     gCtx.stroke();
// }

function drawTriangle(x, y) {
    gCtx.beginPath();
    gCtx.lineWidth = 2;
    gCtx.moveTo(x, y);
    gCtx.lineTo(130, 330);
    gCtx.lineTo(50, 370);
    // gCtx.closePath();
    gCtx.lineTo(x, y);
    gCtx.fillStyle = gColor;
    gCtx.fill();
    gCtx.strokeStyle = 'black';
    gCtx.stroke();
    gCtx.closePath();
}

function drawSquare(x, y) {
    gCtx.beginPath();
    gCtx.rect(x, y, 50, 50);
    gCtx.fillStyle = gColor;
    gCtx.fillRect(x, y, 50, 50);
    gCtx.strokeStyle = 'black';
    gCtx.stroke();
}


function drawRect(x, y) {
    gCtx.beginPath();
    gCtx.rect(x, y, 150, 200);
    gCtx.fillStyle = gColor;
    gCtx.fillRect(x, y, 150, 200);
    gCtx.strokeStyle = 'black';
    gCtx.stroke();
}

function drawArc(x, y) {
    gCtx.beginPath();
    gCtx.lineWidth = 1;
    gCtx.arc(x, y, 6, 0, 2 * Math.PI);
    gCtx.strokeStyle = 'white';
    gCtx.stroke();
    gCtx.fillStyle = gColor;
    gCtx.fill();
}

function drawText(text, x, y) {
    // gCtx.font = '48px serif';
    // gCtx.fillText(text, x, y);

    gCtx.lineWidth = 2;
    gCtx.strokeStyle = gColor;
    gCtx.fillStyle = gColor;
    gCtx.font = '20px Arial';
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);
}


function clearCanvas() {
    // gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
    // You may clear part of the canvas
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
}


function onSetShape(shape) {
    gCurrShape = shape;
    console.log(gCurrShape);
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
    gCanvas.addEventListener('mousemove', onMove)
    gCanvas.addEventListener('mousedown', onDown)
    gCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gCanvas.addEventListener('touchmove', onMove)
    gCanvas.addEventListener('touchstart', onDown)
    gCanvas.addEventListener('touchend', onUp)
}

var lastX;
var lastY;

function onDown(ev) {
     lastX = ev.offsetX;
     lastY = ev.offsetY;

    console.dir(ev);
    const pos = getEvPos(ev)
    console.log('onDown()');
    gDrag = true;
    console.log(gDrag)
        // if (!isCircleClicked(pos)) return
        // setCircleDrag(true)
        // gStartPos = pos
        gCtx.beginPath();
        gCtx.lineWidth = 1;
        gCtx.moveTo(lastX, lastY);
    
    document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
    console.log('onMove()');
    const offsetX = ev.offsetX;
    const offsetY = ev.offsetY;

    if (gDrag) {
        if (gCurrShape === 'line') {

            // drawLine(offsetX, offsetY)

            gCtx.lineTo(offsetX, offsetY);
            gCtx.closePath();
            gCtx.strokeStyle = gColor;
            gCtx.stroke();
            // gCtx.clearRect( lastX,lastY,offsetX, offsetY)


        } else if (gCurrShape === 'triangle') {
            drawTriangle(offsetX, offsetY);
        } else if (gCurrShape === 'square') {
            drawSquare(offsetX, offsetY);
        } else if (gCurrShape === 'circle') {
            drawArc(offsetX, offsetY);
        } else if (gCurrShape === 'rectangle') {
            drawRect(offsetX, offsetY);
        } else if (gCurrShape === 'text') {
            var text = prompt('what do you want to write?');
            drawText(text, offsetX, offsetY)
        }
    }
    // const circle = getCircle();
    // if (circle.isDrag) {
    //     const pos = getEvPos(ev)
    //     const dx = pos.x - gStartPos.x
    //     const dy = pos.y - gStartPos.y
    //     moveCircle(dx, dy)
    // gStartPos = pos
    // renderCanvas()
}
// }

function onUp(ev) {
    console.log('onUp()');
    gDrag = false;
    console.log(gDrag)

    const offsetX = ev.offsetX;
    const offsetY = ev.offsetY;

    if (gCurrShape === 'line') {
        // drawLine(offsetX, offsetY)
        // gCtx.lineTo(offsetX, offsetY);
        // gCtx.closePath();
        // gCtx.strokeStyle = gColor;
        // gCtx.stroke();

        gCtx.lineTo(offsetX, offsetY);
        gCtx.closePath();
        gCtx.strokeStyle = gColor;
        gCtx.stroke();
        // gCtx.clearRect(lastX,lastY)


        // gCtx.lineTo(offsetX, offsetY);
        // gCtx.closePath();
        // gCtx.strokeStyle = gColor;
        // gCtx.stroke();
}
        // setCircleDrag(false)
    document.body.style.cursor = 'grab'
}

function getEvPos(ev) {
    var pos = {
            x: ev.offsetX,
            y: ev.offsetY
        }
        // if (gTouchEvs.includes(ev.type)) {
        //     ev.preventDefault()
        //     ev = ev.changedTouches[0]
        //     pos = {
        //         x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
        //         y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        //     }
        // }
    return pos
}


function drawImg() {
    var elImg = document.querySelector('img');
    console.log(elImg);
    // Naive approach:
    // there is a risk that image is not loaded yet and nothing will be drawn on canvas
    gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height);
}

function drawImg2() {
    var img = new Image();
    img.src = 'img/1.jpg';

    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
    };
}

function downloadCanvas(elLink) {
    const data = gCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'puki';
}

function drawImgFromlocal() {
    var img = new Image()
    img.src = 'img/1.jpg';
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height) //img,x,y,xend,yend
    }
}

function drawImgFromRemote() {
    var img = new Image()
    img.src = 'https://steamcdn-a.akamaihd.net/steam/apps/431960/ss_39ed0a9730b67a930acb8ceed221cc968bee7731.1920x1080.jpg?t=1571786836';
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height) //img,x,y,xend,yend
        console.log(img);
    }
}


function uploadImg() {
    const imgDataUrl = gCanvas.toDataURL("image/jpeg");

    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        console.log(encodedUploadedImgUrl);
        document.querySelector('.user-msg').innerText = `Your photo is available here: ${uploadedImgUrl}`

        document.querySelector('.share-container').innerHTML = `
        <a class="btn" href="https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
           Share   
        </a>`
    }

    doUploadImg(imgDataUrl, onSuccess);
}

function doUploadImg(imgDataUrl, onSuccess) {

    const formData = new FormData();
    formData.append('img', imgDataUrl)

    fetch('http://ca-upload.com/here/upload.php', {
            method: 'POST',
            body: formData
        })
        .then(res => res.text())
        .then((url) => {
            console.log('Got back live url:', url);
            onSuccess(url)
        })
        .catch((err) => {
            console.error(err)
        })
}

function downloadImg(elLink) {
    var imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}

function onImgInput(ev) {
    loadImageFromInput(ev, renderImg)
}


function loadImageFromInput(ev, onImageReady) {
    document.querySelector('.share-container').innerHTML = ''
    var reader = new FileReader()

    reader.onload = function(event) {
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
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
}