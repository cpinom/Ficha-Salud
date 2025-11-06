import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { AppGlobal } from './app.global';
import { Router } from '@angular/router';
import { HeaderComponent } from './core/components/header/header.component';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from './core/services/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {

  private toastr = inject(ToastrService);
  private global = inject(AppGlobal);
  private api = inject(HttpService);

  @ViewChild('header') headerComponent!: HeaderComponent;

  title = 'Ficha Electrónica de Salud';
  notificaciones = false;
  showNavbar = true;

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.headerComponent.title = this.title;
      this.headerComponent.userName = this.global.nombreUsuario;
      this.headerComponent.initPreferences(this.global.preferencias);
    });
  }

  constructor() { }

  onHeaderClicked() { }
  onLogout() {
    window.close();
  }
  async onPreferencesChanged(preferences: any) {
    debugger
    const params = {
      data: { ...this.global.preferencias, ...preferences }
    };
    try {
      await this.api.guardarPreferencias(params);
    }
    catch (error) {
      this.toastr.error('Error al guardar preferencias');
    }
  }


}
