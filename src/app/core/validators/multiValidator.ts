import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function multiValidator(options?: {
  required?: boolean;
  disabled?: boolean;
  minLength?: number;
  maxLength?: number;
  type?: 'rut' | 'telefono' | 'texto' | 'digitos' | 'decimal' | 'fecha';
  pattern?: RegExp;
  minValue?: number;   // para 'digitos'
  maxValue?: number;   // para 'digitos'
  minDate?: string;    // para 'fecha' → formato 'DD/MM/YYYY'
  maxDate?: string;    // para 'fecha' → formato 'DD/MM/YYYY'
}): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    // --- Disabled ---
    if (options?.disabled) {
      control.disable({ emitEvent: false });

      // Si está deshabilitado no validar
      return null;
    }
    else if (control.disabled) {
      // Si previamente estaba deshabilitado y ahora no
      control.enable({ emitEvent: false });
    }


    const value = (control.value ?? '').toString().trim();
    const isEmpty = value.length === 0;

    // --- Required ---
    if (options?.required && isEmpty) {
      return { required: true };
    }

    // --- Si no es requerido y está vacío, no valida más ---
    if (!options?.required && isEmpty) {
      return null;
    }

    // --- MinLength / MaxLength ---
    if (options?.minLength && value.length < options.minLength) {
      return { minLength: { requiredLength: options.minLength, actualLength: value.length } };
    }

    if (options?.maxLength && value.length > options.maxLength) {
      return { maxLength: { requiredLength: options.maxLength, actualLength: value.length } };
    }

    // --- Tipo: RUT ---
    if (options?.type === 'rut') {
      const rutRegex = /^[0-9]+-[0-9kK]{1}$/;
      if (!rutRegex.test(value)) {
        return { rut: 'Formato inválido. Ej: 12345678-9' };
      }
      const [num, dv] = value.split('-');
      let sum = 0, multiplier = 2;
      for (let i = num.length - 1; i >= 0; i--) {
        sum += Number(num[i]) * multiplier;
        multiplier = multiplier < 7 ? multiplier + 1 : 2;
      }
      const expectedDv = 11 - (sum % 11);
      const dvCalc = expectedDv === 11 ? '0' : expectedDv === 10 ? 'K' : expectedDv.toString();
      if (dv.toUpperCase() !== dvCalc) {
        return { rut: 'Dígito verificador inválido' };
      }
    }

    // --- Tipo: Teléfono ---
    if (options?.type === 'telefono') {
      const phoneRegex = /^\+569\d{8}$/;
      if (!phoneRegex.test(value)) {
        return { telefono: 'Formato inválido. Ej: +56966583540' };
      }
    }

    // --- Tipo: Texto ---
    if (options?.type === 'texto') {
      // const defaultPattern = options.pattern || /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s]+$/;
      const defaultPattern = options.pattern || /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s\/()+°#%,;.\:\-_"']+$/;
      if (!defaultPattern.test(value)) {
        return { pattern: 'Solo se permiten letras, números y caracteres especiales' };
      }
    }

    // --- Tipo: Dígitos ---
    if (options?.type === 'digitos') {
      const digitsRegex = /^[0-9]+$/;
      if (!digitsRegex.test(value)) {
        return { digitos: 'Solo se permiten números enteros' };
      }

      const num = Number(value);
      if (options.minValue !== undefined && num < options.minValue) {
        return { minValue: { requiredMin: options.minValue, actual: num } };
      }
      if (options.maxValue !== undefined && num > options.maxValue) {
        return { maxValue: { requiredMax: options.maxValue, actual: num } };
      }
    }

    // --- Tipo: Decimal ---
    if (options?.type === 'decimal') {
      const decimalRegex = /^[0-9]+([.,][0-9]+)?$/;
      if (!decimalRegex.test(value)) {
        return { decimal: 'Solo se permiten números decimales (punto o coma)' };
      }
    }

    // --- Tipo: Fecha ---
    if (options?.type === 'fecha') {
      const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
      if (!dateRegex.test(value)) {
        return { fecha: 'Formato inválido. Usa DD/MM/YYYY' };
      }

      const [day, month, year] = value.split('/').map(Number);
      const date = new Date(year, month - 1, day);
      if (
        date.getFullYear() !== year ||
        date.getMonth() + 1 !== month ||
        date.getDate() !== day
      ) {
        return { fecha: 'Fecha inválida' };
      }

      // Validación de rango de fechas (si están definidas)
      const parseDate = (str: string) => {
        const [d, m, y] = str.split('/').map(Number);
        return new Date(y, m - 1, d);
      };

      if (options.minDate) {
        const min = parseDate(options.minDate);
        if (date < min) {
          return { minDate: { requiredMinDate: options.minDate, actual: value } };
        }
      }

      if (options.maxDate) {
        const max = parseDate(options.maxDate);
        if (date > max) {
          return { maxDate: { requiredMaxDate: options.maxDate, actual: value } };
        }
      }
    }

    return null; // ✅ Sin errores
  };
}
