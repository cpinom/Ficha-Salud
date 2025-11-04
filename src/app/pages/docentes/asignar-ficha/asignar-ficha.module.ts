import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsignarFichaRoutingModule } from './asignar-ficha-routing.module';
import { AsignarFichaComponent } from './asignar-ficha.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsModule } from '../../../core/components/components.module';
import { DirectivesModule } from '../../../core/directives/directives.module';

@NgModule({
  declarations: [
    AsignarFichaComponent
  ],
  imports: [
    CommonModule,
    AsignarFichaRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    ComponentsModule,
    DirectivesModule
  ]
})
export class AsignarFichaModule { }
