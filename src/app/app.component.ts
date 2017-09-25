import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'gui-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'gui works!';
  toto = 'my dude';
  myVal = '';

  dataChange(val: string): void {
    console.log('valeur en top = ', val);
  }

  listChanged(val: string): void {
    this.myVal = val;
  }

  ngOnInit(): void {
  }
}
