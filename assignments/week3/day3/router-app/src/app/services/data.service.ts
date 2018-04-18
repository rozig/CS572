import { Injectable } from '@angular/core';

@Injectable()
export class DataService {
	students: any[] = [
		{
			id: '1',
			name: 'Asaad Saad',
			stuID: '12345',
			email: 'asaad@mum.edu'
		}
	];

	constructor() { }

	getData(): any[] {
		return this.students;
	}

	getStudentInfo(id: string): object {
		for(let student of this.students) {
			if(id === student.id) {
				return student;
			} else {
				return null;
			}
		}
	}
}
