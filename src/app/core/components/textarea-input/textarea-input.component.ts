import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-textarea-input',
  templateUrl: './textarea-input.component.html',
  styleUrl: './textarea-input.component.scss'
})
export class TextareaInputComponent {

  @Input() campo: any;
  @Input() uid!: string;
  @Input() control!: FormControl;
  @Input() placeholder = '';
  @Input() hiddenLabel = false;

}
