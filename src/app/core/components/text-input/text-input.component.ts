import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.scss'
})
export class TextInputComponent {

  @Input() campo: any;
  @Input() uid!: string;
  @Input() control!: FormControl;
  @Input() placeholder = '';
  @Input() hiddenLabel = false;

}
