import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

interface Notificacion {
  tipo: 'success' | 'error' | 'warning' | 'info';
  mensaje: string;
  titulo?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AlertserviceService {

   constructor(private toastr: ToastrService) { }

  mostrar(tipo: string, mensaje: string, titulo: string = '') {
      const opciones = {
        toastClass: 'ngx-toastr no-icon-toast'
      };
    switch (tipo) {
      case 'success':
        this.toastr.success(mensaje, titulo, opciones);
        break;
      case 'error':
        this.toastr.error(mensaje, titulo, opciones);
        break;
      case 'warning':
        this.toastr.warning(mensaje, titulo, opciones);
        break;
      case 'info':
        this.toastr.info(mensaje, titulo, opciones);
        break;
      default:
        console.warn(`Tipo de notificación desconocido: ${tipo}`);
    }
  }
}
