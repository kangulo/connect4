// Get Canvas
var canvas = document.getElementById("connectfour");
var ctx = canvas.getContext('2d');
// Controls
var logRed = document.getElementById("redMoves");
var logBlue = document.getElementById("blueMoves");
var buttonStart = document.getElementById('reset');
// Matrix Dimensions
var num_of_rows = 6;
var num_of_cols = 7;
// Set aprox measure for every cell in the dashboard
var cellWidth = 100;
var circle = cellWidth / 2;
// Matrix
var matrix = [];
// Variables
var counter_turns = 0;
// Logs
var playerRedMoves = [];
var playerBlueMoves = [];
// Set Matrix
function setMatrix(rows, cols) {
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
    // White Border
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.arc(circle + (y * cellWidth), circle + (x * cellWidth), circle, 0, 2 * Math.PI);
    ctx.fill();
    // Circle Player Color
    ctx.beginPath();
    ctx.fillStyle = (player) ? "blue" : "red";
    ctx.arc(circle + (y * cellWidth), circle + (x * cellWidth), circle - 10, 0, 2 * Math.PI);
    ctx.fill();
    // Render log player
    updateLog(player);
}
//Drop ball until the end of the column
function dropBall(column) {
    // Get index of the column
    var col = Math.floor(column / cellWidth);
    var turn = 0;
    // Start checking column from bottom to top
    for (var x = matrix.length - 1; x >= 0; x--) {
        if (matrix[x][col] === 0) {
            turn = counter_turns % 2;
            matrix[x][col] = (turn == 0 ? 1 : 2);
            if (turn) {
                playerBlueMoves.push("[" + (x + 1) + "," + (col + 1) + "]");
                // Change font size to indicate turn
                logRed.style.fontSize = "1.5em";
                logBlue.style.fontSize = "1em";
            }
            else {
                playerRedMoves.push("[" + (x + 1) + "," + (col + 1) + "]");
                // Change font size to indicate turn
                logRed.style.fontSize = "1em";
                logBlue.style.fontSize = "1.5em";
            }
            drawCircle(x, col, turn);
            counter_turns++;
            break;
        }
    }
}
// Update logs of plays
function updateLog(player) {
    if (player) {
        document.querySelector(".blueMoves").innerHTML = playerBlueMoves.toString();
    }
    else {
        document.querySelector(".redMoves").innerHTML = playerRedMoves.toString();
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
// Init function
function Init() {
    // Clear variables
    counter_turns = 0;
    playerBlueMoves = [];
    playerRedMoves = [];
    // clear moves log
    document.querySelector(".redMoves").innerHTML = "";
    document.querySelector(".blueMoves").innerHTML = "";
    //Set Font Style
    logRed.style.fontSize = "1.5em";
    logBlue.style.fontSize = "1em";
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Set Up Matrix
    setMatrix(num_of_rows, num_of_cols);
}
Init();
//# sourceMappingURL=connectfour.js.map