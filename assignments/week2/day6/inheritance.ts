class BaseObject {
	width: number = 0;
	length: number = 0;
}

class Rectangle extends BaseObject {
	constructor() {
		super();
	}

	calcSize(): number {
		return this.width * this.length;
	}
}

const rect = new Rectangle();
rect.width = 5;
rect.length = 2;

console.log(rect.calcSize());