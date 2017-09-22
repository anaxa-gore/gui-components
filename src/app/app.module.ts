import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TextInputComponent } from './text-input/text-input.component';
import { ValidableInputComponent } from './validable-input/validable-input.component';
import { ErrorsDisplayerComponent } from './errors-displayer/errors-displayer.component';
import { SimpleListInputComponent } from './simple-list-input/simple-list-input.component';

@NgModule({
  declarations: [
    AppComponent,
    TextInputComponent,
    ValidableInputComponent,
    ErrorsDisplayerComponent,
    SimpleListInputComponent
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
