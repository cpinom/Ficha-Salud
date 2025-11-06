import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertModalComponent } from '../components/alert-modal/alert-modal.component';

@Injectable({ providedIn: 'root' })
export class AlertService {
  constructor(private modalService: NgbModal) { }

  alert(title: string, message: string): Promise<void> {
    const modalRef = this.modalService.open(AlertModalComponent, {
      centered: true,
      backdrop: 'static'
    });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.type = 'alert';

    return modalRef.result.then(() => { }, () => { });
  }

  confirm(title: string, message: string): Promise<boolean> {
    const modalRef = this.modalService.open(AlertModalComponent, {
      backdrop: 'static',
      modalDialogClass: 'modal-sm',

    });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.type = 'confirm';

    return modalRef.result.then((res) => res === true, () => false);
  }
}
