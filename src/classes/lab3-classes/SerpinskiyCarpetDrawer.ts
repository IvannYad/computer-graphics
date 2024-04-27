import { RectangleCoordinatesSimplified } from "./RectangleCoordinates";

export default class SerpinskiyCarpetDrawer {

    private _context: CanvasRenderingContext2D | null = null;
    private _coordinates: RectangleCoordinatesSimplified | null = null;
    private _maxDepthLevel: number | null = null;

    public SetParameters (context: CanvasRenderingContext2D, coordinates: RectangleCoordinatesSimplified, maxDepthLevel: number) {
        this._context = context;
        this._coordinates = coordinates;
        this._maxDepthLevel = maxDepthLevel;
    }

    public async DrawAsync(): Promise<void> {
        this.DrawInitialRectangle();
        await this.DrawPatternAsync(1, this._coordinates);
    }

    private DrawInitialRectangle() {
        if (!this._context || !this._coordinates) {
            return;
        }
        
        this._context.fillStyle = "black";
        this._context.fillRect(this._coordinates.TopLeft.x, this._coordinates.TopLeft.y, this._coordinates.xSide, this._coordinates.ySide);
    }

    private async DrawPatternAsync(level: number, coordinates: RectangleCoordinatesSimplified | null): Promise<void> {
        if (!this._context || !coordinates || !this._maxDepthLevel) {
            return;
        }
        
        if (level > this._maxDepthLevel) {
            return;
        }
        
        const xStep = coordinates.xSide / 3;
        const yStep = coordinates.ySide / 3;
        const functions: (() => Promise<void>)[] = [];

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (i === 1 &&  j === 1) {
                    this.EraseRectangle({
                        TopLeft: {
                            x: coordinates.TopLeft.x + xStep,
                            y: coordinates.TopLeft.y + yStep,
                        },
                        xSide: xStep,
                        ySide: yStep
                    });
                }
                else{
                    const coordinatesInLoop = {
                        TopLeft: {
                            x: coordinates.TopLeft.x + xStep * i,
                            y: coordinates.TopLeft.y + yStep * j,
                        },
                        xSide: xStep,
                        ySide: yStep
                    };
                    
                    functions.push(() => this.DrawPatternAsync(level + 1, coordinatesInLoop));
                }
            }
        }

        setTimeout(() => {
            functions.map((func) => {
                func();
            });
        }, 0)
    }

    private EraseRectangle(coordinates: RectangleCoordinatesSimplified) {
        if (!this._context) {
            return;
        }
        
        this._context.fillStyle = "white";
        this._context.fillRect(coordinates.TopLeft.x, coordinates.TopLeft.y, coordinates.xSide, coordinates.ySide);
    }
}