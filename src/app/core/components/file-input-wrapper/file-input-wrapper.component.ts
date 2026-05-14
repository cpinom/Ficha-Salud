import {
  Component,
  forwardRef,
  Input,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  Inject,
  Optional
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR
} from '@angular/forms';
import { CAMPO_TOKEN } from '../ficha-dinamica/ficha-dinamica.component';
import { ON_DOWNLOAD_TOKEN } from '../ficha-dinamica/ficha-dinamica.component';

// @Component({
//   selector: 'file-input-wrapper',
//   templateUrl: './file-input-wrapper.component.html',
//   standalone: false,
//   providers: [{
//     provide: NG_VALUE_ACCESSOR,
//     useExisting: forwardRef(() => FileInputWrapperComponent),
//     multi: true
//   }]
// })
// export class FileInputWrapperComponent implements ControlValueAccessor {
//   @Input() accept: string = ''; // e.g. ".pdf,.jpg"
//   @Input() maxSizeMB: number = 10;
//   @Input() label: string = 'Seleccionar archivo';
//   @Input() campo!: any;
//   @Input() control!: FormControl;
//   @Input() placeholder = '';
//   @Input() hiddenLabel = false;
//   @Output() download = new EventEmitter<any>();
//   @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

//   constructor(
//     // @Inject(CAMPO_TOKEN) public campo: any,
//     @Optional() @Inject(ON_DOWNLOAD_TOKEN) private onDownload?: (payload: any) => void
//   ) { }

//   fileName: string = '';
//   private file: File | null = null;

//   private onChange = (_: any) => { };
//   private onTouched = () => { };

//   writeValue(value: any): void {
//     if (value && typeof value === 'object' && value.name) {
//       this.fileName = value.name;
//     }
//     else {
//       this.clearFile();
//     }
//   }
//   registerOnChange(fn: any): void {
//     this.onChange = fn;
//   }
//   registerOnTouched(fn: any): void {
//     this.onTouched = fn;
//   }
//   onFileChange(event: Event) {
//     const input = event.target as HTMLInputElement;
//     if (!input.files || input.files.length === 0) return;

//     const file = input.files[0];

//     if (this.accept && !this.isAcceptedExtension(file.name)) {
//       alert('Extensión no permitida');
//       return this.clearFile();
//     }

//     if (file.size > this.maxSizeMB * 1024 * 1024) {
//       alert(`Archivo excede el máximo de ${this.maxSizeMB} MB`);
//       return this.clearFile();
//     }

//     this.fileName = file.name;

//     // Asigna el File (objeto completo) al control
//     this.control.setValue(file);

//     // Si el formulario ya fue tocado, marcamos el control
//     this.control.markAsDirty();
//     this.control.markAsTouched();

//     // const reader = new FileReader();
//     // reader.onload = () => {
//     //   const base64 = reader.result as string;

//     //   this.file = file;
//     //   this.fileName = file.name;

//     //   // Puedes emitir solo el base64, o un objeto con más datos:
//     //   this.onChange({
//     //     name: file.name,
//     //     type: file.type,
//     //     size: file.size,
//     //     base64: base64
//     //   });

//     //   this.onTouched();
//     // };

//     // reader.readAsDataURL(file); // Codifica como base64
//   }

//   clearFile() {
//     this.file = null;
//     this.fileName = '';

//     if (this.fileInput?.nativeElement) {
//       this.fileInput.nativeElement.value = '';
//     }

//     this.onChange(null);
//     this.onTouched();
//   }

//   descargarTap(event: any, archivo: any) {
//     event.preventDefault();
//     this.onDownload?.({ data: archivo });
//   }

//   private isAcceptedExtension(fileName: string): boolean {
//     if (!this.accept) return true;
//     const allowed = this.accept.split(',').map(e => e.trim().toLowerCase());
//     const ext = '.' + fileName.split('.').pop()?.toLowerCase();
//     return allowed.includes(ext);
//   }
// }

@Component({
  selector: 'file-input-wrapper',
  templateUrl: './file-input-wrapper.component.html',
  standalone: false,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FileInputWrapperComponent),
    multi: true
  }]
})
export class FileInputWrapperComponent implements ControlValueAccessor {
  @Input() accept: string = '';
  @Input() maxSizeMB: number = 10;
  @Input() maxFiles: number = 4;
  @Input() label: string = 'Seleccionar archivos';
  @Input() campo!: any;
  @Input() control!: FormControl;
  @Input() placeholder = '';
  @Input() hiddenLabel = false;

  @Output() download = new EventEmitter<any>();
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  fileNames: string[] = [];
  private files: File[] = [];

  private onChange = (_: any) => {};
  private onTouched = () => {};

  constructor(
    @Optional() @Inject(ON_DOWNLOAD_TOKEN) private onDownload?: (payload: any) => void
  ) {}

  writeValue(value: any): void {
    if (Array.isArray(value)) {
      this.files = value;
      this.fileNames = value.map(f => f.name ?? f.nombre ?? '');
    } else {
      this.clearFiles();
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) return;

    const selectedFiles = Array.from(input.files);

    if (selectedFiles.length > this.maxFiles) {
      alert(`Solo puedes seleccionar hasta ${this.maxFiles} archivos`);
      return this.clearFiles();
    }

    for (const file of selectedFiles) {
      if (this.accept && !this.isAcceptedExtension(file.name)) {
        alert(`Extensión no permitida: ${file.name}`);
        return this.clearFiles();
      }

      if (file.size > this.maxSizeMB * 1024 * 1024) {
        alert(`El archivo ${file.name} excede el máximo de ${this.maxSizeMB} MB`);
        return this.clearFiles();
      }
    }

    this.files = selectedFiles;
    this.fileNames = selectedFiles.map(file => file.name);

    this.control.setValue(this.files);
    this.control.markAsDirty();
    this.control.markAsTouched();

    this.onChange(this.files);
    this.onTouched();
  }

  removeFile(index: number) {
    this.files.splice(index, 1);
    this.fileNames.splice(index, 1);

    const value = this.files.length > 0 ? this.files : null;

    this.control.setValue(value);
    this.control.markAsDirty();
    this.control.markAsTouched();

    this.onChange(value);
    this.onTouched();

    if (this.fileInput?.nativeElement) {
      this.fileInput.nativeElement.value = '';
    }
  }

  clearFiles() {
    this.files = [];
    this.fileNames = [];

    if (this.fileInput?.nativeElement) {
      this.fileInput.nativeElement.value = '';
    }

    this.control?.setValue(null);
    this.onChange(null);
    this.onTouched();
  }

  descargarTap(event: any, archivo: any) {
    event.preventDefault();
    this.onDownload?.({ data: archivo });
  }

  private isAcceptedExtension(fileName: string): boolean {
    if (!this.accept) return true;

    const allowed = this.accept
      .split(',')
      .map(e => e.trim().toLowerCase());

    const ext = '.' + fileName.split('.').pop()?.toLowerCase();

    return allowed.includes(ext);
  }
}