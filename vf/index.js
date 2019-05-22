const TWO_PI = Math.PI * 2;
let TILE_SIZE;
let center = new Vector(0, 0);
let start = 0;
let config = {};
let currentDrawFunction = () => { };
let ctx;

const beginPath = () => ctx.beginPath();
const stroke = () => ctx.stroke();
const clear = () => ctx.fillRect(0, 0, config.width, config.height);

function circle(position, r) {
  ctx.moveTo(position.x, position.y);
  ctx.arc(position.x, position.y, r, 0, TWO_PI);
}

function line(pos1, pos2) {
  ctx.moveTo(pos1.x, pos1.y);
  ctx.lineTo(pos2.x, pos2.y);
}

function startAnimation({
  particleAmount = 10000,
  drawParticles = true,
  tileSize = 10,
  canvas,
  func,
  width = 500,
  height = 500,
  drawHeads = true
}) {
  canvas.setAttribute("width", width);
  canvas.setAttribute("height", height);
  ctx = canvas.getContext("2d");
  ctx.fillStyle = "white";

  config = {
    drawParticles,
    tileSize,
    width,
    height,
    particles: [],
    func
  };

  clear();

  center = new Vector(width / 2, height / 2);
  start = Date.now();

  if (drawParticles) {
    for (let i = 0; i < particleAmount; i++) {
      config.particles[i] = new Particle(0, 0, 1);
      config.particles[i].random();
    }

    ctx.strokeStyle = "rgba(0, 0, 0, 0.1)";
    currentDrawFunction = function () {
      drawPaths();
    }
  } else {
    ctx.strokeStyle = "black";
    currentDrawFunction = function () {
      clear();
      drawField(drawHeads);
    }
  }
}

function draw() {
  requestAnimationFrame(draw);
  currentDrawFunction();
}

draw();

function drawPaths() {
  beginPath();

  config.particles.map((particle) => {
    const returnedValue = config.func(particle.pos);
    const limited = returnedValue.adjust(1);

    particle.applyForce(limited);
    particle.update();
    particle.draw();
  });

  stroke();
}

function drawField(drawHeads) {
  beginPath();

  function forEachVec(fn) {
    for (let y = 0; y < config.height; y += config.tileSize) {
      for (let x = 0; x < config.width; x += config.tileSize) {
        const position = new Vector(x, y);
        const returnedValue = config.func(position);
        const limited = returnedValue.adjust(config.tileSize);
        const endpoint = position.add(limited);

        fn(position, endpoint);
      }
    }
  }

  if (drawHeads) {
    forEachVec((position, endpoint) => {
      line(position, endpoint);
      circle(endpoint, 3);
    });
  } else {
    forEachVec((position, endpoint) => {
      line(position, endpoint);
    });
  }

  stroke();
}