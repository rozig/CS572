class Car {
	acceleration: number = 0;
	
	constructor(private name: string) {}

	honk() {
		console.log(`${this.name} is saying: Tooooooooooot!`);
	}

	accelerate(speed: number) {
		this.acceleration += speed;
	}
}

const car = new Car("BMW");

car.honk();
console.log(car.acceleration);
car.accelerate(60);
console.log(car.acceleration);