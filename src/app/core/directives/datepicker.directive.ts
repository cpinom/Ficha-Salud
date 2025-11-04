import { Directive, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { NgControl } from '@angular/forms';

declare var $: any; // jQuery

@Directive({
  selector: '[Datepicker]',
  standalone: false
})
export class DatepickerDirective implements AfterViewInit, OnDestroy {
  private $element: any;

  constructor(private el: ElementRef, private control: NgControl) { }

  ngAfterViewInit(): void {
    this.$element = $(this.el.nativeElement);

    this.$element.datepicker({
      minDate: 0,
      dateFormat: 'dd/mm/yyyy',
      onSelect: (dateText: string) => {
        // debugger
        this.control.control?.setValue(dateText);
        this.$element.datepicker('hide');
      }
    });
  }

  ngOnDestroy(): void {
    if (this.$element) {
      this.$element.datepicker('destroy'); // Limpieza cuando el componente se destruye
    }
  }
}
