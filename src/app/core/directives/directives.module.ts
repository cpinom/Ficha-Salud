import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SortableHeaderDirective } from './sortable-header.directive';
import { ChosenDirective } from './chosen.directive';
import { DatepickerDirective } from './datepicker.directive';

@NgModule({
  declarations: [
    SortableHeaderDirective,
    ChosenDirective,
    DatepickerDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SortableHeaderDirective,
    ChosenDirective,
    DatepickerDirective
  ]
})
export class DirectivesModule { }
