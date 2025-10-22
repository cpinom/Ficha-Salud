import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { GestionservicesService } from '../../core/services/gestionservices.service';

@Component({
  selector: 'app-verfichaestudianteresp',
  templateUrl: './verfichaestudianteresp.component.html',
  styleUrl: './verfichaestudianteresp.component.scss'
})
export class VerfichaestudianterespComponent {

  constructor(private service: GestionservicesService,) { }

   fichaRespuesta: any[] = [];
   mostrarComentario: { [seccion: string]: boolean } = {};
   @ViewChildren('comentarioTextarea') comentarioTextareas!: QueryList<ElementRef<HTMLTextAreaElement>>;
   

  ngOnInit(): void {
    const fisaNcorr = history.state.id; 
    const persNcorr = history.state.id2;
    const seccCcod = history.state.id3;

    this.getViewRespFichaEstudiante(fisaNcorr, persNcorr, seccCcod);
  }

  getViewRespFichaEstudiante(fisaNcorr: number, persNcorr: number, seccCcod: number): void {
    this.service.getFichaEstudianteRespuesta(fisaNcorr, persNcorr, seccCcod).subscribe({
      next: (ficha) => {
        console.log('Ficha recibida:', ficha);
        this.fichaRespuesta = ficha;
      },
      error: (err) => {
        console.error('Error obteniendo ficha del estudiante', err);
      },
    });
  }

volverDetEstudiante(tpoficha:number, persNcorr:number, seccCcod:number, fsclNcorr:number): void {
  if (!this.comentarioTextareas) {
    console.warn('No se encontraron los textareas');
    return;
  }

  const comentarios: { seccion: string; comentario: string; tpoficha: number, persNcorr: number, seccCcod: number, fsclNcorr: number }[] = [];

  this.comentarioTextareas.forEach(el => {
    const native = el.nativeElement;
    const valor = native?.value?.toString()?.trim();
    const seccion = native?.getAttribute('data-seccion') || 'sin_seccion';

    if (valor) {
      comentarios.push({
        seccion,
        comentario: valor,
        tpoficha: tpoficha,
        persNcorr: persNcorr,
        seccCcod: seccCcod,
        fsclNcorr: fsclNcorr
      });
    }
  });

  console.log('JSON para enviar:', comentarios);

  // 👉 Aquí puedes enviarlo a tu servicio de backend que conecta con Oracle
  // this.miServicio.enviarComentarios(comentarios).subscribe(...);
}
}
