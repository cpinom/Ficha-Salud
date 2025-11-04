import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', // Cualquier ruta que no coincida con las anteriores (basicmanete es un default)
    redirectTo: '/bienvenida',
    pathMatch: 'full',
  },
  // {
  //   path: 'bienvenida',
  //   loadChildren: () => import('./pages/bienvenidadocente/bienvenidadocente.module').then((m) => m.BienvenidadocenteModule),
  // },
  {
    path: 'tablerodocente',
    loadChildren: () => import('./pages/tablerodocente/tablerodocente.module').then((m) => m.TablerodocenteModule),
  },
  {
    path: 'listacursoseccion/:secciones',
    loadChildren: () => import('./pages/listacursoseccion/listacursoseccion.module').then((m) => m.ListacursoseccionModule),
  },
  {
    path: 'tbfichasasignadas',
    loadChildren: () => import('./pages/tbfichasasignadas/tbfichasasignadas.module').then((m) => m.TbfichasasignadasModule),
  },
  {
    path: 'verfichaestudianteresp',
    loadChildren: () => import('./pages/verfichaestudianteresp/verfichaestudianteresp.module').then((m) => m.VerfichaestudianterespModule),
  },
  {
    path: 'tableroestudiante',
    loadChildren: () => import('./pages/estudiante/tableroestudiante/tableroestudiante.module').then((m) => m.TableroestudianteModule),
  },
  {
    path: 'tbfichaseditestudiante/fichaenfermeriabasica',
    loadChildren: () => import('./pages/tbfichaseditestudiante/fichaenfermeriabasica/fichaenfermeriabasica.module').then((m) => m.FichaenfermeriabasicaModule),
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
