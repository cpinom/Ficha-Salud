import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { AppGlobal } from './app.global';
import { Router } from '@angular/router';
import { HeaderComponent } from './core/components/header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {
  @ViewChild('header') headerComponent!: HeaderComponent;

  title = 'Ficha Electrónica de Salud';
  notificaciones = false;
  showNavbar = true;

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.headerComponent.title = this.title;
      this.headerComponent.nombreUsuario = this.global.nombreUsuario;

      if (this.global.rolUsuario === 'docente') {
        this.router.navigate(['/tablerodocente']);
      }
      else {
        this.router.navigate(['/tableroestudiante']);
      }
    });
  }

  constructor(private global: AppGlobal, private router: Router) { }
  onLogoClick(e: any) {
    debugger
  }
  onTitleClick(e: any) {
    debugger
  }
  onNotificationsClick(e: any) {
    debugger
  }
  onChangePreferences(data: any) {
    debugger
  }


}
