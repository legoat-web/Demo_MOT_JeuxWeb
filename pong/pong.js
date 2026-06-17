const canvas = document.getElementById("game")
const ctx = canvas.getContext("2d")
document.addEventListener("keydown", (a) => {
    if (a.key === "a") {
        if (paddle1.dir === 0) {
            paddle1.dir = 1
        }
        else {
            paddle1.dir = 0
        }
    }
    if (a.key === "l") {

        if (paddle2.dir === 0) {
            paddle2.dir = 1
        }
        else {
            paddle2.dir = 0
        }
    }

});
let ball = {
    x: 300,
    y: 200,
    vx: 3,
    vy: 2,
    r: 10

}
let score1 = 0
let score2 = 0

let paddle1 = {
    x: 70,
    y: 150,
    w: 15,
    h: 70,
    sp: 3,
    dir: 0
}

let paddle2 = {
    x: 515,
    y: 150,
    w: 15,
    h: 70,
    sp: 3,
    dir: 0
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ball.x += ball.vx
    ball.y += ball.vy
    if (paddle1.y <= 0) {
        paddle1.dir = 0
    }
    if (paddle1.y + paddle1.h >= canvas.height) {
        paddle1.dir = 1
    }
    if (paddle2.y <= 0) {
        paddle2.dir = 0
    }
    if (paddle2.y + paddle2.h >= canvas.height) {
        paddle2.dir = 1
    }

    if (ball.x - ball.r < paddle1.x + paddle1.w && ball.x + ball.r > paddle1.x && ball.y + ball.r > paddle1.y && ball.y - ball.r < paddle1.y + paddle1.h) {
        ball.vx = ball.vx * -1.05
        ball.vy = ball.vy * 1.05

        if (Math.abs(ball.vx) >= 6 && Math.abs(ball.vy) >= 4) {
            paddle1.sp = 4
            paddle2.sp = 4
        }
    }
    if (ball.x - ball.r < paddle2.x + paddle2.w && ball.x + ball.r > paddle2.x && ball.y + ball.r > paddle2.y && ball.y - ball.r < paddle2.y + paddle2.h) {
        ball.vx = ball.vx * -1.05
        ball.vy = ball.vy * 1.05
        if (Math.abs(ball.vx) >= 6 && Math.abs(ball.vy) >= 4) {
            paddle1.sp = 4
            paddle2.sp = 4
        }
    }

    if (paddle1.dir === 1) {
        paddle1.y -= paddle1.sp
    }

    if (paddle1.dir === 0) {
        paddle1.y += paddle1.sp
    }
    if (paddle2.dir === 1) {
        paddle2.y -= paddle2.sp
    }
    if (paddle2.dir === 0) {
        paddle2.y += paddle2.sp
    }

    if (ball.y + ball.r > canvas.height || ball.y - ball.r < 0) {
        ball.vy *= -1
    }
    if (ball.x + ball.r > canvas.width || ball.x - ball.r < 0) {
        if (ball.x + ball.r > canvas.width) {
            score1++
            if (score1 == 10) {
                alert("victoire du joueur 1 !")
                score1 = 0
                score2 = 0
            }
            document.getElementById("score1").innerText = score1
            document.getElementById("score2").innerText = score2
        }
        if (ball.x - ball.r < 0) {
            score2++
            if (score2 == 10) {
                alert("victoire du joueur 2 !")
                score1 = 0
                score2 = 0
            }
            document.getElementById("score2").innerText = score2
            document.getElementById("score1").innerText = score1
        }
        ball.x = 300
        ball.y = 200
        ball.vx = -2
        ball.vy = 2
        paddle1.sp = 3
        paddle2.sp = 3
    }

    ctx.beginPath()
    ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2)
    ctx.strokeStyle = "black"
    ctx.lineWidth = 3
    ctx.stroke()


    ctx.fillStyle = "red"
    ctx.fillRect(paddle1.x, paddle1.y, paddle1.w, paddle1.h)
    ctx.fillStyle = "lightgreen"
    ctx.fillRect(paddle1.x, paddle1.y, paddle1.w, 7)
    ctx.fillRect(paddle1.x, paddle1.y + paddle1.h - 2, paddle1.w, 7)
    ctx.fillStyle = "blue"
    ctx.fillRect(paddle2.x, paddle2.y, paddle2.w, paddle2.h)
    ctx.fillStyle = "lightgreen"
    ctx.fillRect(paddle2.x, paddle2.y, paddle2.w, 7)
    ctx.fillRect(paddle2.x, paddle2.y + paddle2.h - 2, paddle2.w, 7)

    requestAnimationFrame(update)
}

update()