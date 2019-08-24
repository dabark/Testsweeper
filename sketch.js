let sizes = [10, 10, 18, 18, 27, 22];

let diff = 0;

let plotWidth = 30;

let cols;
let rows;

let width;
let height;

let numMines;
let flagCount;

let field;

let flagImg;
let mineImg;
let grassImg;
let dirtImg;
let flagholeImg;

function setDifficulty(difficulty){
	diff = parseInt(difficulty);
	remake();
}

function preload(){
	flagImg = loadImage('Assets/minesweeperflag.png');
	grassImg = loadImage('Assets/grass.png');
	dirtImg = loadImage('Assets/dirt.png');
	flagholeImg = loadImage('Assets/flaghole.png');
	mineImg = loadImage('Assets/mine.png');
}

function make2DArray(col, row){
	let arr = new Array(col);
	for (i = 0; i < arr.length; i++){
		arr[i] = new Array(row);
	}
	return arr;
}

function setup(){
	background(255);
	remake();
}

function remake(){
	mineImg.resize(plotWidth, plotWidth);
	flagImg.resize(plotWidth, plotWidth);
	grassImg.resize(plotWidth, plotWidth);
	dirtImg.resize(plotWidth, plotWidth);
	flagholeImg.resize(plotWidth, plotWidth);

	cols = sizes[diff];
	rows = sizes[diff + 1];

	width = plotWidth*cols;
	height = plotWidth*rows;

	numMines = Math.floor((cols * rows) / 10) + (diff * 10);
	flagCount = numMines;

	field = make2DArray(cols, rows);
	createCanvas(width, height);
	for (i = 0; i<field.length; i++){
		for (j = 0; j<field[0].length; j++){
			field[i][j] = new Plot(i, j, plotWidth);
		}
	}
	addMines(numMines);
	for (i = 0; i<field.length; i++){
		for (j = 0; j<field[0].length; j++){
			field[i][j].setNearby(field[i][j].countMines());
			field[i][j].prelimShow();
		}
	}
}

function mousePressed(){
	let mi = floor(mouseX/plotWidth);
	let mj = floor(mouseY/plotWidth);
	if ((mi >= 0 && mj >= 0) && (mi < cols && mj < rows)){
		if (mouseButton === LEFT){
			(field[mi][mj]).reveal();
		} else if (mouseButton === CENTER){
			(field[mi][mj]).setflag();
		}
	}
}

function revealAll(){
	for (i = 0; i<field.length; i++){
		for (j = 0; j<field[0].length; j++){
			field[i][j].showAll();
		}
	}
}

function addMines(mineCount){
	for (i = 0; i < mineCount; i++){
		let ranx = floor(random(cols));
		let rany = floor(random(rows));
		if (!field[ranx][rany].hasMine()){
			field[ranx][rany].giveMine();
		} else {
			i--;
		}
	}
}

//TODO: Finish checkWin
let win = false;
function checkWin(i, j){
	if (i > cols || j > rows){
		return true;
	} else {
		win = (field[i][j].flag && field[i][j].mine) && checkWin(i+1, j+1);
	}
	return win;
}