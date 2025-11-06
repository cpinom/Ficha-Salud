import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-alert-modal',
  standalone: false,
  template: `
    <div class="modal-header">
      <p class="heading lead">{{ title }}</p>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body px-0">
      <div class="row">
        <div class="col-md-12">
          <p class="text-center">{{ message }}</p>
        </div>
      </div>
    </div>
    <div class="modal-footer d-flex justify-content-center">
      @if (type === 'confirm') {
      <button type="button" class="btn btn-secondary waves-effect waves-light" (click)="activeModal.dismiss(false)">Cancelar</button>
      }
      <button type="button" class="btn btn-default waves-effect waves-light" (click)="activeModal.close(true)">Aceptar</button>
    </div>
  `
})
export class AlertModalComponent {
  @Input() title: string = '';
  @Input() message: string = '';
  @Input() type: 'alert' | 'confirm' = 'alert';

  constructor(public activeModal: NgbActiveModal) { }
}
