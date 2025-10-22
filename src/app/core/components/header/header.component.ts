import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { AppGlobal } from '../../../app.global';
import { DarkmodeservicesService } from '../../services/darkmodeservices.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  @Input() title: string | undefined;
  @Input() nombreUsuario: string | undefined;

  @Input() mostrarAlertaNotificaciones: boolean | undefined;
  @Output() onLogoClick: EventEmitter<any> = new EventEmitter();
  @Output() onTitleClick: EventEmitter<any> = new EventEmitter();
  @Output() onNotificationsClick: EventEmitter<any> = new EventEmitter();
  @Output() onCloseClick: EventEmitter<any> = new EventEmitter();
  @Output() onChangePreferences: EventEmitter<any> = new EventEmitter();
  @Input() mostrarNotificaciones: boolean | undefined;

  constructor(public dialog: MatDialog, private config: AppGlobal, private darkmode: DarkmodeservicesService) {
  }
  ngOnInit(): void { }

  logoClick(e: Event) {
    if (this.onLogoClick.observed) {
      e.preventDefault();
      this.onLogoClick.emit(e)
    }
  }
  titleClick(e: Event) {
    if (this.onLogoClick.observed) {
      this.onTitleClick.emit(e)
    }
  }
  notificationsClick(e: Event) {

    const dialogRef = this.dialog.open(NotificationsDialog, {
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
    });

  }
  closeClick(e: Event) {
    if (this.onCloseClick.observed) {
      this.onCloseClick.emit(e)
    }
  }
  darkMode() {
    this.onChangePreferences.emit();
  }
  onChangeSize(increase: boolean, e: Event) {
    e.stopPropagation();
    this.onChangePreferences.emit();
  }

  toggleDarkMode() {
    this.darkmode.toggleDarkMode();
  }

}

@Component({
  selector: 'notifications-dialog',
  templateUrl: 'notifications-dialog.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule
  ]
})
export class NotificationsDialog {
  constructor(public dialogRef: MatDialogRef<NotificationsDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
