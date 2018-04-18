import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ExerciseComponent } from './exercise/exercise.component';

import { UpperDirective } from './directives/upper.directive';
import { MyVisibilityDirective } from './directives/my-visibility.directive';
import { MyColorDirective } from './directives/my-color.directive';


@NgModule({
  declarations: [
    AppComponent,
    ExerciseComponent,
    UpperDirective,
    MyVisibilityDirective,
    MyColorDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
