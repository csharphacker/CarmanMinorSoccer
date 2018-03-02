import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-guardian-form',
  templateUrl: './guardian-form.component.html',
  styleUrls: ['./guardian-form.component.less']
})
export class GuardianFormComponent {

  contactMethods = [
    'Email',
    'Home Phone',
    'Mobile Phone',
  ];

  genders = [
    'Female',
    'Male',
  ];

  ageGroups = [
    '4-5',
    '6-8',
    '9-12',
    '13-15'
  ];

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.initForm();
  }

  getSkillLevelText(level: number) {
    let hint = '';

    switch (level) {
      case 1:
        hint = 'My child has never really played before';
        break;

      case 2:
        hint = 'My child has played, but could use some assitance';
        break;

      case 3:
        hint = 'My child can hold their own on the field';
        break;

      case 4:
        hint = 'My child will score a goal from time to time';
        break;

      case 5:
        hint = 'My child is a mini Pele';
        break;
    }

    return hint;
  }

  private initForm() {
    this.form = this.formBuilder.group({
      guardian: this.initGuardian(),
      players: this.formBuilder.array([
        this.initPlayer()
      ])
    });
  }

  private initGuardian() {
    return this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      homePhone: ['', Validators.required],
      mobilePhone: ['', Validators.required],
      email: ['', Validators.required],
      preferredContactMethod: ['Email', Validators.required],
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

  private initPlayer() {
    return this.formBuilder.group({
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      gender: '',
      ageGroup: '',
      level: '3'
    });
  }
}
