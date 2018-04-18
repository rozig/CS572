import { Component, OnInit } from '@angular/core';

import { DataService } from './../services/data.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
	students: any[];
  	constructor(private dataService: DataService) { }

  	ngOnInit() {
  		this.students = this.dataService.getData();
  	}

}
