import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppGlobal } from '../../app.global';

@Component({
  selector: 'app-bienvenidadocente',
  templateUrl: './bienvenidadocente.component.html',
  styleUrl: './bienvenidadocente.component.scss'
})
export class BienvenidadocenteComponent {

  constructor(private global: AppGlobal, private router: Router){}

  irtablerodocente(){
     this.router.navigate(['/tablerodocente']);
  }

}
