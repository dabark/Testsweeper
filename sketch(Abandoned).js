let width = 400;
let height = 400;

let numSpots = 100;
let numMines = 20;

let field = [];

let numbers = [-10, -9, 1, 11, 10, 9, -1, -11];
let numbers2 = [-10, -1, 1, 10]

function setup() {
	createCanvas(width, height);
	createField();
	drawField();
}

function createField(){
	for (i = 0; i < 100; i++){
		field[i] = new Spot(width, height, 10, 10);
	}

	for (i = 0; i < numMines; i++){
		let ranSpot = floor(random(numSpots));
		let curSpot = field[ranSpot];
		//console.log(curSpot);
		if (!curSpot.retMine()) {
			curSpot.giveMine();
		}
	}
}

function mousePressed(){
	let mx = mouseX;
	let my = mouseY;
	let index = floor(mx / 40) + (floor((my / 40)) * 10);
	console.log(mx, my, index);
	console.log(field[index]);
	if (mouseButton === LEFT){
		uncover(index);
	} else if (mouseButton === RIGHT){
		//console.log(field[index]);
	}
}

function uncover(idx){
	let newx = (20 + ((idx % 10) * 40));
	let newy = (20 + ((floor(idx / 10)) * 40));
	//TODO Fix flooding and edgecases
	(field[idx]).show(newx, newy);
	//if ((field[idx]).isRevealed()){
		if ((field[idx]).retMine()){
			revealAll();
		} else if ((field[idx]).getNearby() == 0){
			if (idx == 0){
				//topleft
				uncoverNearby(idx, 3, [2, 3, 4]);
			} else if (idx == 9){
				//topright
				uncoverNearby(idx, 3, [4, 5, 6]);
			} else if (idx == 99){
				//bottomright
				uncoverNearby(idx, 3, [6, 7, 0]);
			} else if (idx == 90){
				//bottomleft
				uncoverNearby(idx, 3, [0, 1, 2]);
			} else if (floor(idx / 10) == 0){
				//top
				uncoverNearby(idx, 5, [2, 3, 4, 5, 6]);
			} else if (idx % 10 == 0){
				//left
				uncoverNearby(idx, 5, [0, 1, 2, 3, 4]);
			} else if (idx % 10 == 9){
				//right
				uncoverNearby(idx, 5, [4, 5, 6, 7, 0]);
			} else if (floor(idx / 10) == 9){
				//bottom
				uncoverNearby(idx, 5, [6, 7, 0, 1, 2]);
			} else {
				//inside
				uncoverNearby(idx, 8, [0, 1, 2 , 3, 4, 5, 6, 7]);
			}
		}
	//}
}

function uncoverNearby(id, amt, ids){
	for (j = 0; j < amt; j++){
		let newidx = id+numbers[ids[j]];
		let nx = (20 + ((newidx % 10) * 40));
		let ny = (20 + ((floor(newidx / 10)) * 40));
		if (!(field[newidx]).isRevealed()){
			if ((field[newidx]).getNearby() == 0){
				uncover(newidx);
			} else if (!(field[newidx]).retMine()) {
				(field[newidx]).show(nx, ny);
			}
		}
	}
}

function calcMines(){
	for (i = 0; i < numSpots; i++){
		if (i == 0){
			//topleft
			(field[i]).updateNearby(checkNearby(i, 3, [2, 3, 4]));
		} else if (i == 9){
			//topright
			(field[i]).updateNearby(checkNearby(i, 3, [4, 5, 6]));
		} else if (i == 99){
			//bottomright
			(field[i]).updateNearby(checkNearby(i, 3, [0, 6, 7]));
		} else if (i == 90){
			//bottomleft
			(field[i]).updateNearby(checkNearby(i, 3, [0, 1, 2]));
		}else if (floor(i / 10) == 0){
			//top
			(field[i]).updateNearby(checkNearby(i, 5, [2, 3, 4, 5, 6]));
		} else if (i % 10 == 0){
			//left
			(field[i]).updateNearby(checkNearby(i, 5, [0, 1, 2, 3, 4]));
		} else if (i % 10 == 9){
			//right
			(field[i]).updateNearby(checkNearby(i, 5, [0, 4, 5, 6, 7]));
		} else if (floor(i / 10) == 9){
			//bottom
			(field[i]).updateNearby(checkNearby(i, 5, [0, 1, 2, 6, 7]));
		} else {
			//inside
			(field[i]).updateNearby(checkNearby(i, 8, [0, 1, 2, 3, 4, 5, 6, 7]));
		}
	}
}

function checkNearby(id, amt, ids){
	let numMines = 0;
	for (j = 0; j < amt; j++){
		if ((field[id+numbers[ids[j]]]).retMine()){
			numMines += 1;
		}
	}
	return numMines;
}

function revealAll(){

}

function drawField(){
	background(220);
	for (i = 0; i < numSpots; i++){
		let drawSpot = field[i];
		if (!drawSpot.isRevealed()){
			if (drawSpot.retMine()){
				fill(255, 0, 0);
			} else {
				fill(0, 0, 0);
			}
			let dims = drawSpot.getWH();
			let sWidth = dims[0];
			let sHeight = dims[1];
			let x = (i % 10) * sWidth;
			let y = floor((i / 10)) * sHeight;
			rect(x, y, sWidth-2, sHeight-2);
		}
	}
	calcMines();
}

function draw() {


}