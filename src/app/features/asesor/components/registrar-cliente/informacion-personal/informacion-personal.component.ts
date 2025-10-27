import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-informacion-personal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './informacion-personal.component.html',
})
export class InformacionPersonalComponent implements OnInit {
  @Input() datosPersonales: any = {};
  @Output() datosPersonalesChange = new EventEmitter<any>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      tipoDocumento: [this.datosPersonales.tipoDocumento || '', Validators.required],
      numeroDocumento: [this.datosPersonales.numeroDocumento || '', Validators.required],
      nombre: [this.datosPersonales.nombre || '', Validators.required],
      apellido: [this.datosPersonales.apellido || '', Validators.required],
      genero: [this.datosPersonales.genero || '', Validators.required],
      estadoCivil: [this.datosPersonales.estadoCivil || '', Validators.required],
      nacionalidad: [this.datosPersonales.nacionalidad || '', Validators.required],
    });

    // Emitir los cambios al padre cada vez que cambie algo en el formulario
    this.form.valueChanges.subscribe(value => {
      this.datosPersonalesChange.emit(value);
    });
  }
}

//  import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

// @Component({
//   selector: 'app-informacion-personal',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule],
//   templateUrl: './informacion-personal.component.html',
// })
// export class InformacionPersonalComponent implements OnInit {
//   @Input() datosPersonales: any; // 👈 agrega esto
//   @Output() formReady = new EventEmitter<FormGroup>();
//   form!: FormGroup;

//   constructor(private fb: FormBuilder) {}

//   ngOnInit() {
//     this.form = this.fb.group({
//       tipo_documento: ['', Validators.required],
//       numero_documento: ['', Validators.required],
//       lugar_expedicion: [''],
//       ciudad_nacimiento: [''],
//       fecha_nacimiento: ['', Validators.required],
//       fecha_expedicion: [''],
//       primer_nombre: ['', Validators.required],
//       segundo_nombre: [''],
//       primer_apellido: ['', Validators.required],
//       segundo_apellido: [''],
//       genero: ['', Validators.required],
//       nacionalidad: ['', Validators.required],
//       otra_nacionalidad: [''],
//       estado_civil: ['', Validators.required],
//       grupo_etnico: ['', Validators.required],
//     });

//     this.formReady.emit(this.form);
//   }
// }
