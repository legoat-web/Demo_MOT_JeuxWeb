const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let paddle = {
    x: 245,
    y: 500,
    w: 111,
    h: 15,
    sp: 6,
    dir: 0
};

let ball = {
    x: 300,
    y: 200,
    vx: (Math.random() < 0.5 ? -1 : 1) * 3,
    vy: -3,
    r: 10
};

let bricks = [];
let rows = 4;
let cols = 8;
let brickW = 60;
let brickH = 20;
let padding = 10;
let offsetX = 30;
let offsetY = 40;

for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
        bricks.push({
            x: offsetX + c * (brickW + padding),
            y: offsetY + r * (brickH + padding),
            w: brickW,
            h: brickH,
            alive: true
        });
    }
}


document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") paddle.dir = -1;
    if (e.key === "ArrowRight") paddle.dir = 1;
});

document.addEventListener("keyup", (e) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") paddle.dir = 0;
});


function collisionBrick(b, ball) {
    return (
        ball.x + ball.r > b.x &&
        ball.x - ball.r < b.x + b.w &&
        ball.y + ball.r > b.y &&
        ball.y - ball.r < b.y + b.h
    );
}


function update() {

    paddle.x += paddle.dir * paddle.sp;
    paddle.x = Math.max(0, Math.min(canvas.width - paddle.w, paddle.x));

    ball.x += ball.vx;
    ball.y += ball.vy;

    if (ball.x < ball.r || ball.x > canvas.width - ball.r) ball.vx *= -1;
    if (ball.y < ball.r) ball.vy *= -1;

    if (ball.y > canvas.height) {
        ball.x = 300;
        ball.y = 200;
        ball.vx = (Math.random() < 0.5 ? -1 : 1) * 3;
        ball.vy = -3;
    }

    if (
        ball.x > paddle.x &&
        ball.x < paddle.x + paddle.w &&
        ball.y + ball.r > paddle.y &&
        ball.y - ball.r < paddle.y + paddle.h
    ) {
        ball.vy *= -1;

        let hit = (ball.x - paddle.x) / paddle.w;
        ball.vx = (hit - 0.5) * 6;
    }


    bricks.forEach(b => {
        if (b.alive && collisionBrick(b, ball)) {
            b.alive = false;
            ball.vy *= -1;
        }
    });
}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    ctx.fillStyle = "orange";
    ctx.fillRect(paddle.x, paddle.y, paddle.w, paddle.h);


    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
    ctx.fillStyle = "black";
    ctx.lineWidth = 3
    ctx.stroke();


    bricks.forEach(b => {
        if (b.alive) {
            ctx.fillStyle = "red";
            ctx.fillRect(b.x, b.y, b.w, b.h);
        }
    });
}

function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

loop();