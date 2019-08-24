class Spot{

	constructor(w, h, spotsx, spotsy){
		this.width = w / spotsx;
		this.height = h / spotsy;
		this.hasMine = false;
		this.numNearby = 0;
		this.revealed = false;
	}

	show(x, y){
		this.revealed = true;
		if (this.hasMine){
			fill(255, 255, 0);
			ellipse(x, y, this.width/1.5, this.height/1.5);
		} else if (this.numNearby > 0) {
			rectMode(CENTER);
			fill(200);
			rect(x, y, this.width-4, this.height-4);
			fill(0);
			textAlign(CENTER, CENTER);
			text(this.numNearby, x, y)
		} else {
			rectMode(CENTER);
			fill(200);
			rect(x, y, this.width-4, this.height-4);
		}
	}

	giveMine(){
		this.hasMine = true;
	}

	isRevealed(){
		return this.revealed;
	}

	updateNearby(newNum){
		this.numNearby = newNum;
	}

	getNearby(){
		return this.numNearby;
	}

	incrNearby(val = 1){
		this.numNearby += val;
	}

	retMine(){
		return this.hasMine;
	}

	getWH(){
		return [this.width, this.height];
	}

}