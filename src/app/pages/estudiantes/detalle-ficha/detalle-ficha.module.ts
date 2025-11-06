import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetalleFichaRoutingModule } from './detalle-ficha-routing.module';
import { DetalleFichaComponent } from './detalle-ficha.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../../../core/components/components.module';

@NgModule({
  declarations: [
    DetalleFichaComponent
  ],
  imports: [
    CommonModule,
    DetalleFichaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule
  ]
})
export class DetalleFichaModule { }
