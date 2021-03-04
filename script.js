window.alert('!!!Be careful, this site produce sound. Attention, ce site produce de son.!!!');

confirm('Hi, this site is made of living cells which revives at all times and a constatly changing background to stare at when you are bored. Any actions you take will revive the cells otherwise wait for 15s.');
//'\n' line break was difficult to manage as it changes with browser

confirm('Bonjour, ce site est fait de cellules vivantes qui revivent à tout moment et d\'un arrière-plan en constante évolution pour regarder quand vous vous ennuyez. Toutes les actions que vous entreprenez raviveront les cellules, sinon attendez 15 secondes.');



var w;
var columns;
var rows;
var board;
var next;


function setup() {
	createCanvas(650, 650);
	w = 20;
	//Calculate columns and rows
	columns = floor(width / w);
	rows = floor(height / w);
	// Wacky way to make a 2D array is JS
	board = new Array(columns);
	for (let i = 0; i < columns; i++) {
		board[i] = new Array(rows);
	}
	// Going to use multiple 2D arrays and swap them
	next = new Array(columns);
	for (i = 0; i < columns; i++) {
		next[i] = new Array(rows);
	}
	init();
}

function draw(){
	background(255);
	generate();
	for (let i = 0; i < columns; i++){
		for (let j = 0; j < rows; j++){
			if ((board[i][j] == 1)) fill(0);
			else fill (255);
			stroke(0);
			rect(i * w, j * w, w - 1, w - 1);
			}
	}	

	let s = second();
	if (s === 15) {
		init();
	} else if (s === 30) {
		init();
	} else if (s === 45) {
		init();
	}else if (s === 0 || s === 00){
		init();
	}
}

//reset board when mouse is pressed
function mousePressed() {
	init();
}

//others
function mouseMoved() {
	init();
}

function mouseDragged(){
	init();
}

function mouseWheel(){
	init();
}

function keyIsPressed(){
	init();
}

function keyPressed(){
	init();
}

function keyReleased(){
	init();
}

function keyTyped(){
	init();
}

function keyIsDown(){
	init();
}

//fill board randomly
function init() {
	for (let i = 0; i < columns; i++){
		for (let j = 0; j < rows; j++){
			//lining the edges with 0s
			if (i == 0 || j == 0 || i == columns - 1 || j == rows - 1) board[i][j] = 0;
			//filling the rest randomly
			else board[i][j] = floor(random(2));
			next[i][j] = 0;
		}
	}
}


// The process of creating the new generation
function generate(){
	//loop through every spot in our 2D array and check spots neighbors
	for (let x = 1; x < columns - 1; x++){
		for (let y = 1; y < rows - 1; y++){
			//Add up all the states in a 3x3 surronding grid
			let neighbors = 0;
			for (let i = -1; i <= 1; i++){
				for (let j = -1; j <= 1; j++) {
					neighbors += board[x + i][y + j]; 
				}
			}

			// A little trick to subtract the currrent cell's state since
			//we added it in the above loop
			neighbors -= board[x][y];
			//Rules of Life
			if      ((board[x][y] == 1) && (neighbors < 2))  next[x][y] = 0;             //Loneliness
			else if ((board[x][y] == 1) && (neighbors > 3))  next[x][y] = 0;             //Overpopulation
			else if ((board[x][y] == 0) && (neighbors == 3)) next[x][y] = 1;             //Reproductin
			else                                             next[x][y] = board[x][y];   //Stasis
		}
	}

	//swap!
	let temp = board;
	board = next;
	next = temp;
}



