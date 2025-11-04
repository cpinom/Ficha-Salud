import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FichaEstudianteRoutingModule } from './ficha-estudiante-routing.module';
import { FichaEstudianteComponent } from './ficha-estudiante.component';
import { PipesModule } from '../../../core/pipes/pipes.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    FichaEstudianteComponent
  ],
  imports: [
    CommonModule,
    FichaEstudianteRoutingModule,
    PipesModule,
    NgbModule
  ]
})
export class FichaEstudianteModule { }
