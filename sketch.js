let cells = [];
let cnv;
let activeCell = null;
let chart;

function setup() {
  cnv = createCanvas(400, 400);
  chart = new Chart();

  cnv.mouseMoved( (e) => { chart.mouseMove(e) });

  chart.addCell(random(0,width), random(0,height), 1);
  chart.addCell(random(0,width), random(0,height), 2);
  
  chart.addEdge(1,2);

}

function mousePressed() {
  chart.clicked();
}

function mouseDragged() {
  chart.drag();
}

function mouseReleased() {
  chart.isDraggin = false;
}

function draw() {
  background(220);
  chart.draw();
}
