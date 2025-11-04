import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Función auxiliar
function regexValidator(regex: RegExp, field: string, min?: number, max?: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = String(control.value ?? '').trim();

    if (value === '') return null; // permitir vacío (usa required aparte)

    if (!regex.test(value)) {
      return { [`${field}Format`]: { received: value } };
    }

    const num = parseFloat(value.replace(',', '.'));
    if (!isFinite(num)) return { [`${field}Format`]: { received: value } };

    if (min !== undefined && num < min) return { [`${field}Min`]: { min, actual: num } };
    if (max !== undefined && num > max) return { [`${field}Max`]: { max, actual: num } };

    return null;
  };
}

// ⚖️ Peso corporal en kg (20 – 300 kg)
export const pesoValidator = regexValidator(/^\d{1,3}([.,]\d{1,2})?$/, 'peso', 20, 300);

// 📏 Talla en cm (80 – 250 cm)
export const tallaValidator = regexValidator(/^\d{2,3}([.,]\d{1,1})?$/, 'talla', 80, 250);

// 🧮 IMC (5 – 80)
export const imcValidator = regexValidator(/^\d{1,2}([.,]\d{1,2})?$/, 'imc', 5, 80);

// 🫀 Cintura en cm (30 – 200)
export const cinturaValidator = regexValidator(/^\d{2,3}([.,]\d{1,1})?$/, 'cintura', 30, 200);

// 💉 Presión arterial (formato 120/80)
export const presionValidator: ValidatorFn = (control) => {
  const value = String(control.value ?? '').trim();
  if (value === '') return null;
  const regex = /^(\d{2,3})\/(\d{2,3})$/;
  const match = value.match(regex);
  if (!match) return { presionFormat: { received: value } };

  const sist = Number(match[1]);
  const diast = Number(match[2]);
  if (sist < 70 || sist > 250 || diast < 40 || diast > 150)
    return { presionRange: { sist, diast } };
  return null;
};

// 🌬️ Frecuencia respiratoria (5 – 60 rpm)
export const frecuenciaRespValidator = regexValidator(/^\d{1,2}$/, 'frecuenciaResp', 5, 60);

// 🫁 Saturación O₂ % (70 – 100 %)
export const saturacionO2Validator = regexValidator(/^\d{2,3}$/, 'saturacionO2', 70, 100);

// 🌡️ Temperatura axilar °C (33 – 39)
export const temperaturaAxilarValidator = regexValidator(/^\d{2}([.,]\d)?$/, 'tempAxilar', 33, 39);

// 🌡️ Temperatura rectal °C (34 – 40)
export const temperaturaRectalValidator = regexValidator(/^\d{2}([.,]\d)?$/, 'tempRectal', 34, 40);
