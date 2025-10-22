import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TablerodocenteRoutingModule } from './tablerodocente-routing.module';
import { TablerodocenteComponent } from './tablerodocente.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [TablerodocenteComponent],
  imports: [
    CommonModule,
    TablerodocenteRoutingModule,
    FormsModule
  ]
})
export class TablerodocenteModule { }
