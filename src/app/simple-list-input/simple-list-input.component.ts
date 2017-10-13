import {
  Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, Pipe, PipeTransform
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
    switch (event.keyCode) {
      case 40:
        this.processDownKey();
        break;
      case 27:
        this.processEscapeKey();
        break;
      default:
      // On s'en fout
    }
  }

  // @HostListener('window:focus', ['$event.target'])
  // private focus(target: any) {
  //   console.log(target.constructor);
  //   this.displayList = false;
  // }

  // @HostListener('document:click') mouseClicked(evt) {
  //   console.log('hello');
  // }


  constructor(private fb: FormBuilder, private el: ElementRef) {
    super();
  }

  ngOnInit() {
    this.group = this.fb.group({
      value: ['']
    });

    this.group.get('value')
      .valueChanges
      .debounceTime(500)
      .filter(val => {
        return this.group.valid;
      })
      .subscribe(val => {
        this.out.emit(val);
      });

    // Observable.fromEvent(this.el.nativeElement, 'keydown')
    //   .filter((evt: KeyboardEvent) => {
    //     return evt.keyCode === 27 || evt.keyCode === 40;
    //   })
    //   .subscribe((evt: KeyboardEvent) => {
    //     if()
    //   });
  }

  /**
   * Affichage / masquage de la liste de valeurs.
   * @param display Si <code>true/false</code>, force l'affichage ou le masquage. Sinon, inverse la visibilité.
   */
  changeListDisplay(display?: boolean): void {
    this.displayList = !this.displayList;

    // Si on masque => On supprime le filtrage sur la liste
    if (!this.displayList) {
      this.filterList();
    }
  }

  filterList(val?: string): void {
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

  private processDownKey(): void {
    if (!this.displayList) {
      this.changeListDisplay(true);
    } else {
      console.log('down');
      const element: HTMLElement = this.el.nativeElement;
      // element.getElementsByClassName('list-item').item(2).('hover', 'true');
    }
  }

  private processEscapeKey(): void {
    this.changeListDisplay(false);
  }
}

