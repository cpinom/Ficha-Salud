import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/bienvenida',
    pathMatch: 'full'
  },
  {
    path: 'no-disponible',
    loadChildren: () => import('./pages/no-disponible/no-disponible.module').then(m => m.NoDisponibleModule)
  },
  {
    path: 'estudiantes',
    loadChildren: () => import('./pages/estudiantes/estudiantes.module').then(m => m.EstudiantesModule)
  },
  {
    path: 'docentes',
    loadChildren: () => import('./pages/docentes/docentes.module').then(m => m.DocentesModule)
  },
  {
    path: 'bienvenida',
    loadChildren: () => import('./pages/bienvenida/bienvenida.module').then(m => m.BienvenidaModule)
  },
  {
    path: '**',
    redirectTo: '/bienvenida'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
