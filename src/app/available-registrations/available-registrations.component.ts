import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-available-registrations',
  templateUrl: './available-registrations.component.html',
  styleUrls: ['./available-registrations.component.less']
})
export class AvailableRegistrationsComponent implements OnInit {

  spots: Array<any> = [];

  constructor(
    private db: AngularFirestore
  ) {
  }

  ngOnInit() {
    this.db.collection('spots')
      .ref
      .where('year', '==', new Date().getFullYear())
      .orderBy('order')
      .get()
      .then((collection) => {
        this.spots = [];
        collection.forEach(item => {
          this.spots.push(item.data());
        });
      });
  }
}
