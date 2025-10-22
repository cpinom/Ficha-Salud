import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TbfichasasignadasComponent } from './tbfichasasignadas.component';
import { FichaenfermeriabasicaComponent } from './fichaenfermeriabasica/fichaenfermeriabasica.component';
import { MedicoquirurgicoComponent } from './medicoquirurgico/medicoquirurgico.component';
import { SaluddigitalComponent } from './saluddigital/saluddigital.component';
import { PracticaprofesionalComponent } from './practicaprofesional/practicaprofesional.component';

const routes: Routes = [
  {
    path: '',
    component: TbfichasasignadasComponent, // este puede ser como pantalla inicial
  },
  {
    path: 'fichaenfermeriabasica/:secciones',
    component: FichaenfermeriabasicaComponent,
  },
  {
    path: 'medicoquirurgico/:secciones',
    component: MedicoquirurgicoComponent,
  },
   {
    path: 'saluddigital/:secciones',
    component: SaluddigitalComponent,
  },
  {
    path: 'practicaprofesional/:secciones',
    component: PracticaprofesionalComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TbfichasasignadasRoutingModule {}
