// Get Canvas
var canvas = document.getElementById("connectfour");
var ctx = canvas.getContext('2d');
// Get the modal
var modal = document.getElementById("myModal");
var msg = document.getElementById("message");
var span = document.getElementById("close");
// Controls
var logRed = document.getElementById("redMoves");
var logBlue = document.getElementById("blueMoves");
var buttonStart = document.getElementById('reset');
// Matrix Dimensions
var num_of_rows = 6;
var num_of_cols = 7;
// correct dashboard measures variations 
var offset_x = 25;
var offset_y = 18;
// Set aprox measure for every cell in the dashboard
var cellWidth = 100;
var circle = cellWidth / 2;
// Matrix
var matrix = [];
// Variables
var counter_turns = 0;
var gameover = false;
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
    ctx.arc(circle + (y * cellWidth) + offset_x, circle + (x * cellWidth) + offset_y, circle - 10, 0, 2 * Math.PI);
    ctx.fill();
    // Circle Player Color
    ctx.beginPath();
    ctx.fillStyle = (turn) ? "blue" : "red";
    ctx.arc(circle + (y * cellWidth) + offset_x, circle + (x * cellWidth) + offset_y, circle - 15, 0, 2 * Math.PI);
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
// Function to check after every move if the user won
function isWinner(x, y, player) {
    if (checkVertically(x, y, player) || checkHorizontally(x, y, player) || checkDiagonally(x, y, player)) {
        //alert("Congratulations You Win");
        var player_name = (player == 1) ? "Red Player" : "Blue Player";
        var color = (player == 1) ? "red" : "blue";
        msg.style.color = color;
        msg.innerHTML = "Congratulations!!!<br><br> " + player_name + " You Win!!!";
        modal.style.display = "block";
        buttonStart.style['visibility'] = 'visible';
        // Comment line below if you want keep playing after win (Debug Purposes Only)
        gameover = true;
    }
}
// Move between rows checking the same column
function checkVertically(row, col, player) {
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
// Move between Diagonals 
function checkDiagonally(row, col, player) {
    var self = 1;
    //bottom rules
    if (row == matrix.length - 1 && col == 0) {
        // search up right only
        // console.log("search up right only");
        if (searchRightUp(row, col, player) + self > 3) {
            return true;
        }
    }
    else if (row == matrix.length - 1 && col > 0 && col < matrix[0].length - 1) {
        // search up only in both directions left and right
        // console.log("search up only in both directions left and right");
        if (searchLeftUp(row, col, player) + self > 3) {
            return true;
        }
        if (searchRightUp(row, col, player) + self > 3) {
            return true;
        }
    }
    else if (row == matrix.length - 1 && col == matrix[0].length - 1) {
        // Search Only up left side
        // console.log("Search Only up left side");
        if (searchLeftUp(row, col, player) + self > 3) {
            return true;
        }
    }
    //middle rules
    else if (row < matrix.length - 1 && row > 0 && col == 0) {
        // search up right and down right
        // console.log("search up right and down right");
        if (searchRightUp(row, col, player) + self > 3) {
            return true;
        }
        if (searchRightDown(row, col, player) + self > 3) {
            return true;
        }
    }
    else if (row < matrix.length - 1 && row > 0 && col > 0 && col < matrix[0].length - 1) {
        // search all directions
        // console.log("search all directions");
        if (searchRightUp(row, col, player) + searchLeftDown(row, col, player) + self > 3) {
            return true;
        }
        if (searchLeftUp(row, col, player) + searchRightDown(row, col, player) + self > 3) {
            return true;
        }
    }
    else if (row < matrix.length - 1 && row > 0 && col == matrix[0].length - 1) {
        // search up left and down left
        // console.log("search up left and down left");
        if (searchLeftDown(row, col, player) + self > 3) {
            return true;
        }
        if (searchLeftUp(row, col, player) + self > 3) {
            return true;
        }
    }
    // up rules
    else if (row == 0 && col == 0) {
        // search down right only
        // console.log("search down right only");
        if (searchRightDown(row, col, player) + self > 3) {
            return true;
        }
    }
    else if (row == 0 && col > 0 && col < matrix[0].length - 1) {
        // search down only in both directions left and right
        // console.log("search only down in both directions left and right");
        if (searchLeftDown(row, col, player) + self > 3) {
            return true;
        }
        if (searchRightDown(row, col, player) + self > 3) {
            return true;
        }
    }
    else if (row == 0 && col == matrix[0].length - 1) {
        // Search Only down left side
        // console.log("Search Only down left side");
        if (searchLeftDown(row, col, player) + self > 3) {
            return true;
        }
    }
    return false;
}
// Walk through Right Up direction looking for matches 
function searchRightUp(row, col, player) {
    var counter = 0;
    var i = row;
    var j = col;
    while (i > 0 && j < matrix[0].length - 1) {
        i--;
        j++;
        if (matrix[i][j] == player) {
            counter++;
        }
        else {
            return counter;
        }
    }
    return counter;
}
// Walk through Right Down direction looking for matches 
function searchRightDown(row, col, player) {
    var counter = 0;
    var i = row;
    var j = col;
    while (i < matrix.length - 1 && j < matrix[0].length - 1) {
        i++;
        j++;
        if (matrix[i][j] == player) {
            counter++;
        }
        else {
            return counter;
        }
    }
    return counter;
}
// Walk through left Up direction looking for matches 
function searchLeftUp(row, col, player) {
    var counter = 0;
    var i = row;
    var j = col;
    while (i > 0 && j > 0) {
        i--;
        j--;
        if (matrix[i][j] == player) {
            counter++;
        }
        else {
            return counter;
        }
    }
    return counter;
}
// Walk through left down direction looking for matches 
function searchLeftDown(row, col, player) {
    var counter = 0;
    var i = row;
    var j = col;
    while (i < matrix.length - 1 && j > 0) {
        i++;
        j--;
        if (matrix[i][j] == player) {
            counter++;
        }
        else {
            return counter;
        }
    }
    return counter;
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
        x: event.clientX - rect.left - offset_x,
        y: event.clientY - rect.top - offset_y
    };
}
// Add click event
canvas.addEventListener('click', function (event) {
    if (gameover)
        return;
    var x = getMousePosition(canvas, event).x;
    dropBall(x);
});
// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
};
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};
// Init function
function Init() {
    // Clear variables
    gameover = false;
    counter_turns = 0;
    playerBlueMoves = [];
    playerRedMoves = [];
    // Hide star over button
    buttonStart.style['visibility'] = 'hidden';
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