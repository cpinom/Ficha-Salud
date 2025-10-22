import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TablerodocenteComponent } from './tablerodocente.component';

const routes: Routes = [{ path:'', component: TablerodocenteComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TablerodocenteRoutingModule { }
