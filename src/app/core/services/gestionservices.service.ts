import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { Observable } from 'rxjs';
import { AppGlobal } from '../../app.global';

@Injectable({
  providedIn: 'root',
})
export class GestionservicesService {
  constructor(private http: HttpClient) { }

  private global = inject(AppGlobal);
  private prefix = 'api/v1';

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

  getPeriodos(): Observable<any> {
    return this.http.get(`${this.global.baseUrl}/${this.prefix}/getperiodos`);
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

  getListaCursoEstudiante(): Observable<any> {
    return this.http.get(
      `${this.global.baseUrl}/${this.prefix}/getlistacursoestudiante`
    );
  }

  getTableroEstudiantes(seccion: number): Observable<any> {
    return this.http.get(
      `${this.global.baseUrl}/${this.prefix}/gettableroestudiantes/${seccion}`
    );
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
