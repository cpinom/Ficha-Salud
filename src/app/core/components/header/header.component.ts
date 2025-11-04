import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  @Input() title: string = '';
  @Input() userName: string = '';
  @Output() clicked = new EventEmitter<void>();
  @Output() logout = new EventEmitter<void>();
  @Output() onPreferencesChanged = new EventEmitter<any>();
  @ViewChild('logo') logo: any;

  darkModeActive = false;
  darkModeText = 'Modo Oscuro';

  classList = ['body-large', 'body-large-1', 'body-large-2'];
  currentClassIndex = -1;

  titleTap() {
    this.clicked.emit();
  }
  logoutTap(e: any) {
    e.preventDefault();
    this.logout.emit();
  }
  darkModeTap() {
    this.darkModeActive = !this.darkModeActive;
    this.applyDarkMode();
    this.emitPreferences();
  }
  applyDarkMode() {
    const body = document.body;

    if (this.darkModeActive) {
      this.darkModeText = 'Modo Claro';
      this.logo.nativeElement.src = 'https://digital.inacap.cl/template-aplicaciones/img/logo-inacap-blanco.png';
      body.classList.add('dark');
    }
    else {
      this.darkModeText = 'Modo Oscuro';
      this.logo.nativeElement.src = 'https://digital.inacap.cl/template-aplicaciones/img/logo-inacap.png';
      body.classList.remove('dark');
    }
  }
  applyClass(emitEvent: boolean = true): void {
    this.classList.forEach(c => document.body.classList.remove(c));

    const currentClass = this.classList[this.currentClassIndex];
    document.body.classList.add(currentClass);

    if (emitEvent) {
      this.emitPreferences();
    }
  }
  increaseFontSize() {
    if (this.currentClassIndex < this.classList.length - 1) {
      this.currentClassIndex++;
      this.applyClass();
    }
  }
  decreaseFontSize() {
    if (this.currentClassIndex > -1) {
      this.currentClassIndex--;
      this.applyClass();
    }
  }
  initPreferences(preferences: any) {
    if (preferences) {
      this.darkModeActive = preferences.oscuro === true;
      this.applyDarkMode();
      this.currentClassIndex = this.returnClassIndex(preferences.fontSize);
      this.applyClass(false);
    }
  }
  returnClassIndex(cls: string) {
    const clasesInput = cls.split(',');
    let indiceMayor = -1;

    clasesInput.forEach((clase) => {
      const index = this.classList.indexOf(clase);
      if (index > indiceMayor) {
        indiceMayor = index;
      }
    });
    return indiceMayor;
  }
  emitPreferences() {
    this.onPreferencesChanged.emit({
      oscuro: this.darkModeActive,
      fontSize: this.classList.slice(0, this.currentClassIndex + 1).join(',')
    });
  }

}
