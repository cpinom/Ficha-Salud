import { Component, inject, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { Router } from '@angular/router';
import { SortableHeaderDirective, SortEvent } from '../../core/directives/sortable-header.directive';
import { ToastrService } from 'ngx-toastr';
import { AlumnoService } from '../../core/services/alumno.service';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html'
})
export class EstudiantesComponent implements OnInit {

  filtroForm!: FormGroup;
  cursos: any;
  mostrarError = false;
  data: any;
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  sortColumn = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  @ViewChildren(SortableHeaderDirective) headers!: QueryList<SortableHeaderDirective>;

  private fb = inject(FormBuilder);
  private api = inject(AlumnoService);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  constructor() {
    this.filtroForm = this.fb.group({
      curso: [''],
      filtro: [''],
      pageSize: [10]
    });

    this.filtroForm.get('curso')?.valueChanges.subscribe(value => {
      this.cargarFichas();
    });

    this.filtroForm.get('pageSize')?.valueChanges.subscribe(value => {
      this.pageSize = value;
      this.cargarFichas();
    });

    this.filtroForm.get('filtro')?.valueChanges.pipe(debounceTime(600)).subscribe(value => {
      this.cargarFichas();
    });
  }
  ngOnInit() {
    this.cargar();
  }
  async cargar() {
    try {
      const response = await this.api.getCursos<any>();

      if (response.success) {
        this.cursos = response.data;

        if (this.cursos.length > 0) {
          this.filtroForm.get('curso')?.setValue(this.cursos[0].seccCcod);
        }
      }
      else {
        throw Error();
      }
    }
    catch (error) {
      this.toastr.error('Error al cargar los cursos de estudiantes.');
      this.mostrarError = true;
    }
  }
  async cargarFichas() {
    try {
      const { start, limit } = this.getPaginationParams(this.page, this.pageSize);
      const seccCcod = this.filtroForm.get('curso')?.value;
      const searchTerm = this.filtroForm.get('filtro')?.value;
      const response = await this.api.getFichas<any>(seccCcod, start, limit, this.sortColumn, this.sortDirection, searchTerm);

      if (response.success) {
        this.data = response.data;
        this.collectionSize = response.total;
      }
    }
    catch (error) {
      console.error('Error cargando curso de estudiantes', error);
    }
  }
  async onSort(event: SortEvent) {
    const { column, direction } = event;

    this.page = 1;
    this.sortColumn = column;
    this.sortDirection = direction;

    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.clear();
      }
    });

    await this.cargarFichas();
  }
  async editarFicha(ficha: any) {
    try {
      const { asigCcod, persNcorr, fisaNcorr, fsclNcorr } = ficha;
      const response = await this.api.getDetalleFicha<any>(asigCcod, persNcorr, fisaNcorr, 1);

      if (response.success) {
        const ficha = { ...response.data, fsclNcorr };
        const paciente = response.paciente;
        const seccion = { ...this.seccion };
        await this.router.navigate(['/estudiantes/editar-ficha'], { state: { ficha, paciente, seccion } });
      }
      else {
        throw Error();
      }
    }
    catch (error) {
      this.toastr.error('Error al cargar los detalles de la ficha.');
    }
  }
  async detalleFicha(ficha: any) {
    try {
      const { asigCcod, persNcorr, fisaNcorr, fsclNcorr } = ficha;
      const response = await this.api.getDetalleFicha<any>(asigCcod, persNcorr, fisaNcorr, 0);

      if (response.success) {
        const ficha = { ...response.data, fsclNcorr };
        const paciente = response.paciente;
        const seccion = { ...this.seccion };
        await this.router.navigate(['/estudiantes/detalle-ficha'], { state: { ficha, paciente, seccion } });
      }
      else {
        throw Error();
      }
    }
    catch (error) {
      this.toastr.error('Error al cargar los detalles de la ficha.');
    }
  }
  getPaginationParams(page: number, pageSize: number): { start: number, limit: number } {
    const start = (page - 1) * pageSize;
    const limit = pageSize;

    return { start, limit };
  }
  get seccion() {
    if (this.data && this.data.length > 0) {
      return {
        asignatura: this.data[0].asignatura,
        asigCcod: this.data[0].asigCcod,
        sede: this.data[0].sede,
        seccion: this.data[0].seccTdesc,
        nombreDocente: this.data[0].nombreDocente,
        cantidadfichascompletadas: this.data.filter((item: any) => item.efisCcod == 5).length
      };
    }

    return null;
  }

}
