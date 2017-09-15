import {Component, Input, OnInit} from '@angular/core';
import {FormGroup, ValidationErrors} from '@angular/forms';

@Component({
  selector: 'gui-errors-displayer',
  templateUrl: './errors-displayer.component.html',
  styleUrls: ['./errors-displayer.component.css']
})
export class ErrorsDisplayerComponent implements OnInit {
  @Input() formGroup: FormGroup;

  constructor() {
  }

  ngOnInit() {
  }

  getErrorMessage(): string {
    let message = '';

    Object.keys(this.formGroup.controls).forEach(key => {
      const errors: ValidationErrors = this.formGroup.get(key).errors;
      if (errors != null) {
        Object.keys(errors).forEach(keyError => {
          message += 'value : ' + keyError;
        });
      }
    });
    return message;
  }
}
