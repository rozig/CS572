import {
	Component,
	OnInit,
	Input,
	Output,
	EventEmitter
} from '@angular/core';

@Component({
  selector: 'counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {
	@Input('value') counterValue: number;
	@Output() counterChange = new EventEmitter();
  	constructor() {}

  	increase() {
  		this.counterValue += 1;
  		this.counterChange.emit(this.counterValue);
  		return false;
  	}

  	decrease() {
  		this.counterValue = this.counterValue > 0 ? this.counterValue - 1 : 0;
  		this.counterChange.emit(this.counterValue);
  		return false;
  	}

	ngOnInit() {
		this.counterValue = this.counterValue ? this.counterValue : 0;
	}
}
