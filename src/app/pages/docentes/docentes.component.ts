import { Component, inject, OnInit } from '@angular/core';
import { GestionservicesService } from '../../core/services/gestionservices.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StorageService } from '../../core/services/storage.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DocenteService } from '../../core/services/docente.service';

@Component({
  selector: 'app-docentes',
  templateUrl: './docentes.component.html',
  styleUrl: './docentes.component.scss'
})
export class DocentesComponent implements OnInit {

  private api = inject(DocenteService);
  private fb = inject(FormBuilder);
  private storage = inject(StorageService);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  form!: FormGroup;
  periodos: any;
  data: any;

  constructor() {
    this.form = this.fb.group({
      periodo: ['']
    });

    this.periodo?.valueChanges.subscribe(value => {
      this.cargarTablero();
      this.storage.set('periodoDocente', value);
    });
  }
  ngOnInit(): void {
    this.cargar();
  }
  async cargar() {
    try {
      const response = await this.api.getPeriodos<any>();

      if (response.success) {
        this.periodos = response.data;

        const periodoGuardado = this.storage.get('periodoDocente');

        if (periodoGuardado) {
          this.periodo?.setValue(periodoGuardado);
        }
        else if (this.periodos.length > 0) {
          const primerPeriodo = this.periodos[0].periCcod;
          this.periodo?.setValue(primerPeriodo);
        }

      }
      else {
        throw new Error('Error al cargar periodos');
      }
    }
    catch (error) {
      this.toastr.error('No se pudieron cargar los periodos');
    }
  }
  async cargarTablero() {
    try {
      const periCcod = this.periodo?.value;
      const response = await this.api.getTableroDocentes<any>(periCcod);

      if (response.success) {
        this.data = response.data;
      }
      else {
        throw new Error('Error al cargar tablero docentes');
      }
    }
    catch (error) {
      this.toastr.error('No se pudo cargar el tablero del periodo seleccionado.');
    }
  }
  async detalleCurso(data: any) {
    await this.router.navigate(['/docentes/detalle-curso'], { state: { data } });
  }
  async asignarFicha(data: any) {
    try {
      const response = await this.api.getFichaAsignatura<any>(data.asigCcod);
      // const response = await this.api.getFichaAsignatura<any>('TEEB01'); // ENFERMERIA 1
      // const response = await this.api.getFichaAsignatura<any>('TESD01'); // SALUD DIGITAL 2
      // const response = await this.api.getFichaAsignatura<any>('TEMQ01'); // MEDICO QUIRURGICO 3
      // const response = await this.api.getFichaAsignatura<any>('INPF01'); // PRACTICA PROFESIONAL 4

      if (response.success) {
        const ficha = response.data;
        const previsiones = response.previsiones;
        await this.router.navigate(['/docentes/asignar-ficha'], { state: { data, ficha, previsiones } });
      }
      else if (response.message) {
        this.toastr.error(response.message);
      }
      else {
        throw Error();
      }
    }
    catch (error) {
      this.toastr.error('No se pudo cargar la ficha de asignatura.');
    }
  }
  get periodo() {
    return this.form.get('periodo');
  }

}
