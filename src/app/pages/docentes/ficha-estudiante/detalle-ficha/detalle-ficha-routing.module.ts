import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalleFichaComponent } from './detalle-ficha.component';

const routes: Routes = [{ path: '', component: DetalleFichaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetalleFichaRoutingModule { }
