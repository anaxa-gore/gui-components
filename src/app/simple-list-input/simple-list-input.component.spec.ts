import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {SimpleListInputComponent} from './simple-list-input.component';
import {TextInputComponent} from '../text-input/text-input.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ErrorsDisplayerComponent} from '../errors-displayer/errors-displayer.component';
import {By} from '@angular/platform-browser';

describe('SimpleListInputComponent', () => {
  let component: SimpleListInputComponent;
  let fixture: ComponentFixture<SimpleListInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [
        SimpleListInputComponent,
        TextInputComponent,
        ErrorsDisplayerComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleListInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add items to the list, when list displayed', () => {
    component.items = ['a', 'b', 'c', 'd'];
    component.changeListDisplay();  // On affiche la liste

    fixture.detectChanges();

    const items = fixture.debugElement.queryAll(By.css('.list-item'));
    expect(items.length).toEqual(4);
  });

  it('should display a delete cross when a value is selected', () => {
    const cross = fixture.debugElement.query(By.css('.fa-close'));
    expect(cross).toBeNull();

    component.items = ['a', 'b', 'c', 'd'];
    component.selectValue('a');

    fixture.detectChanges();

    expect(cross).toBeDefined();
  });

  it('should clean the selected value when a click is performed on the cross', () => {
    component.items = ['a', 'b', 'c', 'd'];
    component.selectValue('a');

    fixture.detectChanges();
    expect(component.getGroup().get('value').value).toEqual('a');

    const cross = fixture.debugElement.query(By.css('.fa-close'));
    cross.triggerEventHandler('click', cross);

    fixture.detectChanges();
    expect(component.getGroup().get('value').value).toBeNull();
  });
});
