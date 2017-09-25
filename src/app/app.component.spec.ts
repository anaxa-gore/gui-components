import {TestBed, async} from '@angular/core/testing';

import {AppComponent} from './app.component';
import {ReactiveFormsModule} from '@angular/forms';
import {TextInputComponent} from './text-input/text-input.component';
import {ErrorsDisplayerComponent} from './errors-displayer/errors-displayer.component';
import {SimpleListInputComponent} from './simple-list-input/simple-list-input.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [
        AppComponent,
        TextInputComponent,
        SimpleListInputComponent,
        ErrorsDisplayerComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'gui works!'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('gui works!');
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('gui works!');
  }));
});
