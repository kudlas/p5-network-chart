let cells = [];
let cnv;
let activeCell = null;
let chart;

function setup() {
  cnv = createCanvas(400, 400);
  chart = new Chart();
  
  chart.addCell(random(0,width), random(0,height), 1);
  chart.addCell(random(0,width), random(0,height), 2);
  
  chart.addEdge(1,2);
  
  /*
    cells.push( new Cell(random(0,width), random(0,height), 1) );
    cells.push( new Cell(random(0,width), random(0,height), 2) );
    cells.push( new Cell(random(0,width), random(0,height), 3) );
    cells.push( new Cell(random(0,width), random(0,height), 4) );
  */
}

function mousePressed() {
  
  chart.clicked();
  
 /* cells.some( (cell) => {
    let r = cell.d / 2;

    // is cell clicked
    let dista = dist(cell.x, cell.y, mouseX, mouseY);

    if(dista < r) {
      activeCell = cell;
      return cell;
    } else {
      activeCell = null;
    }
    
  });*/
  
}

function mouseDragged() {
  
  chart.drag();
  /*
  if(activeCell !== null)
    activeCell.move(mouseX, mouseY);
  */
}

function draw() {
  background(220);
  chart.draw();
}
