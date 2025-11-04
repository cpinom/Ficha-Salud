import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarFichaComponent } from './editar-ficha.component';

const routes: Routes = [{ path: '', component: EditarFichaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditarFichaRoutingModule { }
