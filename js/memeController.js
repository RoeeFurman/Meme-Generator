'use strict'

var gCanvas;
var gCtx;

gCanvas = document.getElementById('my-canvas');
gCtx = gCanvas.getContext('2d');


function renderMeme(){

}



function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container');
    // Note: changing the canvas dimension this way clears the canvas
    gCanvas.width = elContainer.offsetWidth - 20
        // Unless needed, better keep height fixed.
        //   gCanvas.height = elContainer.offsetHeight
}