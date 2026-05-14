import { Component, EventEmitter, Inject, Input, Optional, Output } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ON_DOWNLOAD_TOKEN } from '../ficha-dinamica/ficha-dinamica.component';

@Component({
  selector: 'app-label-value',
  template: `
    <div class="form-group">
      @if(!hiddenLabel) {
        <b>{{ campo?.nombre }}</b>
      }

      <div class="form-control-plaintext label-value-text">

        @if(campo?.lista?.length > 0) {
          <div class="file-list">
            @for(archivo of campo.lista; track archivo) {
              <button
                type="button"
                class="file-link"
                (click)="descargarArchivo(archivo)"
              >
                {{ archivo?.nombre_archivo || 'Archivo' }}
              </button>
            }
          </div>
        } @else {
          {{ control.value || 'S/D' }}
        }

      </div>
    </div>
  `,
  styles: [`
    .label-value-text {
      white-space: pre-line;
    }

    .file-list {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .file-link {
      border: 0;
      background: transparent;
      padding: 0;
      color: #0d6efd;
      text-align: left;
      text-decoration: underline;
      cursor: pointer;
      width: fit-content;
    }
  `]
})
export class LabelValueComponent {
  @Input() campo: any;
  @Input() control!: AbstractControl;
  @Input() uid!: string;
  @Input() placeholder?: string;
  @Input() hiddenLabel?: boolean;

  constructor(
    @Optional() @Inject(ON_DOWNLOAD_TOKEN) private onDownload?: (payload: any) => void
  ) { }


  descargarArchivo(archivo: any): void {
    this.onDownload?.({ data: archivo });
  }
}