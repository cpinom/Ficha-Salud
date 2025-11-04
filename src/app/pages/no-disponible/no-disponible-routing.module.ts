import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoDisponibleComponent } from './no-disponible.component';

const routes: Routes = [{ path: '', component: NoDisponibleComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoDisponibleRoutingModule { }
