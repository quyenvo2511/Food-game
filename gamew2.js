const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 450;
canvas.height = 600;
canvas.style.border = "1px solid black";
document.getElementById("container").appendChild(canvas);
// setting img
let bgReady, humanReady, foodOneReady, foodTwoReady, foodThreeReady;
let bgImage, humanImage, foodOneImage, foodTwoImage, foodThreeImage;
let humanWidth, humanHeight;
let scale = 1;

// The pill
let pillImage;
let isPillVisible = false;
let pillWidth = 30;
let pillHeight = 30;
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
    humanWidth = humanImage.naturalWidth;
    humanHeight = humanImage.naturalHeight;
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

  pillImage = new Image();
  pillImage.onload = function () {
    isPillVisible = false;
  };
  pillImage.src = "img/pill.png";
}

// Setting characters

let humanX = canvas.width / 2;
let humanY = canvas.height - 66;

let foodOneX = Math.floor(Math.random() * (canvas.width - 10)) + 10;
let foodOneY = 0;

let foodTwoX = Math.floor(Math.random() * (canvas.width - 10)) + 10;
let foodTwoY = 0;

let foodThreeX = Math.floor(Math.random() * (canvas.width - 10)) + 10;
let foodThreeY = 0;

let pillX = Math.floor(Math.random() * (canvas.width - 10)) + 10;
let pillY = 0;

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
    if (humanY - humanHeight >= canvas.height - 200) {
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
  // Check if the food1 has fallen into the player
  if (
    foodOneX <= humanX + humanWidth &&
    foodOneX >= humanX - humanWidth / 2 &&
    foodOneY >= humanY - humanHeight / 2
  ) {
    foodOneY = 0;
    foodOneX = Math.floor(Math.random() * (canvas.width - 25));
    score += 1;
    // Increase the size of the human whe he eats the food
    humanWidth *= 1.05;
    humanHeight *= 1.05;
  }
  // Check if the food1 has pass throught the lower bound of the window
  else if (foodOneY >= canvas.height) {
    foodOneY = 0;
    foodOneX = Math.floor(Math.random() * (canvas.width - 25));
  }

  foodTwoY += dy;
  if (
    foodTwoX <= humanX + humanWidth &&
    foodTwoX >= humanX - humanWidth / 2 &&
    foodTwoY >= humanY - humanHeight / 2
  ) {
    foodTwoY = 0;
    foodTwoX = Math.floor(Math.random() * (canvas.width - 25));
    score += 2;
    humanWidth *= 1.1;
    humanHeight *= 1.1;
  }
  foodThreeY += dy;
  if (
    foodThreeX <= humanX + humanWidth &&
    foodThreeX >= humanX - humanWidth / 2 &&
    foodThreeY >= humanY - humanHeight / 2
  ) {
    foodThreeY = 0;
    foodThreeX = Math.floor(Math.random() * (canvas.width - 25));
    score += 3;
    humanWidth *= 1.15;
    humanHeight *= 1.15;
  }

  if (score >= 5) {
    isPillVisible = true;
  }
  pillY += dy;
  if (pillY >= canvas.height) {
    pillY = 0;
    pillX = Math.floor(Math.random() * (canvas.width - 10)) + 10;
    humanWidth /= 1.2;
    humanHeight /= 1.2;
    score = 0;
  }
  // if (score >= 6 || )
}

// Render
function render() {
  if (bgReady) {
    ctx.drawImage(bgImage, 0, 0);
  }
  if (humanReady) {
    ctx.drawImage(humanImage, humanX, humanY, humanWidth, humanHeight);
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
  if (isPillVisible) {
    ctx.drawImage(pillImage, pillX, pillY, pillWidth, pillHeight);
  }
  // ctx.fillText(
  //   Seconds Remaining: ${SECONDS_PER_ROUND - elapsedTime},
  //   20,
  //   100
  // );
  // ctx.fillText(`score: ${score}`, 20, 150);
  document.getElementById("score").innerHTML = `Score: ${score}`;
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
