import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { firstValueFrom, Observable } from 'rxjs';
import { AppGlobal } from '../../app.global';

@Injectable({
  providedIn: 'root',
})
export class GestionservicesService {
  constructor(private http: HttpClient) { }

  private global = inject(AppGlobal);
  private prefix = 'api/v1';

  get<T>(url: string) {
    return firstValueFrom(this.http.get<T>(`${this.global.baseUrl}/${this.prefix}/${url}`));
  }
  post<T>(url: string, params: any) {
    return firstValueFrom(this.http.post<T>(`${this.global.baseUrl}/${this.prefix}/${url}`, params));
  }

  
  
  
 
 
  
  
  
  

  getTableroDocente(periodo?: number): Observable<any> {
    return this.http.get(
      `${this.global.baseUrl}/${this.prefix}/gettablerodocente/${periodo}`
    );
  }

  getListEstudiante(seccion?: number): Observable<any> {
    return this.http.get(
      `${this.global.baseUrl}/${this.prefix}/getlistestudiante/${seccion}`
    );
  }

  getinfoseccion(seccion?: number): Observable<any> {
    return this.http.get(
      `${this.global.baseUrl}/${this.prefix}/getinfoseccion/${seccion}`
    );
  }

  asignarfichas(jsonString: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    var url = `${this.global.baseUrl}/${this.prefix}/asignarfichas`;
    //return this.http.post(`${this.apiUrl}/v1/asignarfichas`, jsonString, { headers });
    return this.http.post(url, { jsonficha: jsonString }, { headers });
  }

  getListFichasEstudiante(
    persNcorr?: number,
    seccion?: number
  ): Observable<any> {
    return this.http.get(
      `${this.global.baseUrl}/${this.prefix}/getlistfichasestudiante/${persNcorr}/${seccion}`
    );
  }

  getFichaEstudianteRespuesta(
    fisaNcorr: number,
    persNcorr: number,
    seccCcod: number
  ): Observable<any> {
    return this.http.get(
      `${this.global.baseUrl}/${this.prefix}/getfichastudentrespuesta/${fisaNcorr}/${persNcorr}/${seccCcod}`
    );
  }

  

  getprevision(): Observable<any> {
    return this.http.get(`${this.global.baseUrl}/${this.prefix}/getprevision`);
  }

  getEstudiantesTotales(periodo: number): Observable<any> {
    return this.http.get(
      `${this.global.baseUrl}/${this.prefix}/getestudiantestotales/${periodo}`
    );
  }

  getTotalAtendidos(periodo: number): Observable<any> {
    return this.http.get(
      `${this.global.baseUrl}/${this.prefix}/gettotalatendidos/${periodo}`
    );
  }

  getTareasPendientes(periodo: number): Observable<any> {
    return this.http.get(
      `${this.global.baseUrl}/${this.prefix}/gettareaspendientes/${periodo}`
    );
  }

  getAsignaturasInscritas(periodo: number): Observable<any> {
    return this.http.get(
      `${this.global.baseUrl}/${this.prefix}/getasignaturasinscritas/${periodo}`
    );
  }

  getFichasRevisadasCompletadas(secciones: number[]): Observable<any> {
    const joinedSecciones = secciones.join(',');
    const url = `${this.global.baseUrl}/${this.prefix}/getfichasrevisadascompletadas?secciones=${joinedSecciones}`;
    console.log('URL construida:', url);
    return this.http.get(url);
  }

  // SERVICE ESTUDIANTES

  getCursosEstudiante<T>() {
    return this.get<T>('estudiantes/cursos');
  }

  getTableroEstudiantes<T>(seccion: any) {
    return this.get<T>(`gettableroestudiantes?seccion=${seccion}`);
  }

  getFichasEstudiante<T>(seccion: any, inicio: any, limite: any, orden: any, direccion: any, filtro: any) {
    return this.get<T>(`estudiantes/fichas?seccCcod=${seccion}&inicio=${inicio}&limite=${limite}&orden=${orden}&direccion=${direccion}&filtro=${filtro}`);
  }

  getDetalleFicha<T>(asigCcod: any, persNcorr: any, fisaNcorr: any) {
    return this.get<T>(`estudiantes/detalle-ficha?asigCcod=${asigCcod}&persNcorr=${persNcorr}&fisaNcorr=${fisaNcorr}`);
  }

  getEditFichaEstudiante(persNcorr: number, seccCcod: number): Observable<any> {
    return this.http.get(
      `${this.global.baseUrl}/${this.prefix}/geteditfichastudent/${persNcorr}/${seccCcod}`
    );
  }

  actualizarFichaEstudiante(data: FormData) {
    console.log('Datos que se van a enviar al backend (FormData):');
    data.forEach((value, key) => {
      console.log(key, value); // Aquí puedes ver lo que se está enviando
    });

    return this.http.post(`${this.global.baseUrl}/${this.prefix}/updatefichastudent`, data);
  }
}
