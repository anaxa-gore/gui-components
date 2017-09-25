import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ValidableInputComponent} from '../validable-input/validable-input.component';

@Component({
  selector: 'gui-simple-list-input',
  templateUrl: './simple-list-input.component.html',
  styleUrls: ['./simple-list-input.component.css']
})
export class SimpleListInputComponent extends ValidableInputComponent implements OnInit {
  @Input() label: string;
  @Output() out: EventEmitter<string> = new EventEmitter();

  group: FormGroup;
  items: Array<string> = ['Bonjour', 'Ca va', 'Pas de problème', 'Encore un coup', 'Blabla', 'Hey'];

  private displayList = false;

  // @HostListener('document:click') mouseClicked(evt) {
  //   console.log('hello');
  // }


  constructor(private fb: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.group = this.fb.group({
      value: ['']
    });

    this.group.get('value').valueChanges
      .debounceTime(500)
      .filter(val => {
        return this.group.valid;
      })
      .subscribe(val => {
        this.out.emit(val);
      });
  }

  /**
   * Affichage / masquage de la liste de valeurs.
   */
  changeListDisplay() {
    this.displayList = !this.displayList;
  }

  /**
   * Change la valeur sélectionnée.
   * @param item La valeur sélectionnée ou <code>null</code> si aucune valeur sélectionnée.
   */
  selectValue(item: string): void {
    this.group.get('value').setValue(item);
  }
}
