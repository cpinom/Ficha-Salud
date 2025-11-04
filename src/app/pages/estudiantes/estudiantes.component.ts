import { Component, inject, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GestionservicesService } from '../../core/services/gestionservices.service';
import { debounceTime, lastValueFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { SortableHeaderDirective, SortEvent } from '../../core/directives/sortable-header.directive';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrl: './estudiantes.component.scss'
})
export class EstudiantesComponent implements OnInit {

  filtroForm!: FormGroup;
  cursos: any;
  data: any;

  page = 1;
  pageSize = 10;
  collectionSize = 0;
  sortColumn = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  @ViewChildren(SortableHeaderDirective) headers!: QueryList<SortableHeaderDirective>;

  private fb = inject(FormBuilder);
  private api = inject(GestionservicesService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

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
      const response = await this.api.getListaCursoEstudiante<any>();

      if (response.success) {
        this.cursos = response.data;

        if (this.cursos.length > 0) {
          this.filtroForm.get('curso')?.setValue(this.cursos[0].seccCcod);
        }
      }
    }
    catch (error) {
      console.error('Error cargando cursos de estudiantes', error);
    }
  }
  async cargarFichas() {
    try {
      const { start, limit } = this.getPaginationParams(this.page, this.pageSize);
      const seccCcod = this.filtroForm.get('curso')?.value;
      const searchTerm = this.filtroForm.get('filtro')?.value;
      const response = await this.api.getFichasEstudiante<any>(seccCcod, start, limit, this.sortColumn, this.sortDirection, searchTerm);

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
    await this.router.navigate(['/estudiantes/editar-ficha'], { state: { ficha } });
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
        sede: this.data[0].sede,
        seccion: this.data[0].seccCcod,
        nombreDocente: this.data[0].nombreDocente,
        cantidadfichascompletadas: this.data.filter((item: any) => item.efisCcod == 5).length
      };
    }

    return null;
  }

}
