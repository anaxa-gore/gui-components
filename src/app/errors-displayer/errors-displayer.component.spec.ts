import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {ErrorsDisplayerComponent} from './errors-displayer.component';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {By} from '@angular/platform-browser';

describe('ErrorsDisplayerComponent', () => {
  let component: ErrorsDisplayerComponent;
  let fixture: ComponentFixture<ErrorsDisplayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorsDisplayerComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorsDisplayerComponent);
    component = fixture.componentInstance;
    component.formGroup = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.min(5)])
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not display any error if the model is valid', () => {
    component.formGroup.controls['name'].setValue(10);
    expect(component.errorMessage).toBeUndefined();
  });

  it('should display the error in the HTML', fakeAsync(() => {
    const message: HTMLSpanElement = fixture.debugElement.query(By.css('#message')).nativeElement;
    component.formGroup.get('name').setValue('2');

    // Pour utiliser tick, il faut nécessaire le fakeAsync
    tick(500); // Ici on attend 300ms avant de checker car le refresh ne se fait que toutes les 300ms (cf. ngOnInità
    fixture.detectChanges();

    expect(component.errorMessage).toEqual('La valeur doit être supérieure ou égale à 5.');
    expect(message.textContent).toEqual(component.errorMessage);
  }));

  it('should process ONLY THE FIRST error if the model is invalid', () => {
    component.formGroup.get('name').clearValidators();
    component.formGroup.get('name').setValidators([Validators.maxLength(1), Validators.min(30)]);
    component.formGroup.get('name').setValue('15');

    expect(component.formGroup.status).toEqual('INVALID');

    const errors = component.formGroup.get('name').errors;
    const errorKeys = Object.keys(errors);

    // 2 erreurs
    expect(errorKeys.length).toEqual(2);
    // seulemnt la première dans le message
    expect(component.getMessageFromKey(errorKeys[0], errors[errorKeys[0]])).toEqual('La taille maximum du champ est de 1 caractères.');
  });
});
