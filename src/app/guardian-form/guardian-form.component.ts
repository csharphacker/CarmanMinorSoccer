import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-guardian-form',
  templateUrl: './guardian-form.component.html',
  styleUrls: ['./guardian-form.component.less']
})
export class GuardianFormComponent implements OnInit {

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
  data: Observable<any>;
  spots: Array<any> = [];

  get buttonDisabled(): boolean {
    const playersArray = this.form.controls.players as FormArray;
    const formIsValid = this.form.valid;

    return !formIsValid || !(playersArray && playersArray.length > 0);
  }

  constructor(
    private formBuilder: FormBuilder,
    private db: AngularFirestore
  ) {
    this.initForm();
  }

  ngOnInit() {
    this.db.collection('spots')
      .ref
      .where('year', '==', new Date().getFullYear())
      .orderBy('order')
      .get()
      .then((collection) => {
        this.ageGroups = [];
        this.spots = [];

        collection.forEach(item => {
          const data = item.data();

          this.spots.push({
            key: item.id,
            data: data
          });

          if (data.available > 0) {
            this.ageGroups.push(data.ageRange);
          }
        });
      });
  }

  getSkillLevelText(level: number) {
    let hint = '';

    switch (level) {
      case 1:
        hint = 'My child has never really played before';
        break;

      case 2:
        hint = 'My child has played, but could use some assistance';
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

  onRegisterClicked() {
    if (this.form.valid) {
      const registration = this.form.value;
      const updatedSpots = JSON.parse(JSON.stringify(this.spots));

      this.db.collection('registration').add(registration);

      registration.players.forEach((player) => {
        const found = updatedSpots.find((spot => spot.data.ageRange === player.ageGroup));

        found.data.available--;
        this.db.firestore.doc('/spots/' + found.key).update(found.data);
      });

      this.initForm();
    }
  }

  onNumberOfPlayersChanged(value: string) {
    let numberOfPlayers = parseInt(value, 10);
    const playersArray = this.form.controls.players as FormArray;

    numberOfPlayers = numberOfPlayers - (playersArray ? playersArray.length : 0);

    if (numberOfPlayers > 0) {
      while (numberOfPlayers > 0) {
        playersArray.push(this.initPlayer(this.form.controls.guardian as FormGroup));
        numberOfPlayers--;
      }
    } else if (numberOfPlayers < 0) {
      while (numberOfPlayers < 0) {
        playersArray.removeAt(playersArray.length - 1);
        numberOfPlayers++;
      }
    }
  }

  private initForm() {
    this.form = this.formBuilder.group({
      guardian: this.initGuardian(),
      players: this.formBuilder.array([
        this.initPlayer(null)
      ])
    });
  }

  private initGuardian() {
    return this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      homePhone: '',
      mobilePhone: '',
      email: ['', Validators.required],
      contactMethod: ['Email', Validators.required],
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

  private initPlayer(guardian: FormGroup) {
    const lastName = guardian ? guardian.controls['lastName'].value : '';

    return this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: [lastName, Validators.required],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      ageGroup: ['', Validators.required],
      level: ['3', Validators.required]
    });
  }
}
