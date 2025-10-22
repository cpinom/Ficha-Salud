import { Component } from '@angular/core';
import { GestionservicesService } from '../../../core/services/gestionservices.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-medicoquirurgico',
  templateUrl: './medicoquirurgico.component.html',
  styleUrl: './medicoquirurgico.component.scss',
})
export class MedicoquirurgicoComponent {
  constructor(
    private service: GestionservicesService,
    private router: ActivatedRoute,
    private fb: FormBuilder
  ) {}
  infoseccion: any[] = [];
  fichaForm!: FormGroup;
  prevision: any[] = [];

  //inicializar el formulario

  ngOnInit(): void {
    const secciones = Number(this.router.snapshot.paramMap.get('secciones'));
    console.log(secciones);
    this.getinfoseccion(secciones);
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
      CtrCelular: [''],
      CtrDireccion: [''],
      CtrPrevision: [''],
      CtrCasoClinico: [''],
      CtrDiagnosticoMedico: [''],
      CtrAnamnesisRemota: [''],
      CtrExamenFisico: [''],
      CtrAnamnesisProxima: [''],
      CtrAdjunto: [''],
      CtrArchivoAdjunto: [''],
      CtrIndicacionesMedica: [''],
      CtrMediDosis: [''],
      CtrAccionFarma: [''],
      CtrReaccAdversas: [''],
      CtrCiudadosAdmRelevantes: [''],
      CtrMediDosis1: [''],
      CtrAccionFarma1: [''],
      CtrReaccAdversas1: [''],
      CtrCiudadosAdmRelevantes1: [''],
      CtrMediDosis2: [''],
      CtrAccionFarma2: [''],
      CtrReaccAdversas2: [''],
      CtrCiudadosAdmRelevantes2: [''],
      CtrMediDosis3: [''],
      CtrAccionFarma3: [''],
      CtrReaccAdversas3: [''],
      CtrCiudadosAdmRelevantes3: [''],
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
      CtrDescripcionDocenteVVP: [''],
      CtrDescripcionGeneralVVP: [''],
      CtrDescripcionDocenteCVC: [''],
      CtrDescripcionGeneralCVC: [''],
      CtrDescripcionDocenteSNG: [''],
      CtrDescripcionGeneralSNG: [''],
      CtrDescripcionDocenteCUP: [''],
      CtrDescripcionGeneralCUP: [''],
      CtrDescripcionDocenteDrenaje: [''],
      CtrDescripcionGeneralDrenaje: [''],
      CtrDescripcionDocenteOtro: [''],
      CtrDescripcionGeneralOtro: [''],
      CtrCanulaNasalDocente: [''],
      CtrCanulaNasalGeneral: [''],
      CtrVenturiDocente: [''],
      CtrVenturiGeneral: [''],
      CtrOtroOxigenoDocente: [''],
      CtrOtroOxigenoGeneral: [''],
      CtrNebulizacionDocente: [''],
      CtrNebulizacionGeneral: [''],
      CtrAspiracionesSecrecionesDocente: [''],
      CtrAspiracionesSecrecionesGeneral: [''],
      CtrMonitorCardiacoDocente: [''],
      CtrMonitorCardiacoGeneral: [''],
      CtrElectrocardiogramaDocente: [''],
      CtrElectrocardiogramaGeneral: [''],
      CtrCuracionesGeneral: [''],
      CtrCuracionesDocente: [''],
      CtrOtrosMGeneral1: [''],
      CtrOtrosMDocente: [''],
      CtrRiesgoCaidas: [''],
      CtrActPreventiva: [''],
      CtrPrecaucionesEspe: [''],
      CtrEpp: [''],
      CtrCaracteristicas: [''],
      CtrPrecuacionesEspe1: [''],
      CtrEpp1: [''],
      CtrPrecuacionesEspe2: [''],
      CtrEpp2: [''],
      CtrPrecuacionesEspe3: [''],
      CtrEpp3: [''],
      CtrPrecuacionesEspe4: [''],
      CtrEpp4: [''],
      CtrPrecuacionesEspe5: [''],
      CtrEpp5: [''],
      CtrPrecuacionesEspe6: [''],
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
      CtrSangreTDocente: [''],
      CtrCuidadosGSangre: [''],
      CtrorinaDDocente: [''],
      CtrOrinaCG: [''],
      CtrOtrosDD: [''],
      CtrOtrosCG: [''],
      CtrRiesgoCaidasAH: [''],
      CtrActPreventivaAH: [''],
      CtrPrecaucionesEspeAH: [''],
      CtrEppAH: [''],
      CtrCaractHabAH: [''],
      CtrIngOralValor: [''],
      CtrIngOralCT: [''],
      CtrLiqV: [''],
      CtrLiqVPC: [''],
      CtrNutriParentalV: [''],
      CtrNutriParentalC: [''],
      CtrTratamientoEV: [''],
      CtrTratamientoEVC: [''],
      CtrMedicamentosBolo: [''],
      CtrMedicamentosBoloC: [''],
      CtrOtrosBHV: [''],
      CtrOtrosBHC: [''],
      CtrDiuresisEV: [''],
      CtrDiuresisEVC: [''],
      CtrDeposicionesEV: [''],
      CtrDeposicionesEVC: [''],
      CtrVomitosEV: [''],
      CtrVomitosEVC: [''],
      CtrOtrosEV: [''],
      CtrOtrosEC: [''],
      CtrNecPriorizadas: [''],
      CtrJustficacionNP: [''],
      CtrPlanCuidadosNP: [''],
      CtrNecPriorizadas1: [''],
      CtrJustficacionNP1: [''],
      CtrPlanCuidadosNP1: [''],
      CtrNecPriorizadas2: [''],
      CtrJustficacionNP2: [''],
      CtrPlanCuidadosNP2: [''],
      CtrEvolucionEntregaTurno: [''],
    });
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

  asignanuevaficha(): void {
    const fichaCompleta = this.fichaForm.value;

    const secciones = Number(this.router.snapshot.paramMap.get('secciones'));
    fichaCompleta.CtrSeccion = secciones;

    const jsonData = JSON.stringify(fichaCompleta); // convertimos el objeto a JSON string

    this.service.asignarfichas(jsonData).subscribe({
      next: (data) => console.log('Respuesta backend:', data),
      error: (err) => console.error('Error al enviar ficha:', err),
    });
  }
}
