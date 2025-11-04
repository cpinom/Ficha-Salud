import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableroestudianteRoutingModule } from './tableroestudiante-routing.module';
import { TableroestudianteComponent } from './tableroestudiante.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  declarations: [TableroestudianteComponent],
  imports: [
    CommonModule,
    TableroestudianteRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class TableroestudianteModule { }
