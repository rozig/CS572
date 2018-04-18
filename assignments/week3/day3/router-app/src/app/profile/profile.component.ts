import {
	Component,
	OnInit
} from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { DataService } from './../services/data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
	student: object;
	constructor(private dataService: DataService, private activatedRoute: ActivatedRoute) { }

	ngOnInit() {
		this.activatedRoute.params.subscribe(params => {
			this.student = this.dataService.getStudentInfo(params.id);
		});
	}
}
