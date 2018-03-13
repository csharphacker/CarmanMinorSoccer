import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

// import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GuardianFormComponent } from './guardian-form/guardian-form.component';
import { MaterialModule } from './material.module';
import { environment } from '../environments/environment';
import { AuthenticationService } from './authentication.service';
import { AvailableRegistrationsComponent } from './available-registrations/available-registrations.component';

function anonymousLoginFactory(service: AuthenticationService) {
  return () => service.anonymousLogin();
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    // AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase, 'carman-minor-soccer'),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  declarations: [
    AppComponent,
    GuardianFormComponent,
    // AvailableRegistrationsComponent
  ],
  providers: [
    AuthenticationService,
    {
      provide: APP_INITIALIZER,
      useFactory: anonymousLoginFactory,
      multi: true,
      deps: [AuthenticationService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
