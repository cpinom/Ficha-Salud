import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetalleFichaRoutingModule } from './detalle-ficha-routing.module';
import { DetalleFichaComponent } from './detalle-ficha.component';
import { DirectivesModule } from '../../../../core/directives/directives.module';
import { PipesModule } from '../../../../core/pipes/pipes.module';
import { ComponentsModule } from '../../../../core/components/components.module';

@NgModule({
  declarations: [
    DetalleFichaComponent
  ],
  imports: [
    CommonModule,
    DetalleFichaRoutingModule,
    DirectivesModule,
    PipesModule,
    ComponentsModule
  ]
})
export class DetalleFichaModule { }
