import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-guardian-form',
  templateUrl: './guardian-form.component.html',
  styleUrls: ['./guardian-form.component.less']
})
export class GuardianFormComponent {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.initForm();
  }

  private initForm() {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      emailAddress: ['', Validators.required],
      preferredContactMethod: ['', Validators.required],
      address: this.initAddress()
    });
  }

  private initAddress() {
    return this.formBuilder.group({
      street: '',
      city: '',
      postal: ['', Validators.pattern('[a-zA-Z][0-9][a-zA-Z]\s?[0-9][a-zA-Z][0-9]')]
    });
  }
}
