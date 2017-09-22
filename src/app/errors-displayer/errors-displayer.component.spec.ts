import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorsDisplayerComponent } from './errors-displayer.component';
import {FormControl, FormGroup, Validators} from '@angular/forms';

describe('ErrorsDisplayerComponent', () => {
  let component: ErrorsDisplayerComponent;
  let fixture: ComponentFixture<ErrorsDisplayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorsDisplayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorsDisplayerComponent);
    component = fixture.componentInstance;
    component.formGroup = new FormGroup({
      name: new FormControl('', Validators.required)
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
