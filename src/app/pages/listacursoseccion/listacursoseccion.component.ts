import { Component } from '@angular/core';
import { GestionservicesService } from '../../core/services/gestionservices.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-listacursoseccion',
  templateUrl: './listacursoseccion.component.html',
  styleUrl: './listacursoseccion.component.scss',
})
export class ListacursoseccionComponent {
  constructor(
    private service: GestionservicesService,
    private router: ActivatedRoute,
    private route: Router
  ) {}

  sedeDesc!: string;
  planDesc!: string;
  cantidadAlumnos!: number;
  listestudiante: any[] = [];

  mostrarListaEstudiantes: boolean = true;
  mostrarDetalleEstudiante: boolean = false;
  listestudianteDetalle: any[] = [];
  ficharevisadascompletadas: any[] = [];

  ngOnInit(): void {
    const secciones = Number(this.router.snapshot.paramMap.get('secciones'));
    console.log('Parámetro recibido:', secciones);
    this.getListEstudiante(secciones);

    this.getFichasRevisadasCompletadas(secciones);
  }

  getListEstudiante(secciones: number): void {
    this.service.getListEstudiante(secciones).subscribe({
      next: (data) => {
        console.log('lista estudiante:', data);
        this.listestudiante = data;

        if (data.length > 0) {
          const estudiante = data[0];
          this.sedeDesc = estudiante.SEDE_TDESC;
          this.planDesc = estudiante.PLAN_TDESC;
          this.cantidadAlumnos = estudiante.CANT_ALUMNOS;
        }
      },
      error: (err) => {
        console.error('Error cargando lista estudiante', err);
      },
    });
  }

  asignarNuevaFicha(): void {
    alert();
  }

  verDetalleEstudiante(persNcorr: number, seccCcod: number): void {
    this.service.getListFichasEstudiante(persNcorr, seccCcod).subscribe({
      next: (detalle) => {
        console.log('Detalle recibido:', detalle);
        // puedes abrir un modal o redirigir a una vista
        this.listestudianteDetalle = detalle;
        this.mostrarListaEstudiantes = false;
        this.mostrarDetalleEstudiante = true;
      },
      error: (err) => {
        console.error('Error obteniendo detalle del estudiante', err);
      },
    });
  }

  verFichaNo(fisaNcorr: number, persNcorr: number, seccCcod: number): void {
   this.route.navigateByUrl('/verfichaestudianteresp', {
      state: { id: fisaNcorr, id2: persNcorr, id3: seccCcod },
    });
  }

getFichasRevisadasCompletadas(secciones: number): void {
  this.service.getFichasRevisadasCompletadas([secciones]).subscribe({
    next: (data) => {
      console.log('Fichas revisadas y completadas recibidas:', data);
      this.ficharevisadascompletadas = data[0].FICHAS_SINREVISAR;
    },
    error: (err) => {
      console.error('Error cargando fichas revisadas y completadas', err);
    },
  });
}


}
