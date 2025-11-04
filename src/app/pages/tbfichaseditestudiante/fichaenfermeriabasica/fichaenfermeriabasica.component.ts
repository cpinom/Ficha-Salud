import { ChangeDetectorRef, Component } from '@angular/core';
import { GestionservicesService } from '../../../core/services/gestionservices.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertserviceService } from '../../../core/services/alertservice.service';

@Component({
  selector: 'app-fichaenfermeriabasica',
  templateUrl: './fichaenfermeriabasica.component.html',
  styleUrl: './fichaenfermeriabasica.component.scss'
})
export class FichaenfermeriabasicaComponent {
  constructor(
    private service: GestionservicesService,
    private router: Router,
    private fb: FormBuilder,
    private cdRef: ChangeDetectorRef,
    private notificacion: AlertserviceService,
  ) {}
  infoseccion: any[] = [];
  fichaForm!: FormGroup;
  prevision: any[] = [];
  id: number | undefined;
  id2: number | undefined;
  fichaRespuesta: any[] = [];
  archivoSeleccionado: File | null = null;
  identificaEstudiante: number | undefined;
  ngOnInit(): void {

     const state = history.state as { id: number; id2: number };

  console.log('State:', state);

  // Asegúrate de que los datos realmente existen y no es una navegación vacía
  if (state && state.id && state.id2) {
    this.id = state.id;
    this.id2 = state.id2;

    console.log('ID:', this.id);
    console.log('ID2:', this.id2);

    this.getinfoseccion(this.id2);
  }
    this.getPrevision();

    this.fichaForm = this.fb.group({
      CtrRut: [''],
      CtrNombre: [''],
      CtrRzoSocial: [''],
      CtrPaterno: [''],
      CtrMaterno: [''],
      CtrSexo: [''],
      CtrFecha: [''],
      CtrNacionalidad: [''],
      CtrEdad: [''],
      CtrCelular: [''],
      CtrDireccion: [''],
      CtrPrevision: [''],
      CtrCasoClinico: [''],
      CtrDiagnosticoMedico: ['', Validators.required],
      CtrAnamnesisRemota: [''],
      CtrExamenFisico: [''],
      CtrAnamnesisProxima: [''],
      CtrAdjunto: [null],
      CtrArchivoAdjunto: [null],
      CtrIndicacionesMedica: [''],
      CtrPeso: [''],
      CtrTalla: [''],
      CtrImc: [''],
      CtrCintura: [''],
      CtrClasificacionImc: [''],
      CtrPresionSistolica: [''],
      CtrPresionDistolica: [''],
      CtrPresionMedia: [''],
      CtrCircunferenciaCintura: [''],
      CtrClasificacionPA: [''],
      CtrPulsoFC: [''],
      CtrClasificacionFC: [''],
      CtrFrecueciaRespiratoria: [''],
      CtrTipoRespiracion: [''],
      CtrSaturacionO2: [''],
      CtrFiO2: [''],
      CtrLenguajeTecnico: [''],
      CtrTemperaturaAxilar: [''],
      CtrTemperaturaRectal: [''],
      CtrHgt: [''],
      CtrEvaEna: [''],
      CtrClasificacionTemHgt: [''],
      CtrIndicacionesMedicas: [''],
      CtrTipoReposo: [''],
      CtrObservaciones: [''],
       CtrSignosVitales: [''],
      CtrObservaciones1: [''],
      CtrAseoGenital: [''],
      CtrObservaciones2: [''],
      CtrCiudadoIntra: [''],
      CtrObservaciones3: [''],
      CtrPautaRiesgoAR: [''],
      CtrPautaRiesgoBR: [''],
      CtrPautaRiesgoCaidas: [''],
      CtrBarandasAlto: [''],
      CtrCartelNivelRiesgo: [''],
      CtrSujecionesSuav: [''],
      CtrSitio: [''],
      CtrVisitaSeguridad: [''],
      CtrLpp: [''],
      CtrObservaciones4: [''],
      CtrCae: [''],
      CtrObservaciones5: [''],
      CtrCambiosPosicion: [''],
      CtrObservaciones6: [''],
      CtrLubricacionPiel: [''],
      CtrLubPielCon: [''],
      CtrObservaciones7: [''],
      CtrApoyoEmocional30: [''],
      CtrObservaciones8: [''],
      CtrPautaContencion: [''],
      CtrObservaciones9: [''],
      CtrBrazalete: [''],
      CtrObservaciones10: [''],
      CtrEscalaEva: [''],
      CtrObservaciones11: [''],
      CtrDescripcionAPC: [''],
      CtrDescripcionAPC1: [''],
      CtrDescripcionAPC2: [''],
      CtrDescripcionAPC3: [''],
      CtrDescripcionAPC4: [''],
      CtrDescripcionAPC5: [''],
      CtrDescripcionAPC6: [''],
      CtrDescripcionAPC7: [''],
      CtrDescripcionAPC8: [''],
      CtrDescripcionAPC9: [''],
      CtrDescripcionAPC10: [''],
      CtrRiesgoCaidas: [''],
      CtrActPreventiva: [''],
      CtrPrecaucionesEspe: [''],
      CtrEpp: [''],
      CtrCaracteristicas: [''],
       CtrPrecaucionesEspe1: [''],
      CtrEpp1: [''],
      CtrPrecaucionesEspe2: [''],
      CtrEpp2: [''],
      CtrPrecaucionesEspe3: [''],
      CtrEpp3: [''],
      CtrPrecaucionesEspe4: [''],
      CtrEpp4: [''],
      CtrPrecaucionesEspe5: [''],
      CtrEpp5: [''],
      CtrPrecaucionesEspe6: [''],
      CtrEpp6: [''],
      CtrNecesidades: [''],
      CtrJustificacion: [''],
      CtrPlan: [''],
      CtrNecesidades1: [''],
      CtrJustificacion1: [''],
      CtrPlan1: [''],
      CtrNecesidades2: [''],
      CtrJustificacion2: [''],
      CtrPlan2: [''],
      CtrIndicacionesMedicas1: [''],
      CtrIdentificaEstudiante: [this.id || ''],
    CtrIdentificaseccion: [this.id2 || '']
    });

     this.getEditFichaEstudiante(state.id, state.id2);
  }

  getinfoseccion(seccion: number): void {
    this.service.getinfoseccion(seccion).subscribe({
      next: (data) => {
        console.log('Info Seccion recibido:', data);
        this.infoseccion = data;
      },
      error: (err) => {
        console.error('Error cargando info seccion', err);
      },
    });
  }

    getPrevision(): void {
    this.service.getprevision().subscribe({
      next: (data) => {
        this.prevision = data;
        console.log('Previsión recibida:', data);
      },
      error: (err) => {
        console.error('Error cargando previsión', err);
      },
    });
  }

   getEditFichaEstudiante( persNcorr: number, seccCcod: number): void {
    this.service.getEditFichaEstudiante(persNcorr, seccCcod).subscribe({
      next: (ficha) => {
        console.log('Ficha recibida:', ficha);
        this.fichaRespuesta = ficha;
        this.identificaEstudiante = persNcorr;
      },
      error: (err) => {
        console.error('Error obteniendo ficha del estudiante editar', err);
      },
    });
  }

guardarFichaEstudiante(): void {
  debugger
  if (this.fichaForm.invalid) {
    this.fichaForm.markAllAsTouched();
    this.checkInvalidControls();
    return;
  }

  const data = this.fichaForm.value;
  const formData = new FormData();

  // Agregar todos los datos del formulario a FormData
  Object.entries(data).forEach(([key, value]) => {
    if (value instanceof Blob || typeof value === 'string' || typeof value === 'number') {
      formData.append(key, value as any);
    } else if (value !== null && typeof value === 'object') {
      formData.append(key, JSON.stringify(value));
    } else {
      if (typeof value === 'object' && value !== null) {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value !== null && typeof value === 'object' ? JSON.stringify(value) : (value !== undefined && value !== null ? String(value) : ''));
      }
    }
  });

  // Si se ha seleccionado un archivo, agregarlo
  if (this.archivoSeleccionado) {
    formData.append('archivo', this.archivoSeleccionado); // El campo 'archivo' debe coincidir con el que espera tu backend
  }

  // Mostrar el contenido de FormData
  formData.forEach((value, key) => {
    console.log(key, value);
  });

  // Enviar FormData
  this.service.actualizarFichaEstudiante(formData).subscribe({
    next: (res) => {
      console.log('Respuesta del servidor:', res);
      this.notificacion.mostrar(
      'success',
      'Desafío almacenado correctamente',
      'Éxito'
      );
        setTimeout(() => {
          this.router.navigate(['/tableroestudiante']);
    }, 1000);
    },
    error: (err) => {
      console.error('Error al guardar ficha:', err);
    }
  });
}

checkInvalidControls(): void {
  const invalid = Object.keys(this.fichaForm.controls).filter(key => {
    return this.fichaForm.get(key)?.invalid;
  });

  console.log('Controles inválidos:', invalid);
}

  volverTableroEstudiante(): void {
    this.router.navigate(['/tableroestudiante']);
  }

  test(msg: string): void {
    alert(msg);
  }

  onFileSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    this.archivoSeleccionado = input.files[0];
    console.log('Archivo seleccionado:', this.archivoSeleccionado);
    
    // Opcional: guardar el nombre en el FormGroup si quieres
    this.fichaForm.patchValue({
      CtrAdjunto: this.archivoSeleccionado.name // solo nombre, no el archivo
    });
  }
}

}
