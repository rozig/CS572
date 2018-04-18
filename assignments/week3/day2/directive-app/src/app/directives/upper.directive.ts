import {
	Directive,
	Renderer,
	ElementRef
} from '@angular/core';

@Directive({
	selector: '[ccUpper]'
})
export class UpperDirective {

	constructor(private el: ElementRef) {
		el.nativeElement.style.textTransform = 'uppercase';
	}
}
