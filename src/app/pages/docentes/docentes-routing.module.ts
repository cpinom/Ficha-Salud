import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocentesComponent } from './docentes.component';

const routes: Routes =
  [
    {
      path: '', component: DocentesComponent
    },
    {
      path: 'detalle-curso',
      loadChildren: () => import('./detalle-curso/detalle-curso.module').then(m => m.DetalleCursoModule)
    },
    {
      path: 'ficha-estudiante',
      loadChildren: () => import('./ficha-estudiante/ficha-estudiante.module').then(m => m.FichaEstudianteModule)
    },
    {
      path: 'asignar-ficha',
      loadChildren: () => import('./asignar-ficha/asignar-ficha.module').then(m => m.AsignarFichaModule)
    }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocentesRoutingModule { }
