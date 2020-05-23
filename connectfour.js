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
function drawCircle(x, y, turn) {
    // White Border
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.arc(circle + (y * cellWidth), circle + (x * cellWidth), circle, 0, 2 * Math.PI);
    ctx.fill();
    // Circle Player Color
    ctx.beginPath();
    ctx.fillStyle = (turn) ? "blue" : "red";
    ctx.arc(circle + (y * cellWidth), circle + (x * cellWidth), circle - 10, 0, 2 * Math.PI);
    ctx.fill();
    // Render log player
    updateLog(turn);
}
//Drop ball until the end of the column
function dropBall(column) {
    // Get index of the column
    var col = Math.floor(column / cellWidth);
    var turn = 0;
    var player;
    // Start checking column from bottom to top
    for (var x = matrix.length - 1; x >= 0; x--) {
        if (matrix[x][col] === 0) {
            turn = counter_turns % 2;
            player = (turn == 0 ? 1 : 2);
            matrix[x][col] = player;
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
            isWinner(x, col, player);
            counter_turns++;
            break;
        }
    }
}
function isWinner(x, y, player) {
    if (checkVerically(x, y, player) || checkHorizontally(x, y, player)) {
        alert("Congratulations You Win");
        buttonStart.style['visibility'] = 'visible';
        // Comment line below if you want keep playing after win (Debug Purposes Only)
        // gameover = true;
        return true;
    }
    return false;
}
// Move between rows checking the same column
function checkVerically(row, col, player) {
    // Wait to have minimun quantity of moves before start checking
    if (counter_turns < 6)
        return;
    var counter = 1;
    //check below
    for (var i = row; i < matrix.length - 1; i++) {
        if (matrix[i + 1][col] == player) {
            counter++;
        }
        else {
            break;
        }
        if (counter > 3) {
            alert("Congratulations you win");
            return true;
        }
    }
    return false;
}
// Move between columns checking the same row
function checkHorizontally(row, col, player) {
    // Wait to have minimun quantity of moves before start checking
    if (counter_turns < 6)
        return;
    var counter = 1;
    // Edge case if is the last column 
    if (col == matrix[0].length - 1) {
        for (var i = matrix[0].length - 1; i >= 0; i--) {
            if (matrix[row][i - 1] == player) {
                counter++;
            }
            else {
                return false;
            }
            if (counter > 3) {
                return true;
            }
        }
    }
    // Edge case if is the first column
    else if (col == 0) {
        for (var i = 0; i <= matrix[0].length - 1; i++) {
            if (matrix[row][i + 1] == player) {
                counter++;
            }
            else {
                return false;
            }
            if (counter > 3) {
                return true;
            }
        }
    }
    else { // middle
        //check to the right columns
        var i = col;
        while (i <= matrix[0].length - 1) {
            i++;
            if (matrix[row][i] == player) {
                counter++;
            }
            else {
                break;
            }
            if (counter > 3) {
                return true;
            }
        }
        // Check to the left columns
        var j = col;
        while (j >= 0) {
            j--;
            if (matrix[row][j] == player) {
                counter++;
            }
            else {
                break;
            }
            if (counter > 3) {
                return true;
            }
        }
    }
    return false;
}
// Update logs of plays
function updateLog(turn) {
    if (turn) {
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