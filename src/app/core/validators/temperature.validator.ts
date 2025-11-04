// temperature.validator.ts
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export type TemperatureUnit = 'C' | 'F';

export interface TemperatureValidatorOptions {
  min?: number;          // rango en la unidad indicada
  max?: number;
  unit?: TemperatureUnit; // 'C' o 'F' (default 'C')
  allowEmpty?: boolean;   // si true, null/'' es válido (deja el "required" a otro validador)
}

export function temperatureValidator(opts: TemperatureValidatorOptions = {}): ValidatorFn {
  const {
    min = -50,
    max = 60,
    unit = 'C',
    allowEmpty = true,
  } = opts;

  return (control: AbstractControl): ValidationErrors | null => {
    const raw = control.value;

    // Vacío
    if (raw === null || raw === undefined || raw === '') {
      return allowEmpty ? null : { temperatureRequired: true };
    }

    // Acepta coma o punto decimal
    const normalized = (typeof raw === 'string' ? raw.replace(',', '.') : raw) as string | number;

    const value = typeof normalized === 'number' ? normalized : Number(normalized);

    if (!Number.isFinite(value)) {
      return { temperatureFormat: { received: raw } };
    }

    // Rango según unidad
    const inRange = value >= min && value <= max;

    if (!inRange) {
      return {
        temperatureRange: {
          unit,
          actual: value,
          min,
          max,
        },
      };
    }

    return null;
  };
}
