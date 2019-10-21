class Edge {

    constructor(from, to) {

        this.cell1 = from;
        this.cell2 = to;

        this.defaultStroke = 2;
        this.fatStroke = 4;
        this.hover = false;

        this.drawToPoint = null;
    }

    isPointOnEdge(px, py) {
        if(this.drawToPoint===null) return;

        let pointC = createVector(px, py);
        let ABd = dist(this.cell1.x, this.cell1.y, this.drawToPoint.x, this.drawToPoint.y);
        let ACd = dist(this.cell1.x, this.cell1.y, pointC.x, pointC.y);
        let BCd = dist(this.drawToPoint.x, this.drawToPoint.y, pointC.x, pointC.y);

        let actual = floor(ACd) + floor(BCd);
        let comparison = floor(ABd);

        return ( abs(actual - comparison) <= 1 );
    }

    draw() {

        let c1v = this.cell1.vec;
        let c2v = this.cell2.vec;

        let inte = this.lineCircleIntersection(c1v, c2v, c2v, this.cell2.d /2 );

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

        this.drawToPoint = subtractVector;

        this.drawArrow(c1v, endPoint, 'red');

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
        strokeWeight( (this.hover) ? this.fatStroke : this.defaultStroke );
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