import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class AlumnoService extends HttpService {

  constructor(http: HttpClient) {
    super(http);
  }

  getCursos<T>() {
    return this.get<T>('estudiantes/cursos');
  }
  getFichas<T>(seccion: any, inicio: any, limite: any, orden: any, direccion: any, filtro: any) {
    return this.get<T>(`estudiantes/fichas?seccCcod=${seccion}&inicio=${inicio}&limite=${limite}&orden=${orden}&direccion=${direccion}&filtro=${filtro}`);
  }
  getDetalleFicha<T>(asigCcod: any, persNcorr: any, fisaNcorr: any, modo: any) {
    return this.get<T>(`estudiantes/detalle-ficha?asigCcod=${asigCcod}&persNcorr=${persNcorr}&fisaNcorr=${fisaNcorr}&modo=${modo}`);
  }
  guardarFicha<T>(data: any) {
    return this.post<T>('estudiantes/guardar-ficha', data);
  }


}