import {Component, OnInit, Output, Input, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import {ValidableInputComponent} from '../validable-input/validable-input.component';

@Component({
  selector: 'gui-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css']
})
export class TextInputComponent extends ValidableInputComponent implements OnInit {
  @Input() init: string;
  @Input() placeholder: string;
  @Input() label: string;
  @Output() out: EventEmitter<string> = new EventEmitter<string>();

  private group: FormGroup;

  constructor(private fb: FormBuilder) {
    super();
  }

  private createForm() {

    this.group = this.fb.group({
      value: [this.init, this.getValidators()]
    });
  }

  getGroup() {
    return this.group;
  }

  ngOnInit() {
    this.createForm();

    this.group.setValue({'value': (this.init ? this.init : '')});
    this.group.get('value').valueChanges.debounceTime(500).subscribe(val => {
      if (this.group.valid) {
        this.out.emit(val);
      }
    });
  }
}
