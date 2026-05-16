import { AfterViewInit, ApplicationRef, Component, ElementRef, EventEmitter, inject, InjectionToken, Injector, input, Input, OnInit, Output, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ControlRendererComponent } from '../control-renderer/control-renderer.component';
import { multiValidator } from '../../validators/multiValidator';
import { NgbAccordionDirective } from '@ng-bootstrap/ng-bootstrap';

export const CONTROL_TOKEN = new InjectionToken<FormControl>('CONTROL_TOKEN');
export const UID_TOKEN = new InjectionToken<string>('UID_TOKEN');
export const CAMPO_TOKEN = new InjectionToken<any>('CAMPO_TOKEN');
export const PLACEHOLDER_TOKEN = new InjectionToken<string>('PLACEHOLDER_TOKEN');
export const HIDDENLABEL_TOKEN = new InjectionToken<boolean>('HIDDENLABEL_TOKEN');
export const ON_DOWNLOAD_TOKEN = new InjectionToken<(payload: any) => void>('ON_DOWNLOAD_TOKEN');

@Component({
  selector: 'app-ficha-dinamica',
  templateUrl: './ficha-dinamica.component.html',
  styleUrl: './ficha-dinamica.component.scss'
})
export class FichaDinamicaComponent implements OnInit, AfterViewInit {

  private fb = inject(FormBuilder);
  private renderer = inject(Renderer2);
  private sanitizer = inject(DomSanitizer);
  private injector = inject(Injector);
  private appRef = inject(ApplicationRef);

  @Input() ficha: any;
  @Input() rol!: 'docente' | 'estudiante';
  @Output() archivoDescargado = new EventEmitter<any>();
  @Output() onPanelShown = new EventEmitter<any>();
  @Output() onPanelHidden = new EventEmitter<any>();
  @ViewChild('acc') accordion!: NgbAccordionDirective;
  @ViewChildren('contenedorGrupo') contenedores!: QueryList<ElementRef>;
  form!: FormGroup;
  currentGroupId!: number;

  async ngOnInit() {
    this.construirFormulario();

    this.ficha.grupos.forEach((g: any) => {
      g._safeHtml = this.sanitizer.bypassSecurityTrustHtml(g.plantilla);
    });
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.contenedores.forEach((ref, i) => {
        const grupo = this.ficha.grupos[i];
        this.processTemplate(ref.nativeElement, grupo);
      });
      this.currentGroupId = this.ficha.grupos[0].id_grupo;
    });
  }
  private construirFormulario() {
    const group: any = {};

    this.ficha?.grupos?.forEach((grupo: any) => {
      grupo.campos?.forEach((campo: any) => {
        const campoObligatorio = campo.obligatorio === true;

        let campoTipo: 'texto' | 'digitos' | 'decimal' | 'fecha' | undefined;

        switch (campo.tipo) {
          case 'TEXT':
          case 'TEXTAREA':
            campoTipo = 'texto';
            break;
          case 'NUMBER':
            campoTipo = 'digitos';
            break;
          case 'DECIMAL':
            campoTipo = 'decimal';
            break;
          case 'DATE':
            campoTipo = 'fecha';
            break;
          default:
            campoTipo = undefined;
        }

        // if (campo.etiqueta && campo.etiqueta != this.rol) {
        //   campoTipo = undefined;
        // }

        group[campo.codigo] = new FormControl(campo.valor || null, multiValidator({
          required: campoObligatorio,
          type: campoTipo,
          disabled: campo.etiqueta && campo.etiqueta != this.rol,
        }));
      });
    });

    this.form = this.fb.group(group);
  }
  private processTemplate(container: HTMLElement, grupo: any) {

    const controlSlots = container.querySelectorAll('control-slot[campo]');

    controlSlots.forEach((slot: any) => {
      const codigo = slot.getAttribute('campo');
      const campo = grupo.campos.find((c: any) => c.codigo === codigo);

      if (!campo) return;

      // debugger
      const uid = `ctrl_${grupo.id_grupo}_${campo.codigo}`;
      const placeholder = slot.getAttribute('data-placeholder') || '';
      const hiddenLabel = slot.getAttribute('data-hidden-label') === 'true';

      const host = this.renderer.createElement('div');
      this.renderer.addClass(host, 'md-form');
      slot.replaceWith(host);

      if (campo.etiqueta && campo.etiqueta != this.rol) {
        campo.tipo = undefined;
      }

      const providers: any[] = [
        { provide: CAMPO_TOKEN, useValue: campo },
        { provide: CONTROL_TOKEN, useValue: this.form.get(campo.codigo) },
        { provide: PLACEHOLDER_TOKEN, useValue: placeholder },
        { provide: HIDDENLABEL_TOKEN, useValue: hiddenLabel },
        { provide: UID_TOKEN, useValue: uid },
      ];

      if (campo.codigo == 'DOCUMENTOS' && campo.lista.length > 0) {
        providers.push({
          provide: ON_DOWNLOAD_TOKEN,
          useValue: (payload: any) => {
            this.archivoDescargado.emit(payload?.data);
          }
        });
      }

      if (campo.tipo === 'FILE') {
        debugger;
        providers.push({
          provide: ON_DOWNLOAD_TOKEN,
          useValue: (payload: any) => {
            this.archivoDescargado.emit(payload?.data);
          }
        });
      }

      const injector = Injector.create({
        providers,
        parent: this.injector
      });

      const cmp = new ControlRendererComponent(this.appRef, injector);
      cmp.attachTo(host);

    });
  }
  onGroupShow(grupo: any) {
    this.onPanelShown.emit(grupo);
    this.currentGroupId = grupo.id_grupo;
  }
  onGroupHidden(grupo: any) {
    this.onPanelHidden.emit(grupo);
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
  showFirstTap() {
    if (this.ficha?.grupos?.length > 0) {
      // Obtiene el primer grupo
      const firstGroup = this.ficha.grupos[0];
      // Actualiza el grupo actual
      this.currentGroupId = firstGroup.id_grupo;
      // Expande el acordeón
      this.accordion?.expand(`grupo_${this.currentGroupId}`);
    }
  }

}
