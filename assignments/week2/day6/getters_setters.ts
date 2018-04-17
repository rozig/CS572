class Person {
	private _firstName: string = '';

	get firstName(): string {
		return this._firstName;
	}

	set firstName(value: string) {
		this._firstName = value.toUpperCase();
	}
}

const person = new Person();
person.firstName = "John";
console.log(person.firstName);