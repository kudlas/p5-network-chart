class Chart {

    constructor() {
        this.cells = [];
        this.activeCells = null;
        this.edges = [];

        this.sRect = new SRectangle();

        this.isDraggin = false;
        this.drawingRect = false;
    }

    setActiveCells(cells) {
        this.cells.map( (cell) => cell.setActive(false) );
        cells.map( cell => cell.setActive(true));

        this.activeCells = cells;
    }

    addCell(x, y, id) {

        if (!this.cells.hasOwnProperty(id)) {
            this.cells[id] = new Cell(x, y, id);
        }
        else {
            console.error("Cell with id: " + id + " already exists.");
        }

    }

    addEdge(id1, id2, text) {
        let edge = new Edge(this.cells[id1], this.cells[id2], text);
        this.edges.push(edge);
    }

    mouseMove(e) {
        this.edges.some((edge) => {
            edge.hover = edge.isPointOnEdge(mouseX, mouseY);
        });
    }

    clicked() {

        this.sRect.setStart(mouseX,mouseY);

        // is cell clicked
        this.cells.some((cell) => {
            let r = cell.d / 2;

            // is cell clicked
            let dista = dist(cell.x, cell.y, mouseX, mouseY);

            if (dista < r) {
                this.setActiveCells([cell])

                console.log(this.activeCells);
                return cell;
            } else {
                this.activeCells = null;
            }

        });

        // is edge clicked
        this.edges.some((edge) => {
            if (edge.isPointOnEdge(mouseX, mouseY)) {
                console.log(edge, "clicked");
            }
        });

    }

    released() {
        this.isDraggin = false;
        if(!this.drawingRect) { this.drawingRect = false; return;}
        this.drawingRect = false;

        // is cell in selection bounds
        const bounds = this.sRect.getCoords();
         this.activeCells = this.cells.filter( ( cell ) => {

            const {x, y} = cell;
            const {start, end} = bounds;
            const sortF = (a,b) => a-b;

            // sort them to enable backdragging
            const xCoords = [start.x, mouseX].sort(sortF);
            const yCoords = [start.y, mouseY].sort(sortF);

            const sameRow = x > xCoords[0] && x < xCoords[1];
            const sameCol = y > yCoords[0] && y < yCoords[1];

            console.log(cell.id, sameRow, x, xCoords);
            console.log(cell.id, sameCol, y, yCoords);

            return sameRow && sameCol;

        }, this);

        console.log("now I will check what is selected", this.activeCells);
    }

    drag() {

        if (this.activeCells !== null)
            this.activeCells.map( (obj) => obj.move(mouseX, mouseY), this );
        else {
            // at first deselect them all
            this.activeCells = null;
            this.drawingRect = true;
            this.isDraggin = true;

            // selection rectangle
            this.sRect.setEnd(mouseX,mouseY)
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
            this.sRect.draw();
        }

    }

}
