import { Component } from '@angular/core';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'app-spinner-overlay',
  standalone: false,
  templateUrl: './spinner-overlay.component.html',
  styleUrl: './spinner-overlay.component.scss'
})
export class SpinnerOverlayComponent {

  constructor(public spinnerService: SpinnerService) { }

}
