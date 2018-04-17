interface DepositFunction {
	(value: number): void;
}

interface BankAccount {
	money: number;
	deposit: DepositFunction;
}

interface User {
	name: string;
	bankAccount: BankAccount;
	hobbies: Array<string>;
}

let bankAccount: BankAccount = {
	money: 2000,
	deposit(value) {
		this.money += value;
	}
};

let myself: User = {
	name: "Asaad",
	bankAccount: bankAccount,
	hobbies: ["Violin", "Cooking"]
};

myself.bankAccount.deposit(3000);
console.log(myself);
