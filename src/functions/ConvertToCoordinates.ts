import { RectangleCoordinatesSimplified } from "../classes/lab3-classes/RectangleCoordinates";
import { TriangleCoordinates } from "../classes/lab3-classes/TriangleCoordinates";

export function ConvertToTriangleCoordinates(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number): TriangleCoordinates{
    const coordinates: TriangleCoordinates = {
        A: {
            x: x1 * 20,
            y: y1 * -20,
        },
        B: {
            x: x2 * 20,
            y: y2 * -20,
        },
        C: {
            x: x3 * 20,
            y: y3 * -20,
        },
    }

    return coordinates;
}

export function ConvertToRectangleCoordinates(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number): RectangleCoordinatesSimplified{
    const coordinates: RectangleCoordinatesSimplified = {
        A: {
            x: x1 * 20,
            y: y1 * -20,
        },
        B: {
            x: x2 * 20,
            y: y2 * -20,
        },
        C: {
            x: x3 * 20,
            y: y3 * -20,
        },
        D: {
            x: x4 * 20,
            y: y4 * -20,
        },
    }

    return coordinates;
}