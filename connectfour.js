// Get Canvas
var canvas = document.getElementById("connectfour");
var ctx = canvas.getContext('2d');
// Matrix Dimensions
var num_of_rows = 6;
var num_of_cols = 7;
// Matrix
var matrix = [];
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
function drawCircle(x, y) {
    ctx.fillStyle = "red";
    ctx.beginPath();
    //ctx.arc(50 + (y * 100), 50 + (x * 100), 50, 0, 2 * Math.PI);
    ctx.arc(x, y, 50, 0, 2 * Math.PI);
    ctx.fill();
    console.log("entro x", x);
    console.log("entro y", y);
}
// Get Mouse Coordinates
function getMousePosition(event) {
    drawCircle(event.clientX, event.clientY);
}
// Add click event
canvas.addEventListener('click', function (event) {
    getMousePosition(event);
});
//
drawMatrix(num_of_rows, num_of_cols);
//# sourceMappingURL=connectfour.js.map