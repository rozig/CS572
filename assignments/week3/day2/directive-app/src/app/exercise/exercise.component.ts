import {
	Component,
	Input,
	Output,
	OnInit,
	EventEmitter
} from '@angular/core';

@Component({
  selector: 'exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit {
	@Input('items') items;
	@Output() colorChange = new EventEmitter();
  	colors: string[];
  	constructor() {
  		this.colors = ['green', 'red', 'yellow', 'blue', 'orange', 'cyan'];
  	}

  	ngOnInit() {}

  	changeColor(color): void {
  		this.colorChange.emit(color);
  	}
}
