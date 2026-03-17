import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { multiValidator } from '../../../core/validators/multiValidator';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { obtenerRutYDV, validarRut } from '../../../core/validators/rut-utils';
import { debounceTime } from 'rxjs';
import { DocenteService } from '../../../core/services/docente.service';
import { AlertService } from '../../../core/services/alert.service';

@Component({
  selector: 'app-asignar-ficha',
  templateUrl: './asignar-ficha.component.html',
  styleUrl: './asignar-ficha.component.scss'
})
export class AsignarFichaComponent implements OnInit {

  @ViewChild('fichaDinamica') fichaDinamicaComponent: any;

  private router = inject(Router);
  private fb = inject(FormBuilder);
  private toastr = inject(ToastrService);
  private api = inject(DocenteService);
  private alert = inject(AlertService);

  data: any;
  ficha: any;
  previsiones: any;
  pacienteForm!: FormGroup;

  constructor() {
    const navigation = this.router.getCurrentNavigation();

    if (navigation?.extras.state) {
      this.data = navigation.extras.state['data'];
      this.ficha = navigation.extras.state['ficha'];
      this.previsiones = navigation.extras.state['previsiones'];
      this.pacienteForm = this.fb.group({
        rut: ['', multiValidator({ required: true, type: 'rut' })],
        nombre: ['', multiValidator({ required: true, type: 'texto' })],
        nombreSocial: ['', multiValidator({ required: false, type: 'texto' })],
        apellidoPaterno: ['', multiValidator({ required: true, type: 'texto' })],
        apellidoMaterno: ['', multiValidator({ required: false, type: 'texto' })],
        sexo: ['', multiValidator({ required: true })],
        fechaNacimiento: ['', multiValidator({
          required: true,
          type: 'fecha',
          maxDate: moment().subtract(18, 'years').format('DD/MM/YYYY'),
        })],
        nacionalidad: ['', multiValidator({ required: true, type: 'texto' })],
        edad: ['', multiValidator({ required: true, type: 'digitos', minValue: 18 })],
        telefono: ['', multiValidator({ required: true, type: 'telefono' })],
        direccion: ['', multiValidator({ required: true, type: 'texto' })],
        prevision: ['', multiValidator({ required: true })]
      });

      this.pacienteForm.get('rut')?.valueChanges
        .pipe(debounceTime(600))
        .subscribe(value => {
          if (validarRut(value || '')) {
            const { rut, dv } = obtenerRutYDV(value)!;
            this.buscarPaciente(`${rut}-${dv}`)
          }
        });

      // if (this.global.environment === 'development') {
      //   this.pacienteForm.patchValue({
      //     rut: '6734740-4',
      //     nombre: 'Juan',
      //     nombreSocial: 'Juanito',
      //     apellidoPaterno: 'Pérez',
      //     apellidoMaterno: 'Gómez',
      //     sexo: '1',
      //     fechaNacimiento: '01/01/2000',
      //     nacionalidad: 'Chilena',
      //     edad: 23,
      //     telefono: '+56966583540',
      //     direccion: 'Calle Falsa 123',
      //     prevision: ''
      //   }, { emitEvent: false });
      // }
    }
  }
  ngOnInit() {
    if (!this.data || !this.ficha) {
      this.router.navigate(['/docentes']);
      return;
    }
    console.log('Data recibida:', this.data);
    console.log('Ficha recibida:', this.ficha);
  }
  async buscarPaciente(rut: string) {
    try {
      const response = await this.api.buscarPaciente<any>(rut);

      if (response.success) {
        const paciente = response.data;
        this.pacienteForm.patchValue({
          rut: paciente.fspaRut,
          nombre: paciente.fspaNombre,
          nombreSocial: paciente.fspaNombreSocial,
          apellidoPaterno: paciente.fspaApellido1,
          apellidoMaterno: paciente.fspaApellido2,
          sexo: paciente.fspaSexo,
          fechaNacimiento: paciente.fspaFechaNac,
          nacionalidad: paciente.fspaNacionalidad,
          edad: paciente.fspaEdad,
          telefono: paciente.fspaTcelular,
          direccion: paciente.fspaDireccion,
          prevision: paciente.fspaPrevision
        }, { emitEvent: false });
      }
      else {
        this.pacienteForm.patchValue({
          rut: rut
        }, { emitEvent: false });
      }
    }
    catch (error) {
    }
  }
  async asignarFicha() {

    debugger

    if (this.pacienteForm.invalid) {
      this.pacienteForm.markAllAsTouched();
      this.toastr.error('Por favor, complete correctamente el formulario del paciente.');
      return;
    }

    if (this.fichaDinamicaComponent.form.invalid) {
      this.fichaDinamicaComponent.form.markAllAsTouched();
      this.toastr.error('Por favor, complete correctamente el formulario de la ficha.');
      return;
    }

    const confirmacion = await this.alert.confirm('Confirmar Asignación', '¿Está seguro de asignar esta ficha al curso?');

    if (!confirmacion) {
      return;
    }

    const pacienteData = this.pacienteForm.value;
    const fichaData = { ...this.fichaDinamicaComponent.form.value };
    let valores: any[] = [];
    let archivos: any[] = [];

    this.ficha.grupos.forEach((grupo: any) => {

      grupo.campos.forEach((campo: any) => {
        if (fichaData.hasOwnProperty(campo.codigo)) {

          if (campo.tipo === "FILE" && fichaData[campo.codigo] instanceof File) {
            archivos.push({
              archivo: fichaData[campo.codigo],
              id_campo: campo.id_campo
            });
          }
          else {
            let valorCampo = fichaData[campo.codigo] || '';

            valores.push({
              id: campo.id_campo,
              valor: valorCampo
            });
          }

        }
      });

    });

    /*this.ficha.grupos[0].campos.forEach((campo: any) => {
      if (fichaData.hasOwnProperty(campo.codigo)) {
        let valorCampo = fichaData[campo.codigo] || '';

        valores.push({
          id: campo.id_campo,
          valor: valorCampo
        });
      }
    });

    this.ficha.grupos[1].campos.forEach((campo: any) => {
      if (fichaData.hasOwnProperty(campo.codigo)) {

        if (campo.tipo === "FILE" && fichaData[campo.codigo] instanceof File) {
          archivos.push({
            archivo: fichaData[campo.codigo],
            id_campo: campo.id_campo
          });
        }
        else {
          let valorCampo = fichaData[campo.codigo] || '';

          valores.push({
            id: campo.id_campo,
            valor: valorCampo
          });
        }
      }
    });*/

    if (archivos.length > 0) {
      try {
        for (const item of archivos) {
          const base64 = await this.fileToBase64(item.archivo);
          valores.push({
            id: item.id_campo,
            valor: base64,
            nombreArchivo: item.archivo.name,
            tipoArchivo: item.archivo.type
          });
        }
      }
      catch (error) {
        this.toastr.error('Error al procesar los archivos adjuntos: ' + error);
        return;
      }
    }


    // const campoCasoClinico = this.ficha.grupos[0].campos.find((c: any) => c.codigo === "CASO_CLINICO");
    const params = {
      paciente: pacienteData,
      campos: valores,
      // ficha: fichaData,
      tipoFichaId: this.ficha.id_tipo_ficha,
      seccionId: this.data.seccCcod,
      // casoClinicoId: campoCasoClinico ? campoCasoClinico.id_campo : null
    };

    debugger

    try {
      const response = await this.api.asignarFicha<any>(params);

      if (response.success) {
        this.toastr.success('Ficha asignada correctamente al paciente.');
        this.router.navigate(['/docentes']);
      }
    }
    catch (error) {
      console.error('Error al asignar la ficha:', error);
      this.toastr.error('Ocurrió un error al asignar la ficha. Por favor, inténtelo de nuevo.');
    }

  }
  async mostrarFicha() {
    debugger
  }

  async fileToBase64(file: File, allowedExtensions: string[] = ['jpg', 'jpeg', 'png', 'pdf'], maxSizeMB: number = 5): Promise<string> {
    return new Promise((resolve, reject) => {
      const extension = file.name.split('.').pop()?.toLowerCase();
      if (!extension || !allowedExtensions.includes(extension)) {
        return reject(`Extensión no permitida. Solo se aceptan: ${allowedExtensions.join(', ')}`);
      }

      const maxSizeBytes = maxSizeMB * 1024 * 1024;
      if (file.size > maxSizeBytes) {
        return reject(`El archivo supera el tamaño máximo permitido de ${maxSizeMB} MB`);
      }

      const reader = new FileReader();
      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1];
        resolve(base64String);
      };
      reader.onerror = (error) => reject('Error al leer el archivo: ' + error);
      reader.readAsDataURL(file);
    });
  }

}
