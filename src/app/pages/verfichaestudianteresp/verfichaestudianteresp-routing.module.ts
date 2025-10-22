import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerfichaestudianterespComponent } from './verfichaestudianteresp.component';

const routes: Routes = [{
  path: '',
  component: VerfichaestudianterespComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerfichaestudianterespRoutingModule { }
