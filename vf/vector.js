class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(other) {
    return new Vector(
      this.x + other.x,
      this.y + other.y
    );
  }

  mult(factor) {
    return new Vector(
      this.x * factor,
      this.y * factor
    );
  }

  div(factor) {
    return this.mult(1 / factor);
  }

  sub(other) {
    return this.add(other.mult(-1));
  }

  mag() {
    return Math.sqrt(
      Math.pow(this.x, 2) +
      Math.pow(this.y, 2)
    );
  }

  adjust(length) {
    const oldLength = this.mag();
    const unitVector = this.div(oldLength);
    const limitedVector = unitVector.mult(length);
    return limitedVector;
  }

  dist(other) {
    return sub(other).mag();
  }
}