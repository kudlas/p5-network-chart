class Cell {
 
  constructor(x,y,id) {
    this.d = 50;
    this.x = x;
    this.y = y;
    this.id = id;

    this.vec = createVector(x,y);

    this.isActive = false;

    this.offset = createVector(0,0);
  }

  setMoveOffset(fromX, fromY) {
    const diffX = (fromX - this.x) * (-1);
    const diffY = (fromY - this.y) * (-1);

    this.offset = createVector(diffX, diffY);
  }
  
  move(x,y) {
    this.x = x + this.offset.x;
    this.y = y + this.offset.y;
    this.vec.x = x + this.offset.x;
    this.vec.y = y + this.offset.y;
  }

  isPointWithin(px,py) {
    const r = this.d / 2;
    const dista = dist(this.x, this.y, px,py);

    return (dista < r);
  }

  setActive(active) {
    this.isActive=active;
  }
  
  draw() {
    stroke(0);
    fill( this.isActive ? 'green' : 255 );
    circle(this.x, this.y, this.d);
    text(this.id, this.x, this.y);
    noStroke();
    fill(0);
    text(floor(this.x) +' '+ floor(this.y), this.x, this.y-30 );
  }
  
}
