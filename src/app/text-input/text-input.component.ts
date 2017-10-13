import {Component, OnInit, Output, Input, EventEmitter, OnChanges, SimpleChanges, ElementRef} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import {ValidableInputComponent} from '../validable-input/validable-input.component';

@Component({
  selector: 'gui-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css']
})
export class TextInputComponent extends ValidableInputComponent implements OnInit, OnChanges {
  @Input() init: string;
  @Input() placeholder: string;
  @Input() label: string;
  @Output() out: EventEmitter<string> = new EventEmitter<string>();

  private group: FormGroup;

  constructor(private fb: FormBuilder, private el: ElementRef) {
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

  /**
   * Donne le focus au champ de recherche.
   */
  focus(): void {
    const elements = this.el.nativeElement.getElementsByTagName('input');
    if (elements && elements.length === 1) {
      elements[0].focus();
    }
  }

  ngOnInit() {
    this.createForm();

    this.group.setValue({'value': (this.init ? this.init : '')});
    this.group.get('value')
      .valueChanges
      .debounceTime(500)
      .filter(val => {
        return this.group.valid;
      })
      .subscribe(val => {
        this.out.emit(val);
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const initChange = changes['init'];
    if (initChange && !initChange.firstChange) {
      this.group.get('value').setValue((changes['init'].currentValue));
    }
  }

}
