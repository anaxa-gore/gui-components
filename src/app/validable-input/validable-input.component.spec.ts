import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidableInputComponent } from './validable-input.component';

describe('ValidableInputComponent', () => {
  let component: ValidableInputComponent;
  let fixture: ComponentFixture<ValidableInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidableInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidableInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
