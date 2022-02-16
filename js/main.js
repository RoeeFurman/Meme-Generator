'use strict'






function init(){
    console.log('good luck');
    console.log(gMeme, 'gMeme');
    console.log(gImgs, 'gImgs');
    renderMeme(gMeme)
    renderGallery()    
    
    
    // resizeCanvas() // responsive




    //TODO: responsive
    window.addEventListener('resize', () => {
        console.log('resized')
        resizeCanvas()
            // Debouncing?..
            //   drawText('Nothing like a good stretch ' + Date.now(), 0, 225)
    })

}