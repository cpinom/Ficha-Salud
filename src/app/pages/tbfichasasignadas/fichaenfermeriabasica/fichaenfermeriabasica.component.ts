import { Component, OnInit } from '@angular/core';
import { GestionservicesService } from '../../../core/services/gestionservices.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-fichaenfermeriabasica',
  templateUrl: './fichaenfermeriabasica.component.html',
  styleUrl: './fichaenfermeriabasica.component.scss',
})
export class FichaenfermeriabasicaComponent implements OnInit {
 
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
      CtrEdad: [''],
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
