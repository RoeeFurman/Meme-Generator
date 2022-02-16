var gCanvas;
var gCtx;
var gCurrShape = 'triangle';

function init() {
  gCanvas = document.getElementById('my-canvas');
  gCtx = gCanvas.getContext('2d');

  // drawLine(10, 10, 130, 230)
  // drawTriangle(50, 250)
  // drawRect(250, 30)
  // clearCanvas()
  // drawArc(330, 310);
  // drawText('HOLA!', 10, 50)
  // saveAndRestoreExample()
  // drawImg()
  // drawImg2()
  resizeCanvas()

  //   window.addEventListener('resize', resizeCanvas)
  window.addEventListener('resize', () => {
    console.log('resized')
    resizeCanvas()
    // Debouncing?..
    drawText('Nothing like a good stretch ' + Date.now(), 0, 225)
  })

  // click on canvas
}

function drawLine(x, y, xEnd = 250, yEnd = 250) {
  gCtx.beginPath();
  gCtx.lineWidth = 2
  gCtx.moveTo(x, y);
  gCtx.lineTo(xEnd, yEnd);
  gCtx.closePath();
  gCtx.strokeStyle = 'red';
  gCtx.stroke();
}

function drawTriangle(x, y) {
  gCtx.beginPath();
  gCtx.lineWidth = 2;
  gCtx.moveTo(x, y);
  gCtx.lineTo(130, 330);
  gCtx.lineTo(50, 370);
  // gCtx.closePath();
  gCtx.lineTo(x, y);
  gCtx.fillStyle = 'purple';
  gCtx.fill();
  gCtx.strokeStyle = 'blue';
  gCtx.stroke();
  gCtx.closePath();
}

function drawRect(x, y) {
  gCtx.beginPath();
  gCtx.rect(x, y, 150, 150);
  gCtx.fillStyle = 'orange';
  gCtx.fillRect(x, y, 150, 150);
  gCtx.strokeStyle = 'black';
  gCtx.stroke();
}

function drawArc(x, y) {
  gCtx.beginPath();
  gCtx.lineWidth = 6;
  gCtx.arc(x, y, 100, 0, 2 * Math.PI);
  gCtx.strokeStyle = 'white';
  gCtx.stroke();
  gCtx.fillStyle = 'blue';
  gCtx.fill();
}

function drawText(text, x, y) {
  // gCtx.font = '48px serif';
  // gCtx.fillText(text, x, y);

  gCtx.lineWidth = 2;
  gCtx.strokeStyle = 'brown';
  gCtx.fillStyle = 'black';
  gCtx.font = '20px Arial';
  gCtx.fillText(text, x, y);
  gCtx.strokeText(text, x, y);
}

function saveAndRestoreExample() {
  gCtx.font = '30px Arial';
  gCtx.strokeStyle = 'green';
  gCtx.strokeText('Saving the context', 10, 50);
  gCtx.save();
  gCtx.strokeStyle = 'black';
  gCtx.strokeText('Switching to something else', 10, 100);
  gCtx.restore();
  gCtx.strokeText('Back to previous context', 10, 150);
}

function clearCanvas() {
  // gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
  // You may clear part of the canvas
  gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height / 4)
}

function drawImg() {
  var elImg = document.querySelector('img');
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

function resizeCanvas() {
  var elContainer = document.querySelector('.canvas-container');
  // Note: changing the canvas dimension this way clears the canvas
  gCanvas.width = elContainer.offsetWidth - 20
  // Unless needed, better keep height fixed.
  //   gCanvas.height = elContainer.offsetHeight
}

function setShape(shape) {
  gCurrShape = shape;
}

function draw(ev) {
  const offsetX = ev.offsetX;
  const offsetY = ev.offsetY;
  // console.log(offsetX,offsetY)
  // const { offsetX, offsetY } = ev
  switch (gCurrShape) {
    case 'triangle':
      drawTriangle(offsetX, offsetY);
      break;
    case 'rect':
      drawRect(offsetX, offsetY);
      break;
    case 'text':
      drawText('שלום', offsetX, offsetY);
      break;
    case 'line':
      drawLine(offsetX, offsetY);
      break;
  }
}
