// Get Canvas
const canvas = <HTMLCanvasElement>document.getElementById("connectfour");
const ctx = canvas.getContext('2d');

// Matrix Dimensions
const num_of_rows = 6;
const num_of_cols = 7;

// Set aprox measure for every cell in the dashboard
const cellWidth = 100;
const circle = cellWidth / 2;

// Matrix
const matrix: number[][] = [];

// Player turns
let counterTurns = 0;

// Draw Matrix
function drawMatrix(rows: number, cols: number): void {
    for (let x = 0; x < rows; x++) {
        matrix[x] = [];
        for (let y = 0; y < cols; y++) {
            matrix[x][y] = 0;
        }
    }
    //console.table(matrix);
}

// Draw Circle in Position
function drawCircle(x: number, y: number, player: number): void {
    ctx.fillStyle = (player) ? "blue" : "red";
    ctx.beginPath();
    ctx.arc(circle + (y * cellWidth), circle + (x * cellWidth), circle, 0, 2 * Math.PI);
    ctx.fill();
}

//Drop ball until the end of the column
function dropBall(column: number): void {
    // Get index of the column
    let col = Math.floor(column / cellWidth);
    let turn: number = 0;
    // Start checking column from bottom to top
    for (let x = matrix.length - 1; x >= 0; x--) {
        if (matrix[x][col] === 0) {
            turn = counterTurns % 2;
            if (turn == 0) {
                matrix[x][col] = 1;
                drawCircle(x, col, turn);
            }
            else {
                matrix[x][col] = 2;
                drawCircle(x, col, turn);
            }
            counterTurns++;
            break;
        }
    }
}

// Get Mouse Coordinates
function getMousePosition(canvas: HTMLCanvasElement, event: any) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    }
}

// Add click event
canvas.addEventListener('click', (event: any) => {
    let { x } = getMousePosition(canvas, event);
    dropBall(x);
});

//

drawMatrix(num_of_rows, num_of_cols);