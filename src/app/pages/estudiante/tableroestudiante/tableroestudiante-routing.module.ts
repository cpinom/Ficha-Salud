import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableroestudianteComponent } from './tableroestudiante.component';

const routes: Routes = [{
  path: '',
  component: TableroestudianteComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TableroestudianteRoutingModule { }
