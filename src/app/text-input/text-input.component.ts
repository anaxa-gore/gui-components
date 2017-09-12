import {Component, OnInit, Output, Input, OnDestroy, EventEmitter} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'gui-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css']
})
export class TextInputComponent implements OnInit {
  @Input() init: string;
  @Input() placeholder: string;
  @Input() label: string;
  @Output() out: EventEmitter<string> = new EventEmitter<string>();

  private group: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.group = this.fb.group({
      value: this.init
    });
  }

  ngOnInit() {
    this.group.setValue({'value': this.init});
    this.group.get('value').valueChanges.debounceTime(500).subscribe(val => {
      this.out.emit(val);
    });
  }
}
