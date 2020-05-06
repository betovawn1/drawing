document.addEventListener('DOMContentLoaded', () => {
    const screen = document.getElementById('screen')
    const context = screen.getContext('2d')

    const brush = {
        active: false,
        movement: false,
        position: {
            x: 0,
            y: 0
        },
        previousPosition: null
    }

    screen.width = window.innerWidth - 14
    screen.height = window.innerHeight - 14

    // MODEL
    // const line = {
    //     position: {
    //         x: 350,
    //         y: 250
    //     },
    //     previousPosition: {
    //         x: 10,
    //         y: 10
    //     }
    // }

    const lineDrawing = (line) => {
        console.log(line)
        context.beginPath()
        context.moveTo(line.previousPosition.x, line.previousPosition.y)
        context.lineTo(line.position.x, line.position.y)
        context.stroke()
    }

    screen.onmousedown = ev => {
        brush.active = true
    }
    screen.onmouseup = ev => {
        brush.active = false
    }
    screen.onmousemove = ev => {
        brush.position.x = ev.clientX
        brush.position.y = ev.clientY
        brush.movement = true
    }

    const cicle = () => {
        if (brush.active && brush.movement && brush.previousPosition) {
            lineDrawing(
                {
                    position: brush.position,
                    previousPosition: brush.previousPosition
                }
            )
            brush.movement = false
        }
        brush.previousPosition = {
            x: brush.position.x,
            y: brush.position.y
        }

        setTimeout(cicle, 1)
    }

    cicle()
})