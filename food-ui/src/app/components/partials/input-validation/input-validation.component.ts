import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';

const VALIDATORS_MESSAGES: any = {
  required: "Preencha o campo acima",
  email: "E-mail inválido",
  password: "E-mail ou senha incorretos",
  minlength: "deve conter 5 caracteres ou mais",
  notMatch: "As senhas não são iguais"
}
@Component({
  selector: 'input-validation',
  templateUrl: './input-validation.component.html',
  styleUrls: ['./input-validation.component.scss']
})
export class InputValidationComponent implements OnInit, OnChanges {

  @Input() showErrorsWhen: boolean = true
  @Input() control!: AbstractControl
  @Input() errorMessagers: string[] = []
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.checkValidation()
  }

  ngOnInit(): void {
    this.control.statusChanges.subscribe(() => {
      this.checkValidation();
    });
    this.control.valueChanges.subscribe(() => {
      this.checkValidation()
    })
  }

  checkValidation() {
    const errors = this.control.errors;
    if(!errors) {
      this.errorMessagers = []
      return
    }
    const errorKeys = Object.keys(errors)
    this.errorMessagers = errorKeys.map(key => VALIDATORS_MESSAGES[key])
  }
}
