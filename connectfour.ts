// Get Canvas
const canvas = <HTMLCanvasElement>document.getElementById("connectfour");
const ctx = canvas.getContext('2d');

// Controls
const logRed = document.getElementById("redMoves");
const logBlue = document.getElementById("blueMoves");
const buttonStart = document.getElementById('reset');

// Matrix Dimensions
const num_of_rows = 6;
const num_of_cols = 7;

// Set aprox measure for every cell in the dashboard
const cellWidth = 100;
const circle = cellWidth / 2;

// Matrix
const matrix: number[][] = [];

// Variables
let counter_turns = 0;

// Logs
let playerRedMoves: string[] = [];
let playerBlueMoves: string[] = [];

// Set Matrix
function setMatrix(rows: number, cols: number): void {
    for (let x = 0; x < rows; x++) {
        matrix[x] = [];
        for (let y = 0; y < cols; y++) {
            matrix[x][y] = 0;
        }
    }
    //console.table(matrix);
}

// Draw Circle in Position
function drawCircle(x: number, y: number, turn: number) {
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
function dropBall(column: number) {
    // Get index of the column
    let col = Math.floor(column / cellWidth);
    let turn: number = 0;
    let player: number;
    // Start checking column from bottom to top
    for (let x = matrix.length - 1; x >= 0; x--) {
        if (matrix[x][col] === 0) {
            turn = counter_turns % 2;
            player = (turn == 0 ? 1 : 2);
            matrix[x][col] = player;
            if (turn) {
                playerBlueMoves.push(`[${x + 1},${col + 1}]`);
                // Change font size to indicate turn
                logRed.style.fontSize = "1.5em";
                logBlue.style.fontSize = "1em";
            }
            else {
                playerRedMoves.push(`[${x + 1},${col + 1}]`);
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

function isWinner(x: number, y: number, player: number): boolean {
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
function checkVerically(row: number, col: number, player: number): boolean {
    // Wait to have minimun quantity of moves before start checking
    if (counter_turns < 6) return;
    let counter = 1;
    //check below
    for (let i = row; i < matrix.length - 1; i++) {
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
function checkHorizontally(row: number, col: number, player: number): boolean {
    // Wait to have minimun quantity of moves before start checking
    if (counter_turns < 6) return;
    let counter = 1;
    // Edge case if is the last column 
    if (col == matrix[0].length - 1) {
        for (let i = matrix[0].length - 1; i >= 0; i--) {
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
        for (let i = 0; i <= matrix[0].length - 1; i++) {
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
        let i = col;
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
        let j = col;
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
function updateLog(turn: number): void {
    if (turn) {
        document.querySelector(".blueMoves").innerHTML = playerBlueMoves.toString();
    }
    else {
        document.querySelector(".redMoves").innerHTML = playerRedMoves.toString();
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