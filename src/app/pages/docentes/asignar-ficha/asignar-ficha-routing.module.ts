import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsignarFichaComponent } from './asignar-ficha.component';

const routes: Routes = [
  {
    path: '',
    component: AsignarFichaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AsignarFichaRoutingModule { }
