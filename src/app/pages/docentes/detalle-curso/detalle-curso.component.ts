import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GestionservicesService } from '../../../core/services/gestionservices.service';

@Component({
  selector: 'app-detalle-curso',
  templateUrl: './detalle-curso.component.html',
  styleUrl: './detalle-curso.component.scss'
})
export class DetalleCursoComponent implements OnInit {

  private router = inject(Router);
  private api = inject(GestionservicesService);

  data: any;
  estudiantes: any;

  constructor() {
    const navigation = this.router.getCurrentNavigation();

    if (navigation?.extras.state) {
      this.data = navigation.extras.state['data'];
      console.log('Datos recibidos en DetalleCursoComponent:', this.data);
    }
  }
  async ngOnInit() {
    if (!this.data) {
      await this.router.navigate(['/docentes']);
      return
    }

    await this.cargar();
  }
  async cargar() {
    const seccCcod = this.data.seccCcod;

    try {
      const response = await this.api.getEstudiantes<any>(seccCcod);

      if (response.success) {
        this.estudiantes = response.data;
      }
    }
    catch (error) {
      console.error('Error al cargar estudiantes', error);
    }

  }
  async fichaEstudiante(estudiante: any) {
    await this.router.navigate(['/docentes/ficha-estudiante'], { state: { data: { estudiante, curso: this.data } } });
  }

}
