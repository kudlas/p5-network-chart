class SRectangle {
 
  constructor() {
    this.rectangleStart = createVector();
    this.rectangleEnd = createVector();
  }
  
  setStart(x,y) {
    this.rectangleStart.x = x;
    this.rectangleStart.y = y;
  }

  setEnd(x,y) {
    this.rectangleEnd.x = x - this.rectangleStart.x;
    this.rectangleEnd.y = y - this.rectangleStart.y;
  }

  getCoords() {
    return {
      start: this.rectangleStart,
      end: this.rectangleEnd
    }
  }
  
  draw() {
    noStroke();
    fill(0);
    text(this.rectangleStart.x + ' ' + this.rectangleStart.y, this.rectangleStart.x, this.rectangleStart.y);

    text(mouseX + ' ' + mouseY, mouseX, mouseY);
    fill(0, 200, 10, 50);
    rect(this.rectangleStart.x, this.rectangleStart.y, this.rectangleEnd.x, this.rectangleEnd.y);
  }
  
}
