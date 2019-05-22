class Particle {
  constructor(x, y, mass) {
    this.mass = mass;
    this.pos = new Vector(x, y);
    this.lastPos = new Vector(x, y);
    this.vel = new Vector(0, 0);
    this.acc = new Vector(0, 0);
  }

  applyForce(force) {
    const adjustedForce = force.div(this.mass);
    this.acc = this.acc.add(adjustedForce);
  }

  random() {
    this.pos.x = Math.random() * width;
    this.pos.y = Math.random() * height;
  }

  update() {
    this.vel = this.vel.add(this.acc);
    this.lastPos = this.pos;
    this.pos = this.pos.add(this.vel);
    this.acc = this.acc.mult(0);
  }

  draw() {
    line(this.lastPos, this.pos);
  }

  random() {
    this.pos.x = Math.random() * config.width;
    this.pos.y = Math.random() * config.height;
  }
}