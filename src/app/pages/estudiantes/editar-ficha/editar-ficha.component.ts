import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GestionservicesService } from '../../../core/services/gestionservices.service';
import { NgbAccordionDirective } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { cinturaValidator, frecuenciaRespValidator, imcValidator, pesoValidator, presionValidator, saturacionO2Validator, tallaValidator, temperaturaAxilarValidator, temperaturaRectalValidator } from '../../../core/validators/bio.validators';
import { textValidator } from '../../../core/validators/text.validator';

@Component({
  selector: 'app-editar-ficha',
  templateUrl: './editar-ficha.component.html',
  styleUrl: './editar-ficha.component.scss'
})
export class EditarFichaComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private api = inject(GestionservicesService);
  private fb = inject(FormBuilder);

  @ViewChild('accordion') accordion!: NgbAccordionDirective;
  cabecera: any;
  ficha: any;
  seccion: any;
  fichaForm!: FormGroup;

  constructor() {
    const navigation = this.router.getCurrentNavigation();

    if (navigation?.extras.state) {
      this.cabecera = navigation.extras.state['ficha'];
    }

    if (this.cabecera) {
      this.fichaForm = this.fb.group({
        // accordion 2
        CtrDiagnosticoMedico: ['', [textValidator({ maxLength: 500, required: true })]],
        CtrAnamnesisRemota: ['', [textValidator({ maxLength: 500, required: true })]],
        CtrExamenFisico: ['', [textValidator({ maxLength: 500, required: true })]],
        CtrAnamnesisProxima: ['', [textValidator({ maxLength: 500, required: true })]],
        CtrAdjunto: [''],
        CtrArchivoAdjunto: [''],
        // accordion 3
        CtrIndicacionesMedica: ['', [textValidator({ maxLength: 500, required: true })]],
        // accordion 4
        CtrPeso: ['', [Validators.required, pesoValidator]],
        CtrTalla: ['', [Validators.required, tallaValidator]],
        CtrImc: ['', [Validators.required, imcValidator]],
        CtrCintura: ['', [Validators.required, cinturaValidator]],
        CtrClasificacionImc: ['', [Validators.required]],
        CtrPresionSistolica: ['', [Validators.required]],
        CtrPresionDistolica: ['', [Validators.required]],
        CtrPresionMedia: ['', [Validators.required]],
        CtrClasificacionPA: [''],
        CtrPulsoFC: [''],
        CtrClasificacionFC: [''],
        CtrFrecueciaRespiratoria: ['', [Validators.required, frecuenciaRespValidator]],
        CtrTipoRespiracion: [''],
        CtrSaturacionO2: ['', [Validators.required, saturacionO2Validator]],
        CtrFiO2: [''],
        CtrLenguajeTecnico: [''],
        CtrTemperaturaAxilar: ['', [Validators.required, temperaturaAxilarValidator]],
        CtrTemperaturaRectal: ['', [Validators.required, temperaturaRectalValidator]],
        CtrHgt: [''],
        CtrEvaEna: [''],
        CtrClasificacionTemHgt: [''],
        CtrIndicacionesMedicas: [''],
        // accordion 5
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
        // accordion 6
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
        // accordion 7
        CtrRiesgoCaidas: [''],
        CtrActPreventiva: [''],
        CtrPrecaucionesEspe: [''],
        CtrEpp: [''],
        CtrCaracteristicas: [''],
        // accordion 8
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
        // accordion 9
        CtrNecesidades: [''],
        CtrJustificacion: [''],
        CtrPlan: [''],
        CtrNecesidades1: [''],
        CtrJustificacion1: [''],
        CtrPlan1: [''],
        CtrNecesidades2: [''],
        CtrJustificacion2: [''],
        CtrPlan2: [''],
        // accordion 10
        CtrIndicacionesMedicas1: [''],
      });
    }
  }

  async ngOnInit() {
    if (!this.cabecera) {
      await this.router.navigate(['/estudiantes']);
      return
    }

    await this.cargar();
  }
  async cargar() {
    try {
      const response = await this.api.getDetalleFicha<any>(this.cabecera.seccCcod);

      if (response.success) {
        this.ficha = response.data.ficha;
        this.seccion = response.data.seccion;
      }
    }
    catch (error) {
      console.error('Error al cargar los datos:', error);
    }

  }
  async guardar(borrador?: boolean) {
    debugger
    this.fichaForm.markAllAsTouched();
    
    if (this.fichaForm.valid) { }
  }

}
