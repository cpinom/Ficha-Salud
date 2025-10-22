import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: '', // Cualquier ruta que no coincida con las anteriores (basicmanete es un default)
  //   redirectTo: '/bienvenidadocente',
  //   pathMatch: 'full',
  // },
  {
    path: 'bienvenidadocente',
    loadChildren: () =>
      import('./pages/bienvenidadocente/bienvenidadocente.module').then((m) => m.BienvenidadocenteModule),
  },
  {
    path: 'tablerodocente',
    loadChildren: () =>
      import('./pages/tablerodocente/tablerodocente.module').then((m) => m.TablerodocenteModule),
  },
   {
    path: 'listacursoseccion/:secciones',
    loadChildren: () =>
      import('./pages/listacursoseccion/listacursoseccion.module').then((m) => m.ListacursoseccionModule),
  },
  {
    path: 'tbfichasasignadas',
    loadChildren: () =>
      import('./pages/tbfichasasignadas/tbfichasasignadas.module').then((m) => m.TbfichasasignadasModule),
  },
  {
    path: 'verfichaestudianteresp',
    loadChildren: () =>
      import('./pages/verfichaestudianteresp/verfichaestudianteresp.module').then((m) => m.VerfichaestudianterespModule),
  },
  {
    path: 'tableroestudiante',
    loadChildren: () =>
      import('./pages/estudiante/tableroestudiante/tableroestudiante.module').then((m) => m.TableroestudianteModule),
  },
  {
    path: 'tbfichaseditestudiante/fichaenfermeriabasica',
    loadChildren: () =>
      import('./pages/tbfichaseditestudiante/fichaenfermeriabasica/fichaenfermeriabasica.module').then((m) => m.FichaenfermeriabasicaModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
