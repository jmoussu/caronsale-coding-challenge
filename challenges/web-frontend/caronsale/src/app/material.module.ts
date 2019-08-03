import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatToolbarModule,
  MatInputModule,
  MatIconModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatIconModule,
  ],
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatIconModule
  ]
})

export class MaterialModule {}
