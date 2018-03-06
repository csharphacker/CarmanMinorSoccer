import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthenticationService {
  private token: any = null;

  get isAuthenticated(): boolean {
    return this.token !== null;
  }

  constructor(
    private authenticator: AngularFireAuth
  ) { }

  logout() {
    this.authenticator.auth.signOut();
  }

  anonymousLogin() {
    return this.authenticator.auth.signInAnonymously()
    .then((user) => {
      this.token = user;
    })
    .catch(error => {
      console.log(error);
    });
  }
}
