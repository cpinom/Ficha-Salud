import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AppGlobal } from '../../app.global';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) { }

  private global = inject(AppGlobal);
  private prefix = 'api/v1';

  get<T>(url: string) {
    return firstValueFrom(this.http.get<T>(`${this.global.baseUrl}/${this.prefix}/${url}`));
  }
  post<T>(url: string, params: any) {
    return firstValueFrom(this.http.post<T>(`${this.global.baseUrl}/${this.prefix}/${url}`, params));
  }

  guardarPreferencias<T>(data: any) {
    return this.post<T>(`preferencias`, data);
  }
  descargarArchivo(fsclNcorr: any, fsvaNcorr: any) {
    return this.get<any>(`descargar-archivo?fsclNcorr=${fsclNcorr}&fsvaNcorr=${fsvaNcorr}`);
  }
}