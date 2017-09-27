import {
  Component, EventEmitter, HostListener, Input, OnInit, Output, Pipe, PipeTransform,
  Renderer2
} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ValidableInputComponent} from '../validable-input/validable-input.component';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(values: any[], filter: string) {
    if (filter === null || filter === undefined) {
      return values;
    }

    return values.filter((val) => {
      return val.indexOf(filter) !== -1;
    });
  }
}

@Component({
  selector: 'gui-simple-list-input',
  templateUrl: './simple-list-input.component.html',
  styleUrls: ['./simple-list-input.component.css'],

})
export class SimpleListInputComponent extends ValidableInputComponent implements OnInit {
  @Input() label: string;
  @Input() items: Array<string>;
  @Output() out: EventEmitter<string> = new EventEmitter();


  private filterValue: string;
  private group: FormGroup;
  private displayList = false;

  @HostListener('keydown', ['$event'])
  private keyDown(event: KeyboardEvent) {
    if (event.keyCode === 40 && !this.displayList) {
      this.displayList = true;
    } else {

    }
  }

  @HostListener('window:focus', ['$event.target'])
  private focus(target: any) {
    console.log(target.constructor);
    this.displayList = false;
  }

  // @HostListener('document:click') mouseClicked(evt) {
  //   console.log('hello');
  // }


  constructor(private fb: FormBuilder, private renderer: Renderer2) {
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

  filterList(val: string): void {
    this.filterValue = val;
  }

  /**
   * Change la valeur sélectionnée.
   * @param item La valeur sélectionnée ou <code>null</code> si aucune valeur sélectionnée.
   */
  selectValue(item: string): void {
    this.group.get('value').setValue(item);
  }

  getGroup(): FormGroup {
    return this.group;
  }
}
