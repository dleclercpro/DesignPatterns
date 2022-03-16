abstract class Visitor {
    public abstract visitDot: (dot: Dot) => void;
    public abstract visitCircle: (circle: Circle) => void;
    public abstract visitRectangle: (rectangle: Rectangle) => void;
}

abstract class Shape {
    protected id: string;

    public abstract accept: (v: Visitor) => void;

    public constructor(id: string) {
        this.id = id;
    }

    public getId() {
        return this.id;
    }
}



class Dot extends Shape {

    public constructor(id: string) {
        super(id);
    }

    public accept = (v: Visitor) => {
        v.visitDot(this);
    }
}

class Circle extends Shape {
    protected radius: number;

    public constructor(id: string, radius: number) {
        super(id);

        this.radius = radius;
    }

    public accept = (v: Visitor) => {
        v.visitCircle(this);
    }

    public getRadius() {
        return this.radius;
    }
}

class Rectangle extends Shape {
    protected width: number;
    protected height: number;

    public constructor(id: string, width: number, height: number) {
        super(id);

        this.width = width;
        this.height = height;
    }

    public accept = (v: Visitor) => {
        v.visitRectangle(this);
    }

    public getWidth() {
        return this.width;
    }

    public getHeight() {
        return this.height;
    }
}



class XMLExportVisitor extends Visitor {

    public visitDot = (dot: Dot) => {
        console.log(`Exporting dot as XML: <Dot id={${dot.getId()}}>`);
    }

    public visitCircle = (circle: Circle) => {
        console.log(`Exporting circle as XML: <Circle id={${circle.getId()}} radius={${circle.getRadius()}}>`);
    }

    public visitRectangle = (rectangle: Rectangle) => {
        console.log(`Exporting rectangle as XML: <Rectangle id={${rectangle.getId()}} width={${rectangle.getWidth()}} height={${rectangle.getHeight()}}>`);
    }
}



class Application {
    private shapes: Shape[];

    public constructor() {
        this.shapes = [];
    }

    public pushShape(shape: Shape) {
        this.shapes.push(shape);
    }

    public popShape() {
        return this.shapes.pop();
    }

    public exportToXML() {
        const exporter = new XMLExportVisitor();

        this.shapes.forEach((shape: Shape) => {
            shape.accept(exporter);
        });
    }
}



class VisitorTest {

    async execute() {
        console.log('/*************** Visitor Test ***************/');

        const app = new Application();

        app.pushShape(new Circle('CircleID', 5));
        app.pushShape(new Rectangle('Rectangle1ID', 4, 6));
        app.pushShape(new Rectangle('Rectangle2ID', 10, 40));
        app.pushShape(new Dot('DotID'));

        app.exportToXML();

        console.log();
    }
}

export default VisitorTest;