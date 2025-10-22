import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListacursoseccionComponent } from './listacursoseccion.component';

const routes: Routes = [{path: '', component: ListacursoseccionComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListacursoseccionRoutingModule { }
