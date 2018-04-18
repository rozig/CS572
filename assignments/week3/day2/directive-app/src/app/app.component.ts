import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	currentColor: string;
  	items: string[] = ['MWA', 'WAP', 'WAA', 'Algorithms', 'SWE', 'EA'];

  	onColorChange(color: string): void {
  		this.currentColor = color;
  	}
}
