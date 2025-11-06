import { Component, inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../../core/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detalle-ficha',
  templateUrl: './detalle-ficha.component.html',
  styleUrl: './detalle-ficha.component.scss'
})
export class DetalleFichaComponent implements OnInit {

  private router = inject(Router);
  private api = inject(HttpService);
  private toastr = inject(ToastrService);

  paciente: any;
  ficha: any;
  seccion: any;
  fichaForm!: FormGroup;

  constructor() {
    const navigation = this.router.getCurrentNavigation();

    if (navigation?.extras.state) {
      this.paciente = navigation.extras.state['paciente'];
      this.ficha = navigation.extras.state['ficha'];
      this.seccion = navigation.extras.state['seccion'];
      console.log(this.paciente);
    }
  }
  ngOnInit() {
    if (!this.paciente || !this.ficha) {
      this.router.navigate(['/estudiantes']);
      return;
    }
  }
  async descargarArchivo(data: any) {
    try {
      const fsclNcorr = data.fsclNcorr;
      const fsvaNcorr = data.id;
      const response = await this.api.descargarArchivo(fsclNcorr, fsvaNcorr);

      if (response.success) {
        const { data } = response;
        const linkSource = `data:${data.contentType};base64,${data.base64}`;
        const downloadLink = document.createElement('a');
        downloadLink.href = linkSource;
        downloadLink.download = data.name;
        downloadLink.click();
      }
      else {
        throw Error();
      }
    }
    catch (error) {
      this.toastr.error('Error al descargar el archivo');
    }
  }

}
