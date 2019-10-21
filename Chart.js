class Chart {

    constructor() {
        this.cells = [];
        this.activeCell = null;
        this.edges = [];

        this.rectangleStart = createVector();
        this.rectangleEnd = createVector();

        this.isDraggin = false;
    }

    addCell(x, y, id) {

        if (!this.cells.hasOwnProperty(id)) {
            this.cells[id] = new Cell(x, y, id);
        }
        else {
            console.error("Cell with id: " + id + " already exists.");
        }

    }

    addEdge(id1, id2) {
        let edge = new Edge(this.cells[id1], this.cells[id2]);
        this.edges.push(edge);
    }

    mouseMove(e) {
        this.edges.some((edge) => {
            edge.hover = edge.isPointOnEdge(mouseX, mouseY);
        });
    }

    clicked() {

        this.rectangleStart.x = mouseX;
        this.rectangleStart.y = mouseY;

        // is cell clicked
        this.cells.some((cell) => {
            let r = cell.d / 2;

            // is cell clicked
            let dista = dist(cell.x, cell.y, mouseX, mouseY);

            if (dista < r) {
                this.activeCell = cell;
                return cell;
            } else {
                this.activeCell = null;
            }

        });

        // is edge clicked
        this.edges.some((edge) => {
            if (edge.isPointOnEdge(mouseX, mouseY)) {
                console.log(edge, "clicked");
            }
        });

    }

    drag() {

        if (this.activeCell !== null)
            this.activeCell.move(mouseX, mouseY);
        else {
            this.isDraggin = true;
            this.rectangleEnd.x = mouseX - this.rectangleStart.x;
            this.rectangleEnd.y = mouseY - this.rectangleStart.y;
        }

    }


    draw() {

        stroke(0);
        fill(255);
        // draw edges
        this.edges.map(e => {
            e.draw();
        });

        // draw cells
        this.cells.map(c => c.draw());

        // draw selection rectangle
        if(this.isDraggin) {
            noStroke();
            fill(0, 200, 10, 50);
            rect(this.rectangleStart.x, this.rectangleStart.y, this.rectangleEnd.x, this.rectangleEnd.y);
        }

    }

}
