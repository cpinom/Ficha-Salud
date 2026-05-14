import { Component, Input, HostListener } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'inacap-help-fab',
  standalone: false,
  // imports: [NgIf],
  template: `
    <!-- Botón flotante -->
    <button
      class="inacap-fab"
      type="button"
      (click)="toggle()"
      [attr.aria-expanded]="open"
      aria-label="Visualizar ayuda"
      title="Ayuda"
    >
      Visualizar Caso Clínico
    </button>

    <!-- Panel tipo chat -->
    <div class="inacap-chat" *ngIf="open" role="dialog" aria-label="Panel de ayuda">
      <div class="inacap-chat__header">
        <div class="inacap-chat__title">Caso Clínico</div>

        <button class="inacap-chat__close" type="button" (click)="open=false" aria-label="Cerrar">
          ✕
        </button>
      </div>

      <div class="inacap-chat__body">
        <div class="inacap-chat__bubble">
          <div class="inacap-chat__bubble-title">Descripción</div>
          <div class="inacap-chat__bubble-text">
            {{ description }}
          </div>
        </div>
      </div>

      <!-- <div class="inacap-chat__footer">
        <button class="inacap-chat__action" type="button" (click)="open=false">
          Entendido
        </button>
      </div> -->
    </div>
  `,
  styles: [`
    :host { all: initial; }

    /* ===== Botón flotante (FAB) ===== */
    .inacap-fab{
      position: fixed;
      right: 22px;
      bottom: 22px;
      //width: 52px;
      height: 52px;
      border-radius: 999px;
      border: 0;
      cursor: pointer;
      z-index: 9999;

      display: inline-flex;
      align-items: center;
      justify-content: center;

      font: 700 18px/1 system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
      color: #fff;

      /* Rojo INACAP aproximado */
      background: #1565C0;
      box-shadow: 0 10px 25px rgba(0,0,0,.18);
      padding-inline: 25px;
    }

    .inacap-fab:hover{ filter: brightness(0.95); }
    .inacap-fab:active{ transform: translateY(1px); }

    /* ===== Panel tipo chat ===== */
    .inacap-chat{
      position: fixed;
      right: 22px;
      bottom: 86px; /* arriba del botón */
      width: 360px;
      max-width: calc(100vw - 44px);
      height: 440px;
      max-height: calc(100vh - 120px);
      z-index: 9999;

      background: #fff;
      border-radius: 10px;
      border: 1px solid #e5e7eb;
      box-shadow: 0 18px 45px rgba(0,0,0,.18);

      display: flex;
      flex-direction: column;
      overflow: hidden;

      font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
      color: #111827;
    }

    .inacap-chat__header{
      padding: 12px 14px;
      border-bottom: 1px solid #eef0f3;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;

      /* banda superior leve como en cards */
      background: #fafafa;
    }

    .inacap-chat__title{
      font-weight: 700;
      font-size: 14px;
      letter-spacing: .2px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .inacap-chat__close{
      width: 32px;
      height: 32px;
      border-radius: 8px;
      border: 1px solid #e5e7eb;
      background: #fff;
      cursor: pointer;
      font-size: 14px;
      line-height: 1;
    }

    .inacap-chat__close:hover{ background: #f3f4f6; }

    .inacap-chat__body{
      padding: 14px;
      overflow: auto;
      background: #fff;
      flex: 1;
    }

    /* Burbuja estilo “chat” */
    .inacap-chat__bubble{
      border: 1px solid #eef0f3;
      background: #f8fafc;
      border-radius: 12px;
      padding: 12px 12px;
    }

    .inacap-chat__bubble-title{
      font-weight: 700;
      font-size: 12px;
      color: #374151;
      margin-bottom: 6px;
    }

    .inacap-chat__bubble-text{
      font-size: 13px;
      color: #111827;
      line-height: 1.35;
      white-space: pre-line;
    }

    .inacap-chat__footer{
      padding: 12px 14px;
      border-top: 1px solid #eef0f3;
      display: flex;
      justify-content: flex-end;
      background: #fff;
    }

    .inacap-chat__action{
      border: 1px solid #d1d5db;
      background: #fff;
      border-radius: 8px;
      padding: 8px 12px;
      cursor: pointer;
      font-weight: 600;
      font-size: 13px;
    }

    .inacap-chat__action:hover{ background: #f3f4f6; }
  `]
})
export class InacapHelpFabComponent {
  @Input() title = 'Ayuda';
  @Input() description = 'Escribe aquí la descripción...';

  open = false;

  toggle() {
    this.open = !this.open;
  }

  // (Opcional) Cerrar con ESC
  @HostListener('document:keydown.escape')
  onEsc() {
    this.open = false;
  }
}
