class Chart {
 
  constructor() {
    this.cells = [];
    this.activeCell = null;
    this.edges = [];
  }
  
  addCell(x,y, id) {
    
    if(!this.cells.hasOwnProperty(id) ) {
      
      this.cells[id] = new Cell(x,y,id);
      
    } else
    {
      console.error("Cell with id: " + id + " already exists.");
    }
    
  }
  
  addEdge(id1, id2) {
  
    let cell_1 = this.cells[id1];
    let cell_2 = this.cells[id2];
    
    this.edges.push({cell1: cell_1, cell2: cell_2});
  
  }
  
  clicked() {
    
    this.cells.some( (cell) => {
      let r = cell.d / 2;

      // is cell clicked
      let dista = dist(cell.x, cell.y, mouseX, mouseY);

      if(dista < r) {
        this.activeCell = cell;
        return cell;
      } else {
        this.activeCell = null;
      }

    });
    
  }
  
  drag() {
    
    if(this.activeCell !== null)
      this.activeCell.move(mouseX, mouseY);
  }
  
  
  draw() {
    // draw edges
    this.edges.map( e => {
      
      // vectors between cells
      let c1v = createVector(e.cell1.x, e.cell1.y);
      let c2v = createVector(e.cell2.x, e.cell2.y);
      
      let inte = (this.lineCircleIntersection(c1v, c2v, c2v, e.cell2.d /2 ) );
      
      // which intersection is closer
      let int0_dist = dist(inte[0].x, inte[0].y, c1v.x, c1v.y);
      let int1_dist = dist(inte[1].x, inte[1].y, c1v.x, c1v.y);
      
      let cx = inte[1].x;
      let cy = inte[1].y;
      
      if(int0_dist < int1_dist) {
        cx = inte[0].x;
        cy = inte[0].y;
      }
      
      // let startPoint = c1v.sub(c2v);
      let subtractVector = createVector(cx, cy);
      let endPoint = p5.Vector.sub(subtractVector, c1v);
      
      this.drawArrow(c1v, endPoint, 'red');
      
      // circle(cx, cy, 30);
      
      // line(e.cell1.x, e.cell1.y, e.cell2.x, e.cell2.y);
    });
    
    // draw cells
    this.cells.map( c => c.draw() );
    
  }
  
  lineCircleIntersection(p1, p2, cpt, r) {

    let sign = function(x) { return x < 0.0 ? -1 : 1; };

    let x1 = p1.copy().sub(cpt);
    let x2 = p2.copy().sub(cpt);

    let dv = x2.copy().sub(x1)
    let dr = dv.mag();
    let D = x1.x*x2.y - x2.x*x1.y;

    // evaluate if there is an intersection
    let di = r*r*dr*dr - D*D;
    if (di < 0.0)
        return [];

    let t = sqrt(di);

    let ip = [];
    ip.push( new p5.Vector(D*dv.y + sign(dv.y)*dv.x * t, -D*dv.x + abs(dv.y) * t).div(dr*dr).add(cpt) );
    if (di > 0.0) {
        ip.push( new p5.Vector(D*dv.y - sign(dv.y)*dv.x * t, -D*dv.x - abs(dv.y) * t).div(dr*dr).add(cpt) ); 
    }
    return ip;
}
  
  drawArrow(base, vec, myColor) {
    push();
    stroke(myColor);
    strokeWeight(3);
    fill(myColor);
    translate(base.x, base.y);
    line(0, 0, vec.x, vec.y);
    rotate(vec.heading());
    let arrowSize = 7;
    translate(vec.mag() - arrowSize, 0);
    triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
    pop();
  }
  
}
