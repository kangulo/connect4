// Get Canvas
const canvas = <HTMLCanvasElement>document.getElementById("connectfour");
const ctx = canvas.getContext('2d');

// Matrix Dimensions
const num_of_rows = 6;
const num_of_cols = 7;

// Matrix
const matrix: number[][] = [];

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
function drawCircle(x: number, y: number): void {
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(50 + (y * 100), 50 + (x * 100), 50, 0, 2 * Math.PI);
    //ctx.arc(x, y, 50, 0, 2 * Math.PI);
    ctx.fill();
}

//Drop ball until the end of the column
function dropBall(column: number): void {
    let col = Math.floor(column / 100);
    // Start checking column from bottom to top
    for (let x = matrix.length - 1; x >= 0; x--) {
        console.log("matrix[x][col] " + x + " " + col + " ");
        if (matrix[x][col] === 0) {
            matrix[x][col] = 1;
            drawCircle(x, col);
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