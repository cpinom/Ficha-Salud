import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TbfichasasignadasRoutingModule } from './tbfichasasignadas-routing.module';
import { TbfichasasignadasComponent } from './tbfichasasignadas.component';
import { FichaenfermeriabasicaComponent } from './fichaenfermeriabasica/fichaenfermeriabasica.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SaluddigitalComponent } from './saluddigital/saluddigital.component';
import { MedicoquirurgicoComponent } from './medicoquirurgico/medicoquirurgico.component';
import { PracticaprofesionalComponent } from './practicaprofesional/practicaprofesional.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    TbfichasasignadasComponent, 
    FichaenfermeriabasicaComponent, 
    SaluddigitalComponent,
    MedicoquirurgicoComponent,
    PracticaprofesionalComponent
  ],
  imports: [
    CommonModule,
    TbfichasasignadasRoutingModule,
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
export class TbfichasasignadasModule { }
