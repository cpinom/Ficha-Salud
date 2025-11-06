import { AfterViewInit, Component, ElementRef, EventEmitter, inject, input, Input, OnInit, Output, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
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
  @Input() editable: boolean = false;
  @Output() archivoDescargado = new EventEmitter<any>();
  @ViewChildren('contenedorGrupo') contenedores!: QueryList<ElementRef>;

  form!: FormGroup;
  currentGroupId!: number;

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
      this.currentGroupId = this.ficha.grupos[0].id_grupo;

    });
  }
  private processTemplate(container: HTMLElement, grupo: any) {
    const controlSlots = container.querySelectorAll('control-slot[campo]');

    controlSlots.forEach((slot: any) => {
      const codigo = slot.getAttribute('campo');
      const hiddenLabel = slot.getAttribute('data-hidden-label') == 'true';
      // debugger
      const campo = grupo.campos.find((c: any) => c.codigo === codigo);

      const host = this.renderer.createElement('p');
      const valor = campo ? campo.valor : '';
      // debugger

      if (campo.codigo == "DOCUMENTOS") {
        host.innerHTML = `<a data-id="${campo.id_valor}"><span class="d-inline-flex align-items-center font-weight-bold mt-4">${campo.nombre}: </span>
                            <div><span><i _ngcontent-ng-c1901134030="" class="material-icons icon-lg mr-2 d-inline-flex align-items-center">attach_file</i>${valor}</span></div></a>`;
      }
      else {
        if (hiddenLabel == true) {
          host.innerHTML = `${valor}`;
        }
        else {
          host.innerHTML = `<span class="font-weight-bold">${campo.nombre}: </span>${valor}`;
        }
      }
      this.renderer.addClass(host, 'my-1');
      slot.replaceWith(host);
    });

    this.renderer.listen(container, 'click', (event: any) => {
      const target = (event.target as HTMLElement).closest('a');

      if (target) {
        const dataId = target.dataset['id'];

        if (dataId) {
          this.descargarArchivo(dataId);
        }
      }
    });
  }
  descargarArchivo(id: any) {
    const fsclNcorr = this.ficha.fsclNcorr;
    this.archivoDescargado.emit({ fsclNcorr: fsclNcorr, id: id });
  }
  onGroupExpandedChange(groupId: number) {
    this.currentGroupId = groupId;
  }
  prevTap(acc: any) {
    const currentIndex = this.ficha.grupos.findIndex((g: any) => g.id_grupo === this.currentGroupId);

    if (currentIndex > 0) {
      this.currentGroupId = this.ficha.grupos[currentIndex - 1].id_grupo;
      acc?.expand(`grupo_${this.currentGroupId}`);
    }
  }
  nextTap(acc: any) {
    const currentIndex = this.ficha.grupos.findIndex((g: any) => g.id_grupo === this.currentGroupId);

    if (currentIndex < this.ficha.grupos.length - 1) {
      this.currentGroupId = this.ficha.grupos[currentIndex + 1].id_grupo;
      acc?.expand(`grupo_${this.currentGroupId}`);
    }
  }

}
