import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-select-input',
  templateUrl: './select-input.component.html',
  styleUrl: './select-input.component.scss'
})
export class SelectInputComponent {

  @Input() campo: any;
  @Input() uid!: string;
  @Input() control!: FormControl;
  @Input() placeholder = '';
  @Input() hiddenLabel = false;

}
