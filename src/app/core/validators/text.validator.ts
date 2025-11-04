import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export interface TextValidatorOptions {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
}

/**
 * Valida texto de diagnóstico médico:
 * - No vacío (opcionalmente obligatorio)
 * - Longitud entre min y max
 * - Solo caracteres válidos (letras, números, tildes, signos básicos)
 */
export function textValidator(
  opts: TextValidatorOptions = {}
): ValidatorFn {
  const {
    required = true,
    minLength = 10,
    maxLength = 1000,
  } = opts;

  // Permite letras, números, espacios, puntuación básica, acentos, ñ, tildes
  const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9,.;:'"()\-–—_¿?¡!%+\s/°]+$/;

  return (control: AbstractControl): ValidationErrors | null => {
    const value = (control.value ?? '').trim();

    if (!value) {
      return required ? { textRequired: true } : null;
    }

    if (value.length < minLength) {
      return { textMinLength: { required: minLength, actual: value.length } };
    }

    if (value.length > maxLength) {
      return { textMaxLength: { required: maxLength, actual: value.length } };
    }

    if (!regex.test(value)) {
      return { textInvalidChars: { value } };
    }

    return null;
  };
}
