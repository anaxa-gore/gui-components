import {Component, HostListener, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'gui-simple-list-input',
  templateUrl: './simple-list-input.component.html',
  styleUrls: ['./simple-list-input.component.css']
})
export class SimpleListInputComponent implements OnInit {
  @Input() label: string;

  group: FormGroup;
  items: Array<string> = ['Bonjour', 'Ca va', 'Pas de problème'];
  // @HostListener('document:click') mouseClicked(evt) {
  //   console.log('hello');
  // }


  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {
    this.group = this.fb.group({
      val: ['']
    });
  }

}
