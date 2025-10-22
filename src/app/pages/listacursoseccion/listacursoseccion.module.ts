import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListacursoseccionRoutingModule } from './listacursoseccion-routing.module';
import { ListacursoseccionComponent } from './listacursoseccion.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [ListacursoseccionComponent],
  imports: [
    CommonModule,
    ListacursoseccionRoutingModule,
    MatDialogModule,
    SharedModule,
  ]
})
export class ListacursoseccionModule { }
