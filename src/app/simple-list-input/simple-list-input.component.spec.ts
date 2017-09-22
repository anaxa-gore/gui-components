import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleListInputComponent } from './simple-list-input.component';

describe('SimpleListInputComponent', () => {
  let component: SimpleListInputComponent;
  let fixture: ComponentFixture<SimpleListInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleListInputComponent ]
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
