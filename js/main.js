'use strict'







function init(){
    console.log('good luck');
    console.log(gMeme);
    console.log(gImgs);
    resizeCanvas()


    

    window.addEventListener('resize', () => {
        console.log('resized')
        resizeCanvas()
            // Debouncing?..
            //   drawText('Nothing like a good stretch ' + Date.now(), 0, 225)
    })

}