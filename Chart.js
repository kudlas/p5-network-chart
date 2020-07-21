class Chart {

    constructor() {
        this.cells = [];
        this.activeCells = null;
        this.edges = [];

        this.sRect = new SRectangle();

        this.isDraggin = false; // draggin rectangle
        this.drawingRect = false;

        this.multiMode = false; // is more than one cell selected?
    }

    setActiveCells(cells) {
        this.cells.map( (cell) => cell.setActive(false) );

        // make them active, plus set their move offset
        cells?.map( cell => {
            cell.setActive(true);
            cell.setMoveOffset(mouseX, mouseY);
        });

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
        // if there is more than one, screw tha whole clicking thing
        if(this.multiMode) return;


        // start selection rect
        this.sRect.setStart(mouseX,mouseY);

        // is cell clicked / select clicked cell
        this.cells.some((cell) => {
            if (cell.isPointWithin(mouseX, mouseY)) {
                this.setActiveCells([cell]);
                return cell;
            } else {
                this.setActiveCells(null);
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

        // just some rectangle selection stuff
        this.isDraggin = false;
        if(!this.drawingRect) { this.drawingRect = false; return;}
        this.drawingRect = false;

        // is cell in selection bounds
        const bounds = this.sRect.getCoords();
        const chosenCells = this.cells.filter( ( cell ) => {

            const {x, y} = cell;
            const {start, end} = bounds;
            const sortF = (a,b) => a-b;

            // sort them to enable backdragging
            const xCoords = [start.x, mouseX].sort(sortF);
            const yCoords = [start.y, mouseY].sort(sortF);

            const sameRow = x > xCoords[0] && x < xCoords[1];
            const sameCol = y > yCoords[0] && y < yCoords[1];

            return sameRow && sameCol;

        }, this);

        if(chosenCells.length > 1) this.multiMode=true;

        this.setActiveCells(chosenCells);
        console.log("now I will check what is selected", this.activeCells);
    }

    drag() {

        this.isDraggin = true;

        // moving/dragging cells
        if (this.activeCells !== null) {
            this.activeCells.map( (obj) => obj.move(mouseX, mouseY), this );
            return;
        }

        // at first deselect them all
        this.setActiveCells(null);
        this.drawingRect = true;

        // selection rectangle
        this.sRect.setEnd(mouseX,mouseY)

    }


    draw() {
        text(this.multiMode ? "multi" : "nemulti", 10, 20);

        stroke(0);
        fill(255);

        // draw edges
        this.edges.map(e => {
            e.draw();
        });

        // draw cells
        this.cells.map(c => c.draw());

        // draw selection rectangle
        if(this.drawingRect) {
            this.sRect.draw();
        }

    }

}
