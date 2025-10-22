import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';

declare var $: any;

@Directive({
  selector: '[appDataTable]'
})
export class DataTableDirective implements AfterViewInit, OnDestroy, OnChanges {
  @Input() data: any[] = [];

  private dataTable: any;
  private initialized = false;

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    this.tryInit();
  }

ngOnChanges(changes: SimpleChanges): void {
  if (changes['data'] && !changes['data'].firstChange) {
      this.reInitTable();
    }
}

private reInitTable(): void {
  if ($.fn.DataTable.isDataTable(this.el.nativeElement)) {
    const tableInstance = $(this.el.nativeElement).DataTable();
    tableInstance.clear().destroy();

    // Eliminar el contenedor de DataTables generado automáticamente
    const wrapper = $(this.el.nativeElement).closest('.dataTables_wrapper');
    if (wrapper.length) {
      wrapper.remove();
    }

    // Volver a insertar solo la tabla base
    this.el.nativeElement.innerHTML = ''; // limpiar tabla base
  }

  this.initialized = false;

  // Esperar a que Angular actualice el DOM antes de volver a inicializar
  setTimeout(() => this.tryInit(), 0);
}

  private tryInit(): void {
    if (!this.data || this.data.length === 0 || this.el.nativeElement.offsetParent === null) {
    return;
  }

  //Destruir si ya está inicializado
  if (this.initialized && $.fn.DataTable.isDataTable(this.el.nativeElement)) {
    this.dataTable.destroy(true); // destroy completa
    $(this.el.nativeElement).empty(); // limpiar el contenido del DOM
    this.initialized = false;
  }

    setTimeout(() => {
      this.dataTable = $(this.el.nativeElement).DataTable({
        dom: `<'top d-flex justify-content-end align-items-center my-2'
        <'d-flex align-items-center gap-2'fB>
      >
      <'dt-scroll't>
      <'bottom d-flex justify-content-between align-items-center mt-2'
        <'d-flex align-items-center gap-3'i l>
        p
      >`,
        scrollX: true,
        scrollCollapse: true,
        autoWidth: false,
        responsive: false,
        lengthMenu: [
          [20, 30, 50, -1],
          [20, 30, 50, 'Todas'],
        ],
        columnDefs: [
          { orderable: false, targets: 0 },
          { width: '20px', targets: 0 },
        ],
        aaSorting: [],
        buttons: [
          {
            extend: 'excelHtml5',
            text: '<div class="dataTables_actions-buttons"><i class="material-icons icon-1x">arrow_downward</i></div>',
            titleAttr: 'Exportar a Excel',
            className:
              'btn-export-excel btn btn-round btn-outline dataTables_actions-button waves-effect waves-light',
          },
        ],
        language: {
          lengthMenu: '_MENU_',
          emptyTable: 'No hay datos disponibles en la tabla',
          info: 'Mostrando _START_ - _END_ de _TOTAL_',
          infoEmpty: 'Mostrando 0 - 0 de 0',
          infoFiltered: '(filtrado de _MAX_ registros totales)',
          loadingRecords: 'Cargando...',
          processing: 'Procesando...',
          //search: "<i class='material-icons'>search</i>",
          zeroRecords: 'No se encontraron registros coincidentes',
          paginate: {
            first: 'Primero',
            last: 'Último',
            next: 'Siguiente',
            previous: 'Anterior',
          },
          aria: {
            sortAscending: ': activar para ordenar la columna ascendente',
            sortDescending: ': activar para ordenar la columna descendente',
          },
          buttons: {
            copyTitle: 'Copiado al portapapeles',
            copySuccess: {
              _: '%d filas copiadas',
              1: '1 fila copiada',
            },
            excel: 'Exportar a Excel',
            pdf: 'Exportar a PDF',
            print: 'Imprimir',
          },
        },
        initComplete: function () {
          setTimeout(() => {
            $('select.dt-input option[value="-1"]').text('Todas');
          }, 0);
        },
        drawCallback: function () {
          $('.page-link', this.api().table().container()).on(
            'click',
            function () {
              console.log('Paginación clic');
            }
          );
        },
      });

      // Ajustar columnas y eventos de resize
      setTimeout(() => {
        this.dataTable.columns.adjust().draw();
      }, 100);

      $(window).on('resize', () => {
        if (this.dataTable) {
          this.dataTable.columns.adjust();
        }
      });

      this.initialized = true;
    }, 0);
  }

  ngOnDestroy(): void {
    if (this.dataTable) {
      this.dataTable.destroy(true);
    }
    $(window).off('resize');
  }

  private tableCustomButtonsHtml(): string {
    return `
      <div class="dataTables_custom-buttons">
<button type="button" class="btn btn-rounded btn-default waves-effect" data-toggle="modal" data-target="#ModalFiltrarTabla">
<span class="d-flex align-items-center">
<span class="material-icons mr-2">
filter_list
</span>
<span>Filtrar</span>
</span>
</button>
</div> `;
  }

  private tableActionButtonsHtml(): string {
    return `
      <div class="dataTables_actions-buttons">
        <button type="button" class="btn btn-round btn-outline dataTables_actions-button waves-effect waves-light" data-toggle="tooltip" data-placement="top" title="Descargar Excel">
        <i class="material-icons icon-1x">arrow_downward</i>
      </div>`;
  }
}
