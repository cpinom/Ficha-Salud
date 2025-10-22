import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FichaenfermeriabasicaRoutingModule } from './fichaenfermeriabasica-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FichaenfermeriabasicaComponent } from './fichaenfermeriabasica.component';


@NgModule({
  declarations: [FichaenfermeriabasicaComponent],
  imports: [
    CommonModule,
    FichaenfermeriabasicaRoutingModule,
    FormsModule, 
        ReactiveFormsModule, 
        MatInputModule,
        MatFormFieldModule,
        MatStepperModule,
        MatNativeDateModule,
        MatButtonModule,    
        MatSelectModule,
        MatStepperModule, 
        MatIconModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
  ]
})
export class FichaenfermeriabasicaModule { }
