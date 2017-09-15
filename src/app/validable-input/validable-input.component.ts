import {Component, Input, OnInit} from '@angular/core';
import {ValidatorFn, Validators} from '@angular/forms';

@Component({
  selector: 'gui-validable-input',
  templateUrl: './validable-input.component.html',
  styleUrls: ['./validable-input.component.css']
})
export class ValidableInputComponent implements OnInit {

  @Input() required = false;
  @Input() min: number;
  @Input() max: number;
  @Input() minLength: number;
  @Input() maxLength: number;
  @Input() pattern: string;

  constructor() {
  }

  ngOnInit() {

  }

  getValidators(): Array<ValidatorFn> {
    const result: Array<ValidatorFn> = [];

    if (this.required) {
      result.push(Validators.required);
    }
    if (this.min) {
      result.push(Validators.min(this.min));
    }
    if (this.max) {
      result.push(Validators.max(this.max));
    }
    if (this.minLength) {
      result.push(Validators.minLength(this.minLength));
    }
    if (this.maxLength) {
      result.push(Validators.min(this.maxLength));
    }
    if (this.pattern) {
      result.push(Validators.pattern(this.pattern));
    }
    return result;
  }

}
