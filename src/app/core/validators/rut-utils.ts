// utils/rut-utils.ts

/**
 * Valida un RUT chileno
 * @param rutCompleto RUT en formato string, puede incluir puntos y guion
 * @returns true si es válido, false si no
 */
export function validarRut(rutCompleto: string): boolean {
  if (!rutCompleto) return false;

  // Limpiar puntos y guion
  const rutLimpio = rutCompleto.replace(/\./g, '').replace(/-/g, '').toUpperCase();

  // Separar número y dígito verificador
  const rut = rutLimpio.slice(0, -1);
  const dv = rutLimpio.slice(-1);

  if (!/^\d+$/.test(rut)) return false;

  // Calcular dígito verificador
  let suma = 0;
  let multiplicador = 2;
  for (let i = rut.length - 1; i >= 0; i--) {
    suma += parseInt(rut[i], 10) * multiplicador;
    multiplicador = multiplicador < 7 ? multiplicador + 1 : 2;
  }

  const resto = 11 - (suma % 11);
  let dvEsperado = resto === 11 ? '0' : resto === 10 ? 'K' : resto.toString();

  return dv === dvEsperado;
}

/**
 * Separa el RUT en número y dígito verificador
 * @param rutCompleto RUT en formato string
 * @returns objeto con { rut, dv } o null si es inválido
 */
export function obtenerRutYDV(rutCompleto: string): { rut: string; dv: string } | null {
  if (!rutCompleto) return null;

  const rutLimpio = rutCompleto.replace(/\./g, '').replace(/-/g, '').toUpperCase();

  if (rutLimpio.length < 2) return null;

  const rut = rutLimpio.slice(0, -1);
  const dv = rutLimpio.slice(-1);

  return { rut, dv };
}
