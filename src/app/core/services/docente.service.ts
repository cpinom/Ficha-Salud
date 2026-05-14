import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class DocenteService extends HttpService {

  constructor(http: HttpClient) {
    super(http);
  }

  getPeriodos<T>() {
    return this.get<T>(`periodos`);
  }
  getTableroDocentes<T>(periCcod: any) {
    return this.get<T>(`docentes/tablero?periCcod=${periCcod}`);
  }
  getFichaAsignatura<T>(asigCcod: any) {
    return this.get<T>(`docentes/ficha-asignatura?asigCcod=${asigCcod}`);
  }
  getEstudiantes<T>(seccCcod: any) {
    return this.get<T>(`docentes/estudiantes?seccCcod=${seccCcod}`);
  }
  getDetalleFichaAsignatura<T>(asigCcod: any, persNcorr: any, fisaNcorr: any) {
    return this.get<T>(`docentes/detalle-ficha-asignatura?asigCcod=${asigCcod}&persNcorr=${persNcorr}&fisaNcorr=${fisaNcorr}`);
  }
  getFichasEstudiantes<T>(persNcorr: any, seccCcod: any) {
    return this.get<T>(`docentes/fichas-estudiantes?persNcorr=${persNcorr}&seccCcod=${seccCcod}`);
  }
  terminarRevisionficha<T>(data: any) {
    return this.post<T>(`docentes/terminar-revision-ficha`, data);
  }
  crearFichaBorrador<T>(data: any) {
    return this.post<T>(`docentes/crear-ficha-borrador`, data);
  }
  guardarFichaPaciente<T>(data: any) {
    return this.post<T>(`docentes/guardar-ficha-paciente`, data);
  }
  guardarCamposFicha<T>(data: any) {
    return this.post<T>(`docentes/guardar-campos-valores`, data);
  }
  asignarFicha<T>(data: any) {
    return this.post<T>(`docentes/asignar-ficha`, data);
  }
  buscarPaciente<T>(rut: string) {
    return this.get<T>(`docentes/buscar-paciente?rut=${rut}`);
  }

}