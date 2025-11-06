import { Component, inject } from '@angular/core';
import { AppGlobal } from '../../app.global';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.component.html',
  styleUrl: './bienvenida.component.scss'
})
export class BienvenidaComponent {

  private global = inject(AppGlobal);
  private router = inject(Router);

  ingresarTap() {
    if (this.global.rolUsuario === 'docente') {
      this.router.navigate(['/docentes']);
    }
    else {
      this.router.navigate(['/estudiantes']);
    }
  }

}
