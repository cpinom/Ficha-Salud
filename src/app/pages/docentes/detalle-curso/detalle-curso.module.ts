import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetalleCursoRoutingModule } from './detalle-curso-routing.module';
import { DetalleCursoComponent } from './detalle-curso.component';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { PipesModule } from '../../../core/pipes/pipes.module';

@NgModule({
  declarations: [
    DetalleCursoComponent
  ],
  imports: [
    CommonModule,
    DetalleCursoRoutingModule,
    NgbModule,
    PipesModule
  ]
})
export class DetalleCursoModule { }
