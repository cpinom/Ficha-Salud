import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BienvenidadocenteRoutingModule } from './bienvenidadocente-routing.module';
import { BienvenidadocenteComponent } from './bienvenidadocente.component';


@NgModule({
  declarations: [BienvenidadocenteComponent],
  imports: [
    CommonModule,
    BienvenidadocenteRoutingModule
  ]
})
export class BienvenidadocenteModule { }
