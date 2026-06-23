const canvas = document.getElementById("game")
const ctx = canvas.getContext("2d")

document.addEventListener("keydown", (a) => {
    if (a.key === "a") {
        paddle1.dir = paddle1.dir === 0 ? 1 : 0
    }
    if (a.key === "l") {
        paddle2.dir = paddle2.dir === 0 ? 1 : 0
    }
});

let ball = {
    x: 300,
    y: 200,
    vx: (Math.random() < 0.5 ? -1 : 1) * 3,
    vy: (Math.random() < 0.5 ? -1 : 1) * 2,
    r: 10
}

let ballvxbefore = 3
let ballvybefore = 2
let particles = []

let score1 = 0
let score2 = 0
let lastHit = 3
let gameOver = false
let winner = ""

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

// PARTICULES
function createParticles(x, y, color) {
    for (let i = 0; i < 12; i++) {
        particles.push({
            x,
            y,
            vx: (Math.random() - 0.5) * 6,
            vy: (Math.random() - 0.5) * 6,
            life: 10,
            color
        });
    }
}
// PARTICULES
function createParticlesbut(x, y, color) {
    for (let i = 0; i < 12; i++) {
        particles.push({
            x,
            y,
            vx: (Math.random() - 0.5) * 6,
            vy: (Math.random() - 0.5) * 6,
            life: 50,
            color
        });
    }
}


function update() {

    if (gameOver) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        ctx.fillStyle = "gray"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        ctx.fillStyle = "white"
        ctx.font = "40px Arial"
        ctx.textAlign = "center"
        ctx.fillText(`Victoire du joueur ${winner} !`, canvas.width / 2, 150)

        ctx.fillStyle = "green"
        ctx.fillRect(canvas.width / 2 - 75, 220, 150, 50)

        ctx.fillStyle = "white"
        ctx.font = "25px Arial"
        ctx.fillText("Rejouer", canvas.width / 2, 255)

        return
    }

    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ball.x += ball.vx
    ball.y += ball.vy

    if (paddle1.y <= 0) paddle1.dir = 0
    if (paddle1.y + paddle1.h >= canvas.height) paddle1.dir = 1
    if (paddle2.y <= 0) paddle2.dir = 0
    if (paddle2.y + paddle2.h >= canvas.height) paddle2.dir = 1


    if (
        ball.x - ball.r < paddle1.x + paddle1.w &&
        ball.x + ball.r > paddle1.x &&
        ball.y + ball.r > paddle1.y &&
        ball.y - ball.r < paddle1.y + paddle1.h
    ) {
        ball.vx *= -1.05
        ball.vy *= 1.05
        lastHit = 1

        createParticles(ball.x, ball.y, "red")
    }


    if (
        ball.x - ball.r < paddle2.x + paddle2.w &&
        ball.x + ball.r > paddle2.x &&
        ball.y + ball.r > paddle2.y &&
        ball.y - ball.r < paddle2.y + paddle2.h
    ) {
        ball.vx *= -1.05
        ball.vy *= 1.05
        lastHit = 2

        createParticles(ball.x, ball.y, "blue")
    }

    if (paddle1.dir === 1) paddle1.y -= paddle1.sp
    else paddle1.y += paddle1.sp

    if (paddle2.dir === 1) paddle2.y -= paddle2.sp
    else paddle2.y += paddle2.sp

    if (ball.y + ball.r > canvas.height || ball.y - ball.r < 0) {
        ball.vy *= -1
        createParticles(ball.x, ball.y, "black")
    }

    if (ball.x + ball.r > canvas.width) {
        if (lastHit === 2 || lastHit === 3) {
            ball.vx *= -1
            ball.x = canvas.width - ball.r
            createParticles(ball.x, ball.y, "black")
        } else {
            score1++

            createParticlesbut(ball.x, ball.y, "orange")
            resetBall()
        }
    }

    if (ball.x - ball.r < 0) {
        if (lastHit === 1 || lastHit === 3) {
            ball.vx *= -1
            ball.x = ball.r
            createParticles(ball.x, ball.y, "black")
        } else {
            score2++
            createParticlesbut(ball.x, ball.y, "orange")
            resetBall()
        }
    }
    for (let i = particles.length - 1; i >= 0; i--) {
        let p = particles[i]

        p.x += p.vx
        p.y += p.vy
        p.life--

        ctx.fillStyle = p.color
        ctx.fillRect(p.x, p.y, 3, 3)

        if (p.life <= 0) {
            particles.splice(i, 1)
        }
    }

    ctx.beginPath()
    ctx.fillStyle = "gray"
    ctx.fillRect(canvas.width / 2, 0, 4, canvas.height / 2 - 20)
    ctx.fillRect(canvas.width / 2, canvas.height / 2 + 20, 4, canvas.height / 2)

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

function resetBall() {

    ball.x = 300
    ball.y = 200
    ball.vx = (Math.random() < 0.5 ? -1 : 1) * 3
    ball.vy = (Math.random() < 0.5 ? -1 : 1) * 2

    ballvxbefore = 3
    ballvybefore = 2

    paddle1.sp = 3
    paddle2.sp = 3

    lastHit = 3

    if (score1 >= 10) {
        winner = 1
        gameOver = true
        return
    }

    if (score2 >= 10) {
        winner = 2
        gameOver = true
        return
    }

    document.getElementById("score1").innerText = score1
    document.getElementById("score2").innerText = score2
}

canvas.addEventListener("click", (e) => {
    if (!gameOver) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (
        x >= canvas.width / 2 - 75 &&
        x <= canvas.width / 2 + 75 &&
        y >= 220 &&
        y <= 270
    ) {
        location.reload()
    }
})