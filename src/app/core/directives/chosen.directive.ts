import { Directive, ElementRef, forwardRef, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

declare var $: any;

@Directive({
  selector: '[chosen]',
  standalone: false,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ChosenDirective),
      multi: true
    }
  ]
})
export class ChosenDirective implements OnInit, OnDestroy, ControlValueAccessor {
  @Input('chosen') options: any;
  @Input() refreshTrigger: any;
  @Input() set chosenOptions(value: any) {
    this.options = value;
  }

  private readonly defaultOptions = {
    disable_search_threshold: 10,
    no_results_text: 'Sin Resultados para: ',
    default_single_text: 'Seleccione una opción',
    width: '100%'
  };

  private onChange: any = () => { };
  private onTouched: any = () => { };

  constructor(private el: ElementRef) { }

  ngOnInit() {
    const finalOptions = { ...this.defaultOptions, ...this.options };

    setTimeout(() => {
      $(this.el.nativeElement)
        .chosen(finalOptions)
        .on('change', (e: any) => {
          const value = $(e.target).val();
          this.onChange(value);
          this.onTouched();
        });
    })
  }

  writeValue(value: any): void {
    setTimeout(() => {
      $(this.el.nativeElement).val(value).trigger('chosen:updated');
    });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    $(this.el.nativeElement).prop('disabled', isDisabled).trigger('chosen:updated');
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['refreshTrigger'] && !changes['refreshTrigger'].firstChange) {
      setTimeout(() => {
        $(this.el.nativeElement).trigger('chosen:updated');
      });
    }
  }

  ngOnDestroy() {
    $(this.el.nativeElement).chosen('destroy');
  }

  refresh() {
    $(this.el.nativeElement).trigger('chosen:updated');
  }
}
