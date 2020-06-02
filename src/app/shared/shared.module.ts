// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Layout
import { HeaderComponent } from './layout/header/header.component';
import { IonicModule } from '@ionic/angular';

const MODULES = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  IonicModule
];

const COMPONENTS = [
  HeaderComponent
];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    ...MODULES
  ],
  exports: [
    ...MODULES,
    ...COMPONENTS
  ]
})
export class SharedModule { }
