import { Component } from '@angular/core';
import { GestionservicesService } from '../../../core/services/gestionservices.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tableroestudiante',
  templateUrl: './tableroestudiante.component.html',
  styleUrls: ['./tableroestudiante.component.scss'],
})
export class TableroestudianteComponent {
  listacursos: any;
  selectedCursoId: number = 0;
  tableroestudiante: any[] = [];

  sedeDesc!: string;
  nombredocente!: string;
  cantidadfichascompletadas!: number;
  seccion!: number;

  mostrarListaEstudiantes: boolean = true;
  mostrarDetalleEstudiante: boolean = false;
  listestudianteDetalle: any[] = [];

  constructor(
    private service: GestionservicesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getListaCursoEstudiante();
  }

  getListaCursoEstudiante(): void {
    this.service.getListaCursoEstudiante().subscribe({
      next: (data) => {
        console.log('Cursos o Fichas recibidos:', data);
        this.listacursos = data;

        if (this.listacursos.length > 0) {
          this.selectedCursoId = this.listacursos[0].SECC_CCOD;
          this.getTableroEstudiantes(this.selectedCursoId);
        }
      },
      error: (err) => {
        console.error('Error cargando Lista de cursos estudiantes', err);
      },
    });
  }

  onCursosChange(cursoId: number): void {
    this.selectedCursoId = cursoId;
    //alert(this.selectedCursoId);
    this.getTableroEstudiantes(this.selectedCursoId);
  }


  getTableroEstudiantes(seccion: number): void {
    this.service.getTableroEstudiantes(seccion).subscribe({
      next: (data) => {
        console.log('Table Estudiantes recibido:', data);
        this.tableroestudiante = data;

        if (data.length > 0) {
          const infotablero = data[0];
          this.sedeDesc = infotablero.SEDE_TDESC;
          this.nombredocente = infotablero.DOCENTE;
          this.cantidadfichascompletadas = 0;
          this.seccion = infotablero.SECC_CCOD;
        }
      },
      error: (err) => {
        console.error('Error cargando Tablero docente', err);
      },
    });
  }

  verDetalleEstudiante(persNcorr: number, seccCcod: number): void {
    this.router.navigate(['tbfichaseditestudiante/fichaenfermeriabasica'], { state: { id: persNcorr, id2: seccCcod } });
    // this.service.getListFichasEstudiante(persNcorr, seccCcod).subscribe({
    //   next: (detalle) => {
    //     console.log('Detalle Estudiante recibido:', detalle);
    //     // puedes abrir un modal o redirigir a una vista
    //     this.listestudianteDetalle = detalle;
    //     //this.mostrarListaEstudiantes = false;
    //     //this.mostrarDetalleEstudiante = true;
    //   },
    //   error: (err) => {
    //     console.error('Error obteniendo detalle del estudiante', err);
    //   },
    // });
  }


}
