import { NgModule } from '@angular/core';
import {
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatSliderModule,
  MatCardModule,
  MatToolbarModule,
  MatButtonModule
} from '@angular/material';

@NgModule({
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSliderModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule
  ]
})
export class MaterialModule { }
