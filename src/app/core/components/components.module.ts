import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MaterialModule } from '../../material.module';
import { SpinnerOverlayComponent } from './spinner-overlay/spinner-overlay.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FichaDinamicaComponent } from './ficha-dinamica/ficha-dinamica.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '../directives/directives.module';
import { FileInputWrapperComponent } from './file-input-wrapper/file-input-wrapper.component';
import { SelectInputComponent } from './select-input/select-input.component';
import { TextInputComponent } from './text-input/text-input.component';
import { TextareaInputComponent } from './textarea-input/textarea-input.component';
import { ErrorMsgComponent } from './error-msg/error-msg.component';
import { FichaDetalleComponent } from './ficha-detalle/ficha-detalle.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SpinnerOverlayComponent,
    FichaDinamicaComponent,
    FileInputWrapperComponent,
    SelectInputComponent,
    TextInputComponent,
    TextareaInputComponent,
    ErrorMsgComponent,
    FichaDetalleComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    DirectivesModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SpinnerOverlayComponent,
    FichaDinamicaComponent,
    FileInputWrapperComponent,
    SelectInputComponent,
    TextInputComponent,
    TextareaInputComponent,
    ErrorMsgComponent,
    FichaDetalleComponent
  ]
})
export class ComponentsModule { }
