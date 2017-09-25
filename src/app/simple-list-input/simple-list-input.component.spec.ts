import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SimpleListInputComponent} from './simple-list-input.component';
import {TextInputComponent} from '../text-input/text-input.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ErrorsDisplayerComponent} from '../errors-displayer/errors-displayer.component';

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
});
