import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstudiantesComponent } from './estudiantes.component';

const routes: Routes = [
  {
    path: '',
    component: EstudiantesComponent
  },
  {
    path: 'editar-ficha',
    loadChildren: () => import('./editar-ficha/editar-ficha.module').then(m => m.EditarFichaModule)
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
export class EstudiantesRoutingModule { }
