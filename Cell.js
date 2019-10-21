class Cell {
 
  constructor(x,y,id) {
    this.d = 50;
    this.x = x;
    this.y = y;
    this.id = id;
  }
  
  move(x,y) {
    this.x = x;
    this.y = y;
  }
  
  draw() {
    circle(this.x, this.y, this.d);
    text(this.id, this.x, this.y);
  }
  
}
