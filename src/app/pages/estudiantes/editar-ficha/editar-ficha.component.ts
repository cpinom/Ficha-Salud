import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbAccordionDirective } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';
import { AlumnoService } from '../../../core/services/alumno.service';
import { ToastrService } from 'ngx-toastr';
import { AlertService } from '../../../core/services/alert.service';

@Component({
  selector: 'app-editar-ficha',
  templateUrl: './editar-ficha.component.html'
})
export class EditarFichaComponent implements OnInit {

  private router = inject(Router);
  private api = inject(AlumnoService);
  private toastr = inject(ToastrService);
  private alertService = inject(AlertService);

  @ViewChild('accordion') accordion!: NgbAccordionDirective;
  @ViewChild('fichaDinamica') fichaDinamicaComponent: any;
  paciente: any;
  ficha: any;
  seccion: any;
  fichaForm!: FormGroup;

  constructor() {
    const navigation = this.router.getCurrentNavigation();

    if (navigation?.extras.state) {
      debugger
      this.paciente = navigation.extras.state['paciente'];
      this.ficha = navigation.extras.state['ficha'];
      this.seccion = navigation.extras.state['seccion'];
      console.log(this.paciente);
    }
  }
  ngOnInit() {
    if (!this.paciente || !this.ficha) {
      this.router.navigate(['/estudiantes']);
      return;
    }
  }
  async enviarFicha(borrador?: boolean) {
    this.fichaDinamicaComponent.form.markAllAsTouched();

    if (this.fichaDinamicaComponent.form.valid) {
      const fichaData = { ...this.fichaDinamicaComponent.form.value };
      let valores: any[] = [];
      let archivos: any[] = [];

      this.ficha.grupos.forEach((grupo: any) => {
        grupo.campos.forEach((campo: any) => {
          if (fichaData.hasOwnProperty(campo.codigo)) {
            if (campo.codigo !== "CASO_CLINICO" && campo.tipo !== "FILE") {

              if (fichaData[campo.codigo] != null) {
                let valorCampo = fichaData[campo.codigo] || '';

                if (campo.tipo === 'DECIMAL') {
                  valorCampo = valorCampo.toString().replace(',', '.');
                }

                valores.push({
                  id: campo.id_campo,
                  valor: valorCampo
                });

              }
            }
            else if (campo.tipo === "FILE" && fichaData[campo.codigo] instanceof File) {
              archivos.push({ archivo: fichaData[campo.codigo], id_campo: campo.id_campo });
            }
          }
        });
      });

      if (archivos.length > 0) {
        try {
          for (const item of archivos) {
            const base64 = await this.fileToBase64(item.archivo);
            valores.push({
              id: item.id_campo,
              valor: base64,
              nombreArchivo: item.archivo.name,
              tipoArchivo: item.archivo.type
            });
          }
        }
        catch (error) {
          this.toastr.error('Error al procesar los archivos adjuntos: ' + error);
          return;
        }
      }

      if (!borrador) {
        const confirm = await this.alertService.confirm('Enviar Ficha', '¿Estás seguro de que deseas enviar la ficha? Una vez enviada, no podrá realizar más modificaciones.');

        if (!confirm) {
          return;
        }
      }

      const params = {
        fsclNcorr: this.ficha.fsclNcorr,
        campos: valores,
        borrador: borrador === true ? 1 : 0
      };

      try {
        const response = await this.api.guardarFicha<any>(params);

        if (response.success) {
          this.toastr.success(response.message || 'Ficha guardada correctamente.');
          await this.router.navigate(['/estudiantes']);
        }
        else {
          throw Error(response.message || 'Error desconocido');
        }
      }
      catch (error) {
        this.toastr.error('Error al guardar la ficha: ' + error);
      }
    }
  }
  async guardarBorrador() {
    await this.enviarFicha(true);
  }
  async fileToBase64(file: File, allowedExtensions: string[] = ['jpg', 'jpeg', 'png', 'pdf'], maxSizeMB: number = 5): Promise<string> {
    return new Promise((resolve, reject) => {
      const extension = file.name.split('.').pop()?.toLowerCase();
      if (!extension || !allowedExtensions.includes(extension)) {
        return reject(`Extensión no permitida. Solo se aceptan: ${allowedExtensions.join(', ')}`);
      }

      const maxSizeBytes = maxSizeMB * 1024 * 1024;
      if (file.size > maxSizeBytes) {
        return reject(`El archivo supera el tamaño máximo permitido de ${maxSizeMB} MB`);
      }

      const reader = new FileReader();
      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1];
        resolve(base64String);
      };
      reader.onerror = (error) => reject('Error al leer el archivo: ' + error);
      reader.readAsDataURL(file);
    });
  }
  async descargarArchivo(archivo: any) {
    const fsclNcorr = this.ficha.fsclNcorr;
    const fsvaNcorr = archivo.id;

    try {
      const response = await this.api.descargarArchivo(fsclNcorr, fsvaNcorr);

      if (response.success) {
        const { data } = response;
        const linkSource = `data:${data.contentType};base64,${data.base64}`;
        const downloadLink = document.createElement('a');
        downloadLink.href = linkSource;
        downloadLink.download = data.name;
        downloadLink.click();
      }
      else {
        throw Error();
      }
    }
    catch (error) {
      this.toastr.error('Error al descargar el archivo');
    }
  }

}
