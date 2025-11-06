import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditarFichaRoutingModule } from './editar-ficha-routing.module';
import { EditarFichaComponent } from './editar-ficha.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '../../../core/directives/directives.module';
import { ComponentsModule } from '../../../core/components/components.module';

@NgModule({
  declarations: [
    EditarFichaComponent
  ],
  imports: [
    CommonModule,
    EditarFichaRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    ComponentsModule
  ]
})
export class EditarFichaModule { }
