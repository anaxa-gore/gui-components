import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TextInputComponent } from './text-input/text-input.component';
import { ValidableInputComponent } from './validable-input/validable-input.component';
import { ErrorsDisplayerComponent } from './errors-displayer/errors-displayer.component';

@NgModule({
  declarations: [
    AppComponent,
    TextInputComponent,
    ValidableInputComponent,
    ErrorsDisplayerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
