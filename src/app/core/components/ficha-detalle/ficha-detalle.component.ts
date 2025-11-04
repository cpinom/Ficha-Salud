import { AfterViewInit, Component, ElementRef, inject, Input, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { multiValidator } from '../../validators/multiValidator';

@Component({
  selector: 'app-ficha-detalle',
  templateUrl: './ficha-detalle.component.html',
  styleUrl: './ficha-detalle.component.scss'
})
export class FichaDetalleComponent implements OnInit, AfterViewInit {

  private sanitizer = inject(DomSanitizer);
  private fb = inject(FormBuilder);
  private renderer = inject(Renderer2);

  @Input() ficha: any;
  @ViewChildren('contenedorGrupo') contenedores!: QueryList<ElementRef>;

  form!: FormGroup;

  ngOnInit() {
    const group: any = {};

    this.ficha.grupos.forEach((grupo: any, index: number) => {
      grupo._safeHtml = this.sanitizer.bypassSecurityTrustHtml(grupo.plantilla);
      // debugger
      group[`grupo_${grupo.id_grupo}`] = new FormControl(grupo.comentarios || null, multiValidator({
        required: false,
        type: 'texto'
      }));

      if (grupo.comentarios && grupo.comentarios.length > 0) {
        grupo.mostrarComentario = true;
      }
    });

    this.form = this.fb.group(group);
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.contenedores.forEach((ref, i) => {
        const grupo = this.ficha.grupos[i];
        this.processTemplate(ref.nativeElement, grupo);
      });
      // this.currentGroupId = this.ficha.grupos[0].id_grupo;
    });
  }
  private processTemplate(container: HTMLElement, grupo: any) {
    const controlSlots = container.querySelectorAll('control-slot[campo]');

    controlSlots.forEach((slot: any) => {
      const codigo = slot.getAttribute('campo');
      const campo = grupo.campos.find((c: any) => c.codigo === codigo);

      const host = this.renderer.createElement('p');
      const valor = campo ? campo.valor : ''
      host.innerHTML = `<span class="font-weight-bold">${campo.nombre}: </span>${valor}`;
      this.renderer.addClass(host, 'mb-3');
      slot.replaceWith(host);
    });
  }
  onGroupExpandedChange(groupId: number) {
  }

}
