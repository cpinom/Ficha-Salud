import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DocenteService } from '../../../../core/services/docente.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detalle-ficha',
  templateUrl: './detalle-ficha.component.html',
  styleUrl: './detalle-ficha.component.scss'
})
export class DetalleFichaComponent implements OnInit {

  private router = inject(Router);
  private api = inject(DocenteService);
  private toastr = inject(ToastrService);

  @ViewChild('fichaDetalle') fichaDetalleComponent: any;

  ficha: any;
  paciente: any;
  data: any;
  estudiante: any;

  ngOnInit() {
    if (!this.data || !this.paciente) {
      this.router.navigate(['/docentes']);
      return;
    }
  }
  constructor() {
    const navigation = this.router.getCurrentNavigation();

    if (navigation?.extras.state) {
      const { ficha, paciente, data, estudiante } = navigation.extras.state;

      this.ficha = ficha;
      this.paciente = paciente;
      this.data = data;
      this.estudiante = estudiante;
      console.log('Datos recibidos en DetalleFichaComponent:', this.ficha, this.paciente, this.data, this.estudiante);
    }
  }
  async terminarRevision() {
    this.fichaDetalleComponent.form.markAsPristine();

    const comentarios = this.fichaDetalleComponent.ficha.grupos.map((grupo: any) => {
      return {
        id_grupo: grupo.id_grupo,
        comentarios: this.fichaDetalleComponent.form.get(`grupo_${grupo.id_grupo}`)?.value
      };
    });

    const params = {
      persNcorr: this.estudiante.persNcorr,
      fisaNcorr: this.estudiante.fisaNcorr,
      comentarios: comentarios
    };

    try {
      const response = await this.api.terminarRevisionficha<any>(params);

      if (response.success) {
        this.toastr.success('Revisión terminada con éxito');
        this.router.navigate(['/docentes']);
        return;
      }
      else {
        throw Error();
      }
    }
    catch (error) {
      this.toastr.error('Error al terminar la revisión de la ficha');
      console.error('Error al terminar la revisión de la ficha:', error);
    }
  }
  async descargarArchivo(fsclNcorr: any, fsvaNcorr: any) {
    try {
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
