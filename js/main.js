'use strict'






function init(){
    console.log('good luck');
    console.log(gMemes[0], 'gMeme');
    console.log(gMemes, 'gMemes');
    console.log(gImgs, 'gImgs');
    renderMeme(gMemes[0])
    renderGallery()    
    
    
    // resizeCanvas() // responsive




    //TODO: responsive
    // window.addEventListener('resize', () => {
    //     console.log('resized')
    //     resizeCanvas()
    //         // Debouncing?..
    //         //   drawText('Nothing like a good stretch ' + Date.now(), 0, 225)
    // })

}