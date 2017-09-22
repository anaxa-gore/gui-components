import {Component, Input, OnInit} from '@angular/core';
import {FormGroup, ValidationErrors} from '@angular/forms';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'gui-errors-displayer',
  templateUrl: './errors-displayer.component.html',
  styleUrls: ['./errors-displayer.component.css']
})
export class ErrorsDisplayerComponent implements OnInit {
  @Input() formGroup: FormGroup;

  errorMessage: string;

  constructor() {
  }

  ngOnInit() {
    // On écoute les passages du formGroup à INVALID
    this.formGroup.statusChanges
      .debounceTime(300)
      .filter(status => {
        return status === 'INVALID';
      })
      .subscribe(status => {
        this.loadErrorMessage();
      });
  }

  getMessageFromKey(errorKey, errorValue): string {
    switch (errorKey) {
      case 'required':
        return 'Le champ est requis.';
      case 'minlength':
        return 'La taille minimum du champ est de ' + errorValue['requiredLength'] + ' caractères.';
      case 'maxlength':
        return 'La taille maximum du champ est de ' + errorValue['requiredLength']  + ' caractères.';
      case 'min':
        return 'La valeur doit être supérieure ou égale à ' + errorValue['min'] + '.';
      case 'max':
        return 'La valeur doit être inférieure ou égale à ' + errorValue['max'] + '.';
      default:
        return 'La valeur du champ est incorrecte (' + errorKey + ').';
    }
  }

  loadErrorMessage(): void {
    Object.keys(this.formGroup.controls).forEach(key => {
      const errors: ValidationErrors = this.formGroup.get(key).errors;
      if (errors != null) {
        const keyError = Object.keys(errors)[0];
        this.errorMessage = this.getMessageFromKey(keyError, errors[keyError]); // errors[Object.keys(errors)[0]];
      }
    });
  }
}
