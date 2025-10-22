import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog'
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';




@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports:[
    MatDialogModule,
    MatInputModule,
    MatMenuModule,
    MatStepperModule,
    MatSelectModule,
    MatOptionModule,

  ]
})
export class MaterialModule { }

const RangeLabel = (page: number, pageSize: number, length: number) => {
  if (length == 0 || pageSize == 0) {
    return `0 de ${length}`;
  }

  length = Math.max(length, 0);

  const startIndex = page * pageSize;

  // If the start index exceeds the list length, do not try and fix the end index to the end.
  const endIndex =
    startIndex < length
      ? Math.min(startIndex + pageSize, length)
      : startIndex + pageSize;

  return `${startIndex + 1} - ${endIndex} de ${length}`;
};

 export function getPaginatorIntl() {
   const paginatorIntl = new MatPaginatorIntl();
   paginatorIntl.itemsPerPageLabel = 'Registros por página:';
   paginatorIntl.nextPageLabel = 'Siguiente';
   paginatorIntl.previousPageLabel = 'Anterior';
   paginatorIntl.firstPageLabel = 'Primera página';
   paginatorIntl.lastPageLabel = 'Última página';
   paginatorIntl.getRangeLabel = RangeLabel;

   return paginatorIntl;
 }