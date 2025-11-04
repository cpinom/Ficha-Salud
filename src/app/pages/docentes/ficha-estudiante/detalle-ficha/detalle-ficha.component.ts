import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GestionservicesService } from '../../../../core/services/gestionservices.service';

@Component({
  selector: 'app-detalle-ficha',
  templateUrl: './detalle-ficha.component.html',
  styleUrl: './detalle-ficha.component.scss'
})
export class DetalleFichaComponent implements OnInit {

  private router = inject(Router);
  private api = inject(GestionservicesService);

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

    const response = await this.api.terminarRevisionficha<any>(params);

    debugger
  }

}
