
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const step = 20;
const gridSize = 20;
let direction = "right";
let score = 0;
let bestScore = 0;

const game = document.querySelector(".game-container");
const snakeEl = document.querySelector(".snake");
const foodEl = document.querySelector(".food");
const scoreEl = document.querySelector("#score");

let snake = [
    { x: 0, y: 0 }
];


let food = spawnFood();
renderFood();


document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "ArrowLeft":
            if (direction !== "right") direction = "left";
            break;
        case "ArrowRight":
            if (direction !== "left") direction = "right";
            break;
        case "ArrowUp":
            if (direction !== "down") direction = "up";
            break;
        case "ArrowDown":
            if (direction !== "up") direction = "down";
            break;
    }
});

function spawnFood() {
    return {
        x: randomInt(0, gridSize - 1) * step,
        y: randomInt(0, gridSize - 1) * step
    };
}

function renderFood() {
    foodEl.style.left = food.x + "px";
    foodEl.style.top = food.y + "px";
}




function update() {

    const head = snake[snake.length - 1];
    let newHead = { x: head.x, y: head.y };


    if (direction === "right") newHead.x += step;
    if (direction === "left") newHead.x -= step;
    if (direction === "up") newHead.y -= step;
    if (direction === "down") newHead.y += step;

    
for (let i = 0; i < snake.length; i++) {
    if (snake[i].x === newHead.x && snake[i].y === newHead.y) {
        alert("Game Over! Your score: " + score);

        score = 0;
        scoreEl.textContent = score;

        snake = [{ x: 0, y: 0 }];
        direction = "right";

        renderSnake();
        return;
    }
}


    snake.push(newHead);
    if (newHead.x < 0 || newHead.x >= gridSize * step || newHead.y < 0 || newHead.y >= gridSize * step) {
        alert("Game Over! Your score: " + score);

         score = 0;
        scoreEl.textContent = score;

        snake = [{ x: 0, y: 0 }];
        direction = "right";

        renderSnake();
    return;}

    if (newHead.x === food.x && newHead.y === food.y) {
        score++;
        if (score > bestScore) {
            bestScore = score;
            document.querySelector("#best-score").textContent = bestScore;
            
        }
        scoreEl.textContent = score;

        food = spawnFood();
        renderFood();
    } else {
        snake.shift();
    }

    renderSnake();
}

function renderSnake() {

    game.querySelectorAll(".snake-part").forEach(e => e.remove());

    snake.forEach(part => {
        const div = document.createElement("div");
        div.classList.add("snake-part");
        div.style.width = step + "px";
        div.style.height = step + "px";
        div.style.position = "absolute";
        div.style.left = part.x + "px";
        div.style.top = part.y + "px";
        div.style.background = "green";
        game.appendChild(div);
    });
}

setInterval(update, 150);