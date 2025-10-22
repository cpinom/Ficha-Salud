import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableDirective } from './data-table.directive';



@NgModule({
  declarations: [DataTableDirective],
  exports: [DataTableDirective],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
