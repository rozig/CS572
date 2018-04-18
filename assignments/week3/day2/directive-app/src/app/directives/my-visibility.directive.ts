import {
	Directive,
	Input,
	ElementRef,
	OnInit
} from '@angular/core';

@Directive({
  selector: '[ccMyVisibility]'
})
export class MyVisibilityDirective {
	@Input('ccMyVisibility') visible: boolean;
  	
  	constructor(private el: ElementRef) {}

  	ngOnInit() {
  		this.el.nativeElement.style.display = this.visible ? 'list-item' : 'none';
  	}
}
