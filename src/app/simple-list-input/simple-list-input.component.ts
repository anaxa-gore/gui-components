import {Component, HostListener, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ValidableInputComponent} from '../validable-input/validable-input.component';

@Component({
  selector: 'gui-simple-list-input',
  templateUrl: './simple-list-input.component.html',
  styleUrls: ['./simple-list-input.component.css']
})
export class SimpleListInputComponent extends ValidableInputComponent implements OnInit {
  @Input() label: string;

  group: FormGroup;
  items: Array<string> = ['Bonjour', 'Ca va', 'Pas de problème'];
  selectedValue: string;


  // @HostListener('document:click') mouseClicked(evt) {
  //   console.log('hello');
  // }


  constructor(private fb: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.group = this.fb.group({
      val: ['']
    });
  }

  selectValue(item: string): void {
    this.selectedValue = item;
  }
}
