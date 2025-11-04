import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-error-msg',
  templateUrl: './error-msg.component.html',
  styleUrl: './error-msg.component.scss'
})
export class ErrorMsgComponent {
  @Input() control!: AbstractControl | null;

  get firstErrorMessage(): string | null {
    if (!this.control || !this.control.errors || !this.control.touched) return null;

    const errors = this.control.errors;

    if (errors['required']) return 'Este campo es obligatorio.';
    if (errors['minLength']) return 'Debe tener más caracteres.';
    if (errors['maxLength']) return 'Supera el máximo permitido.';
    if (errors['rut']) return errors['rut'];
    if (errors['telefono']) return errors['telefono'];
    if (errors['pattern']) return errors['pattern'];
    if (errors['digitos']) return errors['digitos'];
    if (errors['decimal']) return errors['decimal'];
    if (errors['fecha']) return errors['fecha'];

    // --- Nuevos mensajes ---
    if (errors['minValue']) return `Debe ser al menos ${errors['minValue'].requiredMin}.`;
    if (errors['maxValue']) return `Debe ser menor o igual a ${errors['maxValue'].requiredMax}.`;
    if (errors['minDate']) return `Debe ser posterior o igual a ${errors['minDate'].requiredMinDate}.`;
    if (errors['maxDate']) return `Debe ser anterior o igual a ${errors['maxDate'].requiredMaxDate}.`;

    return null;
  }
}
