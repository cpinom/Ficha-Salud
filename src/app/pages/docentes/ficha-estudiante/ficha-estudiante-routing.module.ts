import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FichaEstudianteComponent } from './ficha-estudiante.component';

const routes: Routes = [
  {
    path: '',
    component: FichaEstudianteComponent
  },
  {
    path: 'detalle-ficha',
    loadChildren: () => import('./detalle-ficha/detalle-ficha.module').then(m => m.DetalleFichaModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FichaEstudianteRoutingModule { }
