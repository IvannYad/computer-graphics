import { MedianTriangleCoordinates, TriangleCoordinates } from "./TriangleCoordinates";

export default class SerpinskiyTriangleDrawer {

    private _context: CanvasRenderingContext2D | null = null;
    private _coordinates: TriangleCoordinates | null = null;
    private _maxDepthLevel: number | null = null;

    public SetParameters (context: CanvasRenderingContext2D, coordinates: TriangleCoordinates, maxDepthLevel: number) {
        this._context = context;
        this._coordinates = coordinates;
        this._maxDepthLevel = maxDepthLevel;
    }

    public async DrawAsync(): Promise<void> {
        this.DrawInitialTriangle();
        await this.DrawPatternAsync(1, this._coordinates);
    }

    private DrawInitialTriangle() {
        if (!this._context || !this._coordinates) {
            return;
        }
        
        this._context.fillStyle = "black";
        this._context.beginPath();
        this._context.moveTo(this._coordinates.A.x, this._coordinates.A.y);
        this._context.lineTo(this._coordinates.B.x, this._coordinates.B.y);
        this._context.lineTo(this._coordinates.C.x, this._coordinates.C.y);
        this._context.fill();
        this._context.closePath();
    }

    private async DrawPatternAsync(level: number, coordinates: TriangleCoordinates | null): Promise<void> {
        if (!this._context || !coordinates || !this._maxDepthLevel) {
            return;
        }
        
        if (level > this._maxDepthLevel) {
            return;
        }

        const medianCoordinates = {
            AB: {
                x: (coordinates.A.x + coordinates.B.x) / 2,
                y: (coordinates.A.y + coordinates.B.y) / 2,
            },
            BC: {
                x: (coordinates.B.x + coordinates.C.x) / 2,
                y: (coordinates.B.y + coordinates.C.y) / 2,
            },
            CA: {
                x: (coordinates.C.x + coordinates.A.x) / 2,
                y: (coordinates.C.y + coordinates.A.y) / 2,
            },
        }

        this.EraseMedianTriangle(medianCoordinates);

        const drawTrianglesOne = new Promise(() => {
            this.DrawPatternAsync(level + 1, {
                A: {
                    x: medianCoordinates.AB.x,
                    y: medianCoordinates.AB.y
                },
                B: {
                    x: coordinates.B.x,
                    y: coordinates.B.y
                },
                C: {
                    x: medianCoordinates.BC.x,
                    y: medianCoordinates.BC.y
                }
            });
        });

        const drawTrianglesTwo = new Promise(() => {
            this.DrawPatternAsync(level + 1, {
                A: {
                    x: medianCoordinates.BC.x,
                    y: medianCoordinates.BC.y
                },
                B: {
                    x: coordinates.C.x,
                    y: coordinates.C.y
                },
                C: {
                    x: medianCoordinates.CA.x,
                    y: medianCoordinates.CA.y
                }
            });
        });

        const drawTrianglesThree = new Promise(() => {
            this.DrawPatternAsync(level + 1, {
                A: {
                    x: medianCoordinates.AB.x,
                    y: medianCoordinates.AB.y
                },
                B: {
                    x: coordinates.A.x,
                    y: coordinates.A.y
                },
                C: {
                    x: medianCoordinates.CA.x,
                    y: medianCoordinates.CA.y
                }
            });
        });
        
        await Promise.all([ drawTrianglesOne, drawTrianglesTwo, drawTrianglesThree]);
    }

    private EraseMedianTriangle(medianCoordinates: MedianTriangleCoordinates) {
        if (!this._context) {
            return;
        }
        
        console.log(medianCoordinates);
        this._context.fillStyle = "white";
        this._context.beginPath();
        this._context.moveTo(medianCoordinates.AB.x, medianCoordinates.AB.y);
        this._context.lineTo(medianCoordinates.BC.x, medianCoordinates.BC.y);
        this._context.lineTo(medianCoordinates.CA.x, medianCoordinates.CA.y);
        this._context.fill();
        this._context.closePath();
    }
}