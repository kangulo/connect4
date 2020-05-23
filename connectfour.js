// Get Canvas
var canvas = document.getElementById("connectfour");
var ctx = canvas.getContext('2d');
// Matrix Dimensions
var num_of_rows = 6;
var num_of_cols = 7;
// Set aprox measure for every cell in the dashboard
var cellWidth = 100;
var circle = cellWidth / 2;
// Matrix
var matrix = [];
// Player turns
var counterTurns = 0;
// Draw Matrix
function drawMatrix(rows, cols) {
    for (var x = 0; x < rows; x++) {
        matrix[x] = [];
        for (var y = 0; y < cols; y++) {
            matrix[x][y] = 0;
        }
    }
    //console.table(matrix);
}
// Draw Circle in Position
function drawCircle(x, y, player) {
    ctx.fillStyle = (player) ? "blue" : "red";
    ctx.beginPath();
    ctx.arc(circle + (y * cellWidth), circle + (x * cellWidth), circle, 0, 2 * Math.PI);
    ctx.fill();
}
//Drop ball until the end of the column
function dropBall(column) {
    // Get index of the column
    var col = Math.floor(column / cellWidth);
    var turn = 0;
    // Start checking column from bottom to top
    for (var x = matrix.length - 1; x >= 0; x--) {
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
function getMousePosition(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}
// Add click event
canvas.addEventListener('click', function (event) {
    var x = getMousePosition(canvas, event).x;
    dropBall(x);
});
//
drawMatrix(num_of_rows, num_of_cols);
//# sourceMappingURL=connectfour.js.map