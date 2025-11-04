import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoDisponibleRoutingModule } from './no-disponible-routing.module';
import { NoDisponibleComponent } from './no-disponible.component';


@NgModule({
  declarations: [
    NoDisponibleComponent
  ],
  imports: [
    CommonModule,
    NoDisponibleRoutingModule
  ]
})
export class NoDisponibleModule { }
