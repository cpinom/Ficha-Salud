import { Component, OnInit } from '@angular/core';
import { GestionservicesService } from '../../core/services/gestionservices.service';
import { Router } from '@angular/router';
import { DocenteService } from '../../core/services/docente.service';

interface TableroDocente {
  SECC_CCOD: number;
  FICHAS_REVISADAS: number;
  FICHAS_COMPLETADAS: number;
  ASIG_TDESC: string;
  CANT_ALUMNOS: number;
  SEDE_TDESC: string;
  CARR_TDESC: string;
  CURS_CCOD: string;
  CURS_TDESC: string;
  SECC_TDESC: string;
}

@Component({
  selector: 'app-tablerodocente',
  templateUrl: './tablerodocente.component.html',
  styleUrl: './tablerodocente.component.scss',
})
export class TablerodocenteComponent implements OnInit {
  //tablerodocente: any;
  tablerodocente: TableroDocente[] = [];
  listestudiante: any;
  periodos: any;
  selectedPeriodoId: any;
  totalesEstudiante: number = 0;
  totalatendidos: number = 0;
  tareaspendientes: number = 0;
  asignaturasinscritas: number = 0;
  prevision: number = 0;
  ficharevisadascompletadas: any[] = [];
  constructor(
    private service: GestionservicesService,
    private api : DocenteService,
    private router: Router
  ) {}

  ngOnInit(): void {
   // this.getTableroDocente(240);
    this.getPeriodos();

  }

 
  getTableroDocente(periodo: number): void {
    this.service.getTableroDocente(periodo).subscribe({
      next: (data) => {
        console.log('Table docente recibido:', data);
        this.tablerodocente = data;
        const secciones = this.tablerodocente.map(d => d.SECC_CCOD);
      this.getFichasRevisadasCompletadas(secciones);
      },
      error: (err) => {
        console.error('Error cargando Tablero docente', err);
      },
    });
  }

  irListEstudiante(secciones: number): void {
    this.router.navigate(['/listacursoseccion', secciones]);
  }

getPeriodos(): void {

  this.api.getPeriodos<any>().then((response)=> {
    this.periodos = response.data;
  });

  // this.service.getPeriodos().subscribe({
  //   next: (data) => {
  //     console.log('Periodos recibidos:', data);
  //     this.periodos = data;

  //     const storedPeriodo = localStorage.getItem('periodoSeleccionado');
      
  //     if (storedPeriodo) {
  //       this.selectedPeriodoId = parseInt(storedPeriodo, 10);
  //       this.getTableroDocente(this.selectedPeriodoId); // carga inicial
  //       return;
  //     }

  //     // Selecciona automáticamente el primer período si no hay uno seleccionado
  //     if (this.periodos?.length) {
  //       this.selectedPeriodoId = this.periodos[0].PERI_CCOD; // o el que quieras
  //       this.getTableroDocente(this.selectedPeriodoId); // carga inicial
  //     }
  //   },
  //   error: (err) => {
  //     console.error('Error cargando periodos', err);
  //   },
  // });
}

 verfichaasignar(tdocente: any): void {
  const seccionId = tdocente.SECC_CCOD;

  if (!tdocente.ASIG_TDESC) {
    console.warn('ASIG_NOMBRE no está definido en el objeto:', tdocente);
    alert('No se puede determinar la asignatura.');
    return;
  }

  const nombreAsignatura = tdocente.ASIG_TDESC.toLowerCase();

  if (nombreAsignatura.includes('enfermería básica')) {
    this.router.navigate(['/tbfichasasignadas/fichaenfermeriabasica', seccionId]);
  } else if (nombreAsignatura.includes('salud digital')) {
    this.router.navigate(['/tbfichasasignadas/saluddigital', seccionId]);
  } else if (nombreAsignatura.includes('médico quirúrgico')) {
    this.router.navigate(['/tbfichasasignadas/medicoquirurgico', seccionId]);
  } else if(nombreAsignatura.includes('practica profesional')){
    this.router.navigate(['/tbfichasasignadas/practicaprofesional', seccionId]);
  } else {
    alert('No se reconoce la asignatura para asignar ficha.');
  }
}

onPeriodoChange(periodoId: number): void {
  this.selectedPeriodoId = periodoId;
  this.getTableroDocente(this.selectedPeriodoId);
  this.getEstudiantesTotales(this.selectedPeriodoId);
  this.getTotalAtendidos(this.selectedPeriodoId);
  this.getTareasPendientes(this.selectedPeriodoId);
  this.getAsignaturasInscritas(this.selectedPeriodoId);
  localStorage.setItem('periodoSeleccionado', this.selectedPeriodoId.toString());
}


getEstudiantesTotales(periodoId: number): void {
  this.service.getEstudiantesTotales(periodoId).subscribe({
    next: (data) => {
      console.log('Table estudiantes recibido:', data);
      this.totalesEstudiante = data[0].TOTAL_ESTUDIANTE;
    },
    error: (err) => {
      console.error('Error cargando Tablero estudiantes', err);
    },
  });
}

getTotalAtendidos(periodoId: number): void {
  this.service.getTotalAtendidos(periodoId).subscribe({
    next: (data) => {
      console.log('Total atendidos recibido:', data);
      this.totalatendidos = data[0].CANT_ATENDIDO;
    },
    error: (err) => {
      console.error('Error cargando total atendidos', err);
    },
  });
}

getTareasPendientes(periodoId: number): void {
  this.service.getTareasPendientes(periodoId).subscribe({
    next: (data) => {
      console.log('Tareas pendientes recibidas:', data);
      this.tareaspendientes = data[0].CANT_PENDIENTE;
    },
    error: (err) => {
      console.error('Error cargando tareas pendientes', err);
    },
  });
}
getAsignaturasInscritas(periodoId: number): void {
  this.service.getAsignaturasInscritas(periodoId).subscribe({
    next: (data) => {
      console.log('Asignaturas inscritas recibidas:', data);
      this.asignaturasinscritas = data[0].CANT_ASIGNATURAS;
    },
    error: (err) => {
      console.error('Error cargando asignaturas inscritas', err);
    },
  });
}

getFichasRevisadasCompletadas(secciones: number[]): void {
  this.service.getFichasRevisadasCompletadas(secciones).subscribe({
    next: (data) => {
      console.log('Fichas revisadas y completadas recibidas:', data);
      this.ficharevisadascompletadas = data;
    },
    error: (err) => {
      console.error('Error cargando fichas revisadas y completadas', err);
    },
  });
}

getFichaPorSeccion(seccion: number): any {
  if (Array.isArray(this.ficharevisadascompletadas)) {
    return this.ficharevisadascompletadas.find((f: any) => f.SECC_CCOD === seccion);
  }
  return null;
}

}