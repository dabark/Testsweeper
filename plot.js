class Plot{

	constructor(i, j, w){
		this.i = i;
		this.j = j;
		this.w = w;

		this.x = i * w;
		this.y = j * w;

		this.revealed = false;
		this.mine = false;
		this.numNearby = 0;
		this.flag = false;
		this.shown = false;
	}

	show(){
		if (this.shown) {
			if (!this.mine){
				if (this.numNearby == 0){
					image(dirtImg, this.x, this.y);
				} else {
					image(dirtImg, this.x, this.y);
					textAlign(CENTER, CENTER);
					textSize(20);
					textStyle(BOLD);
					text(this.numNearby, this.x+this.w/2, this.y+this.w/2);
				}
			} else {
				image(mineImg, this.x, this.y, this.w, this.w);
			}	
		}
	}

	prelimShow(){
		image(grassImg, this.x, this.y);
	}

	countMines(){
		if (!this.mine){
			let numMines = 0;

			for (let xChange = -1; xChange <= 1; xChange++){
				let newI = this.i + xChange;
				if (newI < 0 || newI >= cols){
					continue;
				}
				for (let yChange = -1; yChange <= 1; yChange++){
					let newJ = this.j + yChange;
					if (newJ < 0 || newJ >= rows){
						continue;
					}

					let tempSpot = field[newI][newJ];
					if (tempSpot.mine){
						numMines++;
					}
				}
			}
			return numMines;
		} else {
			return -1;
		}
	}

	giveMine(){
		this.mine = true;
	}

	hasMine(){
		return this.mine;
	}

	setflag(){
		if (this.flag){
			flagCount++;
			this.flag = false;
			image(grassImg, this.x, this.y);
			image(flagholeImg, this.x, this.y);
		} else if (!this.flag){
			image(grassImg, this.x, this.y);
			image(flagImg, this.x, this.y);
			flagCount--;
			if (flagCount == 0){
				checkWin(0, 0);
			}
			this.flag = true;
		}
		this.show();
	}

	showAll(){
		if (!this.shown){
			this.shown = true;
			this.revealed = true;
			this.show();
		}
	}

	reveal(){
		if (!this.shown && !this.flag){
			this.shown = true;
			if (!this.revealed){
				this.revealed = true;
				if (this.mine){
					revealAll();
				} else if (this.numNearby == 0){
					//flood
					this.floodFill();
				}
			}
		}
		this.show();
	}

	floodFill(){
		for (let xChange = -1; xChange <= 1; xChange++){
			let newI = this.i + xChange;
			if (newI < 0 || newI >= cols){
				continue;
			}
			for (let yChange = -1; yChange <= 1; yChange++){
				let newJ = this.j + yChange;
				if (newJ < 0 || newJ >= rows){
					continue;
				}

				let tempSpot = field[newI][newJ];
				if (!tempSpot.revealed){
					tempSpot.reveal();
				}
			}
		}
	}

	setNearby(val){
		this.numNearby = val;
	}

}