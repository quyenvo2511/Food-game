const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 380;
canvas.height = 500;
canvas.style.border = "1px solid black";
document.body.appendChild(canvas);
// setting img
let bgReady, humanReady, foodOneReady, foodTwoReady, foodThreeReady;
let bgImage, humanImage, foodOneImage, foodTwoImage, foodThreeImage;

// Loading img

function loadImages() {
  bgImage = new Image();
  bgImage.onload = function () {
    bgReady = true;
  };
  bgImage.src = "img/background.jpg";
  humanImage = new Image();
  humanImage.onload = function () {
    humanReady = true;
  };
  humanImage.src = "img/human.png";

  foodOneImage = new Image();
  foodOneImage.onload = function () {
    foodOneReady = true;
  };
  foodOneImage.src = "img/cake.png";

  foodTwoImage = new Image();
  foodTwoImage.onload = function () {
    foodTwoReady = true;
  };
  foodTwoImage.src = "img/cake1.png";

  foodThreeImage = new Image();
  foodThreeImage.onload = function () {
    foodThreeReady = true;
  };
  foodThreeImage.src = "img/candy.png";
}

// Setting characters

let humanX = canvas.width / 2;
let humanY = canvas.height / 2;

let foodOneX = Math.floor(Math.random() * (canvas.width - 10)) + 10;
let foodOneY = (canvas.height - 31) / 4;

let foodTwoX = Math.floor(Math.random() * (canvas.width - 10)) + 10;
let foodTwoY = (canvas.height - 28) / 3;

let foodThreeX = Math.floor(Math.random() * (canvas.width - 10)) + 10;
let foodThreeY = (canvas.height - 46) / 1.5;

let x = canvas.width / 2;
let y = canvas.height / 2;
let dx = 2;
let dy = 2;
let score = 0;
// set keyboard

let keyPressed = {};

function setKeyboard() {
  document.addEventListener(
    "keydown",
    function (e) {
      console.log("keydown");
      keyPressed[e.key] = true;
    },
    false
  );
  document.addEventListener(
    "keyup",
    function (e) {
      console.log("keyup");
      keyPressed[e.key] = false;
    },
    false
  );
}

// Moving

function update() {
  // elapsedTime = Math.floor((Date.now() - startTime) / 1000);
  if (keyPressed["ArrowUp"]) {
    if (humanY - 10 >= 0) {
      humanY -= 5;
    }
  }
  if (keyPressed["ArrowDown"]) {
    if (humanY + 66 + 2 <= canvas.height) {
      humanY += 5;
    }
  }
  if (keyPressed["ArrowLeft"]) {
    humanX -= 5;
    if (humanX <= 5) {
      humanX = 5;
    }
  }
  if (keyPressed["ArrowRight"]) {
    humanX += 5;
    if (humanX + 45 + 2 >= canvas.width) {
      humanX = canvas.width - 45;
    }
  }
  foodOneY += dy;
  if (
    foodOneY >= canvas.height - 66 ||
    (humanX <= foodOneX + 32 &&
      foodOneX <= humanX + 45 &&
      humanY <= foodOneY + 66 &&
      foodOneY <= humanY + 66)
  ) {
    foodOneY = 0;
    foodOneX = Math.floor(Math.random() * (canvas.width - 25));
  }

  foodTwoY += dy;
  if (foodTwoY >= canvas.height) {
    foodTwoY = 0;
    foodTwoY = Math.floor(Math.random() * (canvas.width - 25)) + 10;
  }
  foodThreeY += dy;
  if (foodThreeY >= canvas.height) {
    foodThreeY = 0;
    foodThreeY = Math.floor(Math.random() * (canvas.width - 10)) + 10;
  }
  if (score === 6) {
    score = 0;
  }
}
function biggerHuaman() {
  const humanX = { x: humanX[0].x + dx, y: humanY[0].y + dy };
  const didEatFood = humanX[0].x === foodOneX && humanX[0].y === foodOneY;
  if (didEatFood) {
  }
}
// Render
function render() {
  if (bgReady) {
    ctx.drawImage(bgImage, 0, 0);
  }
  if (humanReady) {
    ctx.drawImage(humanImage, humanX, humanY);
  }
  if (foodOneReady) {
    ctx.drawImage(foodOneImage, foodOneX, foodOneY);
  }
  if (foodTwoReady) {
    ctx.drawImage(foodTwoImage, foodTwoX, foodTwoY);
  }
  if (foodThreeReady) {
    ctx.drawImage(foodThreeImage, foodThreeX, foodThreeY);
  }
  // ctx.fillText(
  //   Seconds Remaining: ${SECONDS_PER_ROUND - elapsedTime},
  //   20,
  //   100
  // );
  ctx.fillText(`score: ${score}`, 20, 150);
}

function main() {
  update();
  render();
  requestAnimationFrame(main);
}
var w = window;
requestAnimationFrame =
  w.requestAnimationFrame ||
  w.webkitRequestAnimationFrame ||
  w.msRequestAnimationFrame ||
  w.mozRequestAnimationFrame;
// Let's run it
loadImages();
setKeyboard();
main();

setInterval(render, 500);
