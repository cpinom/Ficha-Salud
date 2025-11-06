import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GestionservicesService } from '../../../core/services/gestionservices.service';
import { DocenteService } from '../../../core/services/docente.service';

@Component({
  selector: 'app-ficha-estudiante',
  templateUrl: './ficha-estudiante.component.html',
  styleUrl: './ficha-estudiante.component.scss'
})
export class FichaEstudianteComponent implements OnInit {

  private router = inject(Router);
  private api = inject(DocenteService);

  data: any;
  estudiante: any;
  fichas: any;

  constructor() {
    const navigation = this.router.getCurrentNavigation();

    if (navigation?.extras.state) {
      const { curso, estudiante } = navigation.extras.state['data'];

      this.data = curso;
      this.estudiante = estudiante;
      console.log('Datos recibidos en FichaEstudianteComponent:', this.data, this.estudiante);
    }
  }
  ngOnInit(): void {
    if (!this.data || !this.estudiante) {
      this.router.navigate(['/docentes']);
      return;
    }

    this.cargar();
  }
  async cargar() {

    const persNcorr = this.estudiante.persNcorr;
    const seccCcod = this.data.seccCcod;
    const response = await this.api.getFichasEstudiantes<any>(persNcorr, seccCcod);

    if (response.success) {
      this.fichas = response.data;
    }

  }
  async detalleFicha(item: any) {
    try {
      const response = await this.api.getDetalleFichaAsignatura<any>(item.asigCcod, item.persNcorr, item.fisaNcorr);

      if (response.success) {
        const { data, paciente } = response;
        await this.router.navigate(['/docentes/ficha-estudiante/detalle-ficha'], { state: { ficha: data, paciente, data: this.data, estudiante: { ...this.estudiante, fisaNcorr: item.fisaNcorr } } });
      }
    }
    catch (error) {
      console.error('Error al obtener detalles de la ficha:', error);
    }
  }
  async volverTap(e: any) {
    e.preventDefault();

    await this.router.navigate(['/docentes/detalle-curso'], {
      state: { data: this.data }
    });
  }

}
