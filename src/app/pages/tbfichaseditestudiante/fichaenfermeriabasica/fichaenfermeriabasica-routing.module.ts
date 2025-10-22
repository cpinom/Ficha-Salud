import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FichaenfermeriabasicaComponent } from './fichaenfermeriabasica.component';

const routes: Routes = [{
  path: '',
  component: FichaenfermeriabasicaComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FichaenfermeriabasicaRoutingModule { }
