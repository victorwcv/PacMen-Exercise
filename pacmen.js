const widthImg = 100;
let game = document.getElementById("game");
let startButton = document.getElementById("start");
const pacMen = [];
let toggle = false;

const pacArray = [
  ["PacMan1.png", "PacMan2.png"],
  ["PacMan3.png", "PacMan4.png"],
];

function randomPosition() {
  let widthViewport = game.clientWidth;
  let heightViewport = game.clientHeight;
  return {
    x: Math.floor(Math.random() * (widthViewport - widthImg)),
    y: Math.floor(Math.random() * (heightViewport - widthImg)),
  };
}

function setRandomVelocity(scale) {
  let x = Math.ceil(Math.random() * scale);
  let y = Math.ceil(Math.random() * scale);
  return {
    x: x,
    y: y,
  };
}

// Factory to make a PacMan at a random position with random velocity
function makePac() {
  // returns an object with random values scaled {x: 33, y: 21}
  let velocity = setRandomVelocity(10); // {x:?, y:?}
  let position = randomPosition();
  // Add image to div id = game
  let newimg = document.createElement("img");
  newimg.style.position = "absolute";
  newimg.src = "PacMan1.png";
  newimg.width = widthImg;
  newimg.style.left = position.x + "px";
  newimg.style.top = position.y + "px";
  // add new Child image to game
  game.appendChild(newimg);
  // return details in an object
  console.log(position, velocity, newimg);

  return {
    position,
    velocity,
    newimg,
  };
}

function update() {
  //loop over pacmen array and move each one and move image in DOM
  pacMen.forEach((item) => {
    checkCollisions(item);
    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;

    item.newimg.style.left = item.position.x + "px";
    item.newimg.style.top = item.position.y + "px";
  });
  setTimeout(update, 16);
}

function checkCollisions(item) {
  if (
    item.position.x + item.velocity.x + item.newimg.width + 5 >=
      game.clientWidth ||
    item.position.x + item.velocity.x - 5 <= 0
  ) {
    item.velocity.x = -item.velocity.x;
  }
  if (
    item.position.y + item.velocity.y + item.newimg.height + 5 >=
      game.clientHeight ||
    item.position.y + item.velocity.y - 5 <= 0
  ) {
    item.velocity.y = -item.velocity.y;
  }
}

// add a new PacMan

function makeOne() {
  pacMen.push(makePac());
  if (pacMen.length === 1) {
    updatePacManImage();
  }
}

function disableButton() {
  startButton.disabled = true;
}

function updatePacManImage() {
  pacMen.forEach((item) => {
    if (item.newimg.src.includes("PacMan1.png")) {
      item.newimg.src = "PacMan2.png";
    } else {
      item.newimg.src = "PacMan1.png";
    }
  });

  setTimeout(updatePacManImage, 300);
}
