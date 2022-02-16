var gCircle

function createCircle(pos) {
    gCircle = {
        pos,
        size: 60,
        color: 'blue',
        isDrag: false
    }
}

function getCircle() {
    return gCircle
}

function isCircleClicked(clickedPos) {
    const { pos } = gCircle
    const distance = Math.sqrt((pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2)
    return distance <= gCircle.size
}


function setCircleDrag(isDrag) {
    gCircle.isDrag = isDrag
}
function moveCircle(dx, dy) {
    gCircle.pos.x += dx
    gCircle.pos.y += dy

}

