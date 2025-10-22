import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidadocenteComponent } from './bienvenidadocente.component';

const routes: Routes = [{path: '', component: BienvenidadocenteComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BienvenidadocenteRoutingModule { }
