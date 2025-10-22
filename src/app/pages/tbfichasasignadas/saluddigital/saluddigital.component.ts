import { Component } from '@angular/core';
import { GestionservicesService } from '../../../core/services/gestionservices.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-saluddigital',
  templateUrl: './saluddigital.component.html',
  styleUrl: './saluddigital.component.scss'
})
export class SaluddigitalComponent {
constructor(
    private service: GestionservicesService,
    private router: ActivatedRoute,
    private fb: FormBuilder
  ) {}
  infoseccion: any[] = [];
  fichaForm!: FormGroup;
  prevision: any[] = [];

  ngOnInit(): void {
    const secciones = Number(this.router.snapshot.paramMap.get('secciones'));
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
      CtrPesoSD: [''],
      CtrTallaSD: [''],
      CtrImcSD:[''],
      CtrCinturaCV: [''],
      CtrPresionSistolicaSB:[''],
      CtrPresionDistolicaSB:[''],
      CtrPresionMediaSB:[''],
      CtrPulsoFCSB:[''],
      CtrFrecueciaRespiratoria:[''],
      CtrTipoRespiracion:[''],
      CtrSaturacionO2:[''],
      CtrFiO2:[''],
      CtrTemperaturaAxilar:[''],
      CtrTemperaturaRectal:[''],
      CtrHgt:[''],
      CtrEvaEna:[''],
      CtrComentariosSV:[''],
      Esi1:[''],
      Esi2:[''],
      Esi3:[''],
      Esi4:[''],
      Esi5:[''],
      CtrDiagnosticoMedico:[''],
      CtrAnamnesisRemota:[''],
      CtrExamenFisico:[''],
      CtrAnamnesisProxima:[''],
      CtrAdjunto:[''],
      CtrArchivoAdjunto:[''],
      CtrIndicacionesMedica:[''],
      CtrMedicamentosDosis:[''],
      CtrAccionFarmacologica:[''],
      CtrReaccionAdversaimport:[''],
      CtrCuidadosAdmRelevantes:[''],
      CtrMedicamentosDosis1:[''],
      CtrAccionFarmacologica1:[''],
      CtrReaccionAdversaimport1:[''],
      CtrCuidadosAdmRelevantes1:[''],
      CtrMedicamentosDosis2:[''],
      CtrAccionFarmacologica2:[''],
      CtrReaccionAdversaimport2:[''],
      CtrCuidadosAdmRelevantes2:[''],
      CtrMedicamentosDosis3:[''],
      CtrAccionFarmacologica3:[''],
      CtrReaccionAdversaimport3:[''],
      CtrCuidadosAdmRelevantes3:[''],
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
      CtrPulsoFCAE: [''],
      CtrClasificacionFC: [''],
      CtrFrecueciaRespiratoriaAE: [''],
      CtrTipoRespiracionAE: [''],
      CtrSaturacionO2AE: [''],
      CtrFiO2AE: [''],
      CtrLenguajeTecnico: [''],
      CtrTemperaturaAxilarAE:[''],
      CtrTemperaturaRectalAE:[''],
      CtrHgtAE:[''],
      CtrEvaEnaAE:[''],
      CtrClasificacionTemHgt:[''],
      CtrIndicacionesMedicaRAE:[''],
      CtrDescripcionDocenteVVP:[''],
      CtrDescripcionGeneralVVP:[''],
      CtrDescripcionDocenteCVC:[''],
      CtrDescripcionGeneralCVC:[''],
      CtrDescripcionDocenteSNG:[''],
      CtrDescripcionGeneralSNG:[''],
      CtrDescripcionDocenteCUP:[''],
      CtrDescripcionGeneralCUP:[''],
      CtrDescripcionDocenteDrenaje:[''],
      CtrDescripcionGeneralDrenaje:[''],
      CtrDescripcionDocenteOtro:[''],
      CtrDescripcionGeneralOtro:[''],
      CtrCanulaNasalDocente:[''],
      CtrCanulaNasalGeneral:[''],
      CtrVenturiDocente:[''],
      CtrVenturiGeneral:[''],
      CtrOtroOxigenoDocente:[''],
      CtrOtroOxigenoGeneral:[''],
      CtrNebulizacionDocente:[''],
      CtrNebulizacionGeneral:[''],
      CtrAspiracionesSecrecionesDocente:[''],
      CtrAspiracionesSecrecionesGeneral:[''],
      CtrMonitorCardiacoDocente:[''],
      CtrMonitorCardiacoGeneral:[''],
      CtrElectrocardiogramaDocente:[''],
      CtrElectrocardiogramaGeneral:[''],
      CtrElectrocardiogramaDocente1:[''],
      CtrElectrocardiogramaGeneral1:[''],
      CtrCuracionesDocente:[''],
      CtrCuracionesGeneral:[''],
      CtrSangreTDocente:[''],
      CtrCuidadosGSangre:[''],
      CtrorinaDDocente:[''],
      CtrOrinaCG:[''],
      CtrOtrosDD:[''],
      CtrRxDocente:[''],
      CtrRxGeneral:[''],
      CtrScannerDocente:[''],
      CtrScannerGeneral:[''],
      CtrOtrosImagenDD:[''],
      CtrOtrosImagenCG:[''],
      CtrFile:[''],
      CtrArchivoAdjuntoSRX:[''],
      CtrEvaEnfermeriaReanimadorU:[''],
      CtrEvaEnfermeriaReanimadorU1:[''],
      CtrRiesgoCaidasAH:[''],
      CtrActPreventivaAH:[''],
      CtrPrecaucionesEspeAH:[''],
      CtrEppAH:[''],
      CtrCaractHabAH:[''],
      CtrNesPriNP:[''],
      CtrJustificacionNP:[''],
      CtrPlanCuidadosNP:[''],
      CtrNesPriNP1:[''],
      CtrJustificacionNP1:[''],
      CtrPlanCuidadosNP1:[''],
      CtrNesPriNP2:[''],
      CtrJustificacionNP2:[''],
      CtrPlanCuidadosNP2:[''],
      CtrEvolucionEntregaTurno:[''],
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
    error: (err) => console.error('Error al enviar ficha:', err)
  });
}
}
