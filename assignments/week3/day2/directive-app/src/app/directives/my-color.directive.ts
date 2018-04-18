import {
	Directive,
	HostListener,
	ElementRef,
	Input
} from '@angular/core';

@Directive({
  selector: '[ccMyColor]'
})
export class MyColorDirective {
	@Input() ccMyColor: string;
	constructor(private el: ElementRef) { }

	@HostListener('click')
	onMouseClick() {
		this.changeColor(this.ccMyColor);
	}


	@HostListener('mouseleave')
	onMouseLeave() {
		this.changeColor('black');
	}

	changeColor(color: string): void {
		this.el.nativeElement.style.color = color;
	}
}
