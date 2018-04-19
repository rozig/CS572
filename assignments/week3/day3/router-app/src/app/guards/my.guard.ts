import { Injectable } from '@angular/core';
import {
	CanActivate,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
	Router
} from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { DataService } from './../services/data.service';

@Injectable()
export class MyGuard implements CanActivate {

	constructor(private dataService: DataService, private router: Router) {}

	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		const id = next.params.id;
		if(!id) {
			this.router.navigate(['/error']);
			return false;
		}

		const student: object = this.dataService.getStudentInfo(id);

		if(student === null) {
			this.router.navigate(['/error']);
			return false;
		} else {
			return true;
		}
	}
}
