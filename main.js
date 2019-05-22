function pageChange(page) {
  switch (page) {
    case 2:
      startAnimation({
        canvas: document.querySelector("#cnv-1"),
        func: z1,
        drawParticles: false,
        tileSize: 20,
        width: window.innerWidth * 0.84,
        height: 500
      });
      break;

    case 3:
      startAnimation({
        canvas: document.querySelector("#cnv-2"),
        func: z2,
        drawParticles: false,
        tileSize: 20,
        width: window.innerWidth * 0.84,
        height: 500,
        drawHeads: false
      });
      break;

    case 6:
      startAnimation({
        canvas: document.querySelector("#cnv-3"),
        func: exampleDiv,
        drawParticles: false,
        tileSize: 20,
        width: window.innerWidth * 0.84,
        height: window.innerHeight * 0.84,
      });
      break;

    case 7:
      startAnimation({
        canvas: document.querySelector("#cnv-4"),
        func: exampleCurl,
        tileSize: 20,
        drawParticles: false,
        width: window.innerWidth * 0.84,
        height: window.innerHeight * 0.84
      });
      break;

    case 8:
      startAnimation({
        canvas: document.querySelector("#cnv-5"),
        func: z3,
        particleAmount: 4000,
        drawParticles: true,
        width: window.innerWidth * 0.84,
        height: window.innerHeight * 0.84
      });

      break;

    case 9:
      startAnimation({
        canvas: document.querySelector("#cnv-6"),
        func: z1,
        particleAmount: 4000,
        drawParticles: true,
        width: window.innerWidth * 0.84,
        height: window.innerHeight * 0.84
      });

      break;
  }
}

function z1(position) {
  const deltaPos = position.sub(center);
  const delta = deltaPos.mag() / 20;

  return new Vector(
    Math.cos(delta),
    Math.sin(delta),
  );
}

function z2(position) {
  const time = (Date.now() - start) / 1000;
  const deltaPos = position.sub(center);
  const delta = deltaPos.mag() / 20;

  return new Vector(
    Math.cos(delta + time),
    Math.sin(delta + time),
  );
}

function z3(position) {
  const x = position.x / config.width;
  const y = position.y / config.height;
  const delta = position.sub(center).mag();

  return new Vector(
    Math.sin(delta / 2 * x * y),
    Math.cos(delta / 5 * x * y)
  );

}


function exampleDiv(position) {
  const delta = position.sub(center);

  return new Vector(
    delta.x,
    delta.y
  );
}

function exampleCurl(position) {
  const temp = position.sub(center);
  const delta = new Vector(-temp.y, temp.x);

  return new Vector(
    delta.x,
    delta.y
  );
}