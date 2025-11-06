import { ApplicationRef, Component, ComponentRef, createComponent, Injector } from '@angular/core';
import { SelectInputComponent } from '../select-input/select-input.component';
import { FileInputWrapperComponent } from '../file-input-wrapper/file-input-wrapper.component';
import { TextInputComponent } from '../text-input/text-input.component';
import { CAMPO_TOKEN, CONTROL_TOKEN, HIDDENLABEL_TOKEN, PLACEHOLDER_TOKEN, UID_TOKEN } from '../ficha-dinamica/ficha-dinamica.component';
import { TextareaInputComponent } from '../textarea-input/textarea-input.component';

// @Component({
//   selector: 'app-control-renderer',
//   templateUrl: './control-renderer.component.html'
// })
export class ControlRendererComponent {

  constructor(private appRef: ApplicationRef, private injector: Injector) { }

  attachTo(host: HTMLElement) {
    const campo = this.injector.get(CAMPO_TOKEN);
    const control = this.injector.get(CONTROL_TOKEN);
    const placeholder = this.injector.get(PLACEHOLDER_TOKEN);
    const hiddenLabel = this.injector.get(HIDDENLABEL_TOKEN);
    const uid = this.injector.get(UID_TOKEN);

    let componentType: any;
    switch (campo.tipo) {
      case 'SELECT': componentType = SelectInputComponent; break;
      case 'FILE': componentType = FileInputWrapperComponent; break;
      case 'TEXTAREA': componentType = TextareaInputComponent; break;
      default: componentType = TextInputComponent;
    }

    const cmpRef: ComponentRef<any> = createComponent(componentType, {
      hostElement: host,
      environmentInjector: this.appRef.injector,
      elementInjector: this.injector
    });

    cmpRef.setInput('campo', campo);
    cmpRef.setInput('uid', uid);
    cmpRef.setInput('control', control);
    cmpRef.setInput('placeholder', placeholder);
    cmpRef.setInput('hiddenLabel', hiddenLabel);

    this.appRef.attachView(cmpRef.hostView);
  }

}
