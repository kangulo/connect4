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
    //ctx.arc(50 + (y * 100), 50 + (x * 100), 50, 0, 2 * Math.PI);
    ctx.arc(x, y, 50, 0, 2 * Math.PI);
    ctx.fill();
    console.log("entro x", x);
    console.log("entro y", y);

}

// Get Mouse Coordinates
function getMousePosition(event: any) {
    drawCircle(event.clientX, event.clientY);
}

// Add click event
canvas.addEventListener('click', (event: any) => {
    getMousePosition(event);
});

//

drawMatrix(num_of_rows, num_of_cols);