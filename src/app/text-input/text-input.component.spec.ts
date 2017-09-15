import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TextInputComponent} from './text-input.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

describe('TextInputComponent', () => {
  let component: TextInputComponent;
  let fixture: ComponentFixture<TextInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [TextInputComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();    // Met à jour la vue
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an emty init value', () => {
    expect(component.getGroup().get('value').value).toBe('');
  });

  it('shoud change initial value', () => {
    component.init = 'dude';
    component.ngOnInit();
    expect(component.getGroup().get('value').value).toBe('dude');
  });

  it('shoud notify value when change', (done: DoneFn) => {
    component.out.subscribe((d: string) => {
      expect(d).toBe('coco');
      done();
    });
    component.getGroup().setValue({'value': 'coco'});
  });

  it('shoud NOT notify value change if interval is less than 500 ms', (done: DoneFn) => {
    component.out.subscribe((d: string) => {
      expect(d).toBe('coucou');
      done();
    });
    component.getGroup().setValue({'value': 'coco'});
    setTimeout(() => {
      component.getGroup().setValue({'value': 'coucou'});
    }, 200);
  });

  it('shoud notify value changes only if interval between changes is less than 500 ms', (done: DoneFn) => {
    let count = 1;

    component.out.subscribe((d: string) => {
      if (count === 1) {
        expect(d).toBe('coco');
      } else {
        expect(d).toBe('yo');
      }

      if (count === 2) {
        done();
      }
      count++;
    });

    component.getGroup().setValue({'value': 'coco'}); // Notifié
    setTimeout(() => {
      component.getGroup().setValue({'value': 'coucou'}); // Non notifié
      setTimeout(() => {
        component.getGroup().setValue({'value': 'yo'}); // Notifié
      }, 250);
    }, 600);
  });

  it('shoud NOT notify value change if value is invalid', (done: DoneFn) => {
    let called = false;

    component.out.subscribe((d: string) => {
      called = true;
      done();
    });

    component.required = true;
    component.getGroup().setValue({'value': ''});

    // Si au bout de 200ms on n'est pas passé dans le callback => on se désabonne
    setTimeout(() => {
      component.out.unsubscribe();
      expect(called).toBe(false);
      done();
    }, 200);
  });
});
