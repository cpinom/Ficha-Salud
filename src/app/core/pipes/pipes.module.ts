import { NgModule } from '@angular/core';
import { TitleCasePipe } from './title-case.pipe';

@NgModule({
  declarations: [
    TitleCasePipe,
  ],
  imports: [],
  exports: [
    TitleCasePipe
  ]
})

export class PipesModule { }