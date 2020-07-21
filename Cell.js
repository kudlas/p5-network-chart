class Cell {
 
  constructor(x,y,id) {
    this.d = 50;
    this.x = x;
    this.y = y;
    this.id = id;

    this.vec = createVector(x,y);

    this.isActive = false;
  }
  
  move(x,y) {
    this.x = x;
    this.y = y;
    this.vec.x = x;
    this.vec.y = y;
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
