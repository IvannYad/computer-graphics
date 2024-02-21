import LABS_CONSTANTS from "../../app/common/constants/labs-constants";

type AxisStartingPoint = {
    number: number;
}

export class GridDrawer{
    private _canvasId: string;

    constructor(canvasId: string){
        this._canvasId = canvasId;
    }

    public drawGrid(){
        const grid_size = LABS_CONSTANTS.LAB1.SINGLE_SEGMENT;
        const x_axis_distance_grid_lines = 10;
        const y_axis_distance_grid_lines = 20;
        const x_axis_starting_point: AxisStartingPoint = { number: 1 };
        const y_axis_starting_point: AxisStartingPoint = { number: 1 };

        const canvas = document.getElementById(this._canvasId) as HTMLCanvasElement;
        const ctx = canvas!.getContext("2d")!;
        // canvas width
        const canvas_width = canvas.width;

        // canvas height
        const canvas_height = canvas.height;

        // no of vertical grid lines
        const num_lines_x = Math.floor(canvas_height/grid_size);

        // no of horizontal grid lines
        const num_lines_y = Math.floor(canvas_width/grid_size);

        this.drawHorizontalLines(ctx, num_lines_x, x_axis_distance_grid_lines, grid_size, canvas_width);
        this.drawVerticalLines(ctx, num_lines_y, y_axis_distance_grid_lines, grid_size, canvas_height);
        this.drawAxisNumbersX(ctx, num_lines_y, y_axis_distance_grid_lines, grid_size, x_axis_starting_point);
        this.drawAxisNumbersY(ctx, num_lines_x, x_axis_distance_grid_lines, grid_size, y_axis_starting_point);
    }

    private drawHorizontalLines(ctx: CanvasRenderingContext2D, numberOfLines: number, distanseGridLines: number, gridSize: number, canvasWidth: number){
        // Draw grid lines along X-axis
        for(let i=0; i<=numberOfLines; i++) {
            ctx.beginPath();
            ctx.lineWidth = 1;
        
            // If line represents X-axis draw in different color
            if(i == distanseGridLines) 
                ctx.strokeStyle = "#000000";
            else
                ctx.strokeStyle = "#e9e9e9";
            
            if(i == numberOfLines) {
                ctx.moveTo(0, gridSize*i);
                ctx.lineTo(canvasWidth, gridSize*i);
            }
            else {
                ctx.moveTo(0, gridSize*i+0.5);
                ctx.lineTo(canvasWidth, gridSize*i+0.5);
            }
            ctx.stroke();
            ctx.closePath();
        }
    }

    private drawVerticalLines(ctx: CanvasRenderingContext2D, numberOfLines: number, distanseGridLines: number, gridSize: number, canvasHeight: number){
        // Draw grid lines along Y-axis
        for(let i=0; i<=numberOfLines; i++) {
            ctx.beginPath();
            ctx.lineWidth = 1;
            
            // If line represents Y-axis draw in different color
            if(i == distanseGridLines) 
                ctx.strokeStyle = "#000000";
            else
                ctx.strokeStyle = "#e9e9e9";
            
            if(i == numberOfLines) {
                ctx.moveTo(gridSize*i, 0);
                ctx.lineTo(gridSize*i, canvasHeight);
            }
            else {
                ctx.moveTo(gridSize*i+0.5, 0);
                ctx.lineTo(gridSize*i+0.5, canvasHeight);
            }
            ctx.stroke();
            ctx.closePath();
        }
    }

    private drawAxisNumbersX(ctx: CanvasRenderingContext2D, numberOfLinesY: number, distanseGridLinesY: number, gridSize: number, xAxisStartingPoint: AxisStartingPoint){
        // Ticks marks along the positive X-axis
        for(let i=1; i<(numberOfLinesY - distanseGridLinesY); i++) {
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = "#000000";

            // Draw a tick mark 6px long (-3 to 3)
            ctx.moveTo(gridSize*i+0.5, -3 + 200);
            ctx.lineTo(gridSize*i+0.5, 3 + 200);
            ctx.stroke();

            // Text value at that point
            ctx.font = '9px Arial';
            ctx.textAlign = 'start';
            ctx.fillText(xAxisStartingPoint.number*i + "", 400 + gridSize*i-2, 200 + 15);
        }

        // Ticks marks along the negative X-axis
        for(let i=1; i<distanseGridLinesY; i++) {
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = "#000000";

            // Draw a tick mark 6px long (-3 to 3)
            ctx.moveTo(-gridSize*i+0.5, 200 + -3);
            ctx.lineTo(-gridSize*i+0.5, 200 + 3);
            ctx.stroke();

            // Text value at that point
            ctx.font = '9px Arial';
            ctx.textAlign = 'end';
            ctx.fillText(-xAxisStartingPoint.number*i + "", 400 + -gridSize*i+3, 200 + 15);
        }
    }

    private drawAxisNumbersY(ctx: CanvasRenderingContext2D, numberOfLinesX: number, distanseGridLinesX: number, gridSize: number, yAxisStartingPoint: AxisStartingPoint){
        // Ticks marks along the positive X-axis
        for(let i=1; i<(numberOfLinesX - distanseGridLinesX); i++) {
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = "#000000";

            // Draw a tick mark 6px long (-3 to 3)
            ctx.moveTo(-3 + 400, gridSize*i+0.5);
            ctx.lineTo(3 + 400, gridSize*i+0.5);
            ctx.stroke();

            // Text value at that point
            ctx.font = '9px Arial';
            ctx.textAlign = 'start';
            ctx.fillText(-yAxisStartingPoint.number*i + "", 8 + 400, gridSize*i+3 + 200);
        }

        // Ticks marks along the negative X-axis
        for(let i=1; i< distanseGridLinesX; i++) {
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = "#000000";

            // Draw a tick mark 6px long (-3 to 3)
            ctx.moveTo(-3 + 400, -gridSize*i+0.5);
            ctx.lineTo(3 + 400, -gridSize*i+0.5);
            ctx.stroke();

            // Text value at that point
            ctx.font = '9px Arial';
            ctx.textAlign = 'end';
            ctx.fillText(yAxisStartingPoint.number*i + "", 8 + 400, -gridSize*i+3 + 200);
        }
    }
}