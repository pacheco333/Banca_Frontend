import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-informacion-personal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './informacion-personal.component.html',
})
export class InformacionPersonalComponent {

  form: FormGroup;

  // 📤 Emitir datos al padre solo cuando se presione "Guardar"
  @Output() formChange = new EventEmitter<any>();
  @Output() nextTab = new EventEmitter<void>();

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      tipoDocumento: ['', Validators.required],
      numeroDocumento: ['', [Validators.required, Validators.minLength(6)]],
      lugarExpedicion: ['', Validators.required],
      ciudadNacimiento: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      fechaExpedicion: ['', Validators.required],
      primerNombre: ['', Validators.required],
      segundoNombre: [''],
      primerApellido: ['', Validators.required],
      segundoApellido: [''],
      genero: ['', Validators.required],
      nacionalidad: ['', Validators.required],
      otraNacionalidad: [''],
      estadoCivil: ['', Validators.required],
      grupoEtnico: ['', Validators.required],
    });
  }

  // ✅ Método manual para guardar (sin bucle de valueChanges)
  guardarSeccion() {
    if (this.form.valid) {
      this.formChange.emit(this.form.value);
      this.nextTab.emit();
      console.log('✅ Datos personales guardados correctamente');
    } else {
      this.form.markAllAsTouched();
      alert('Por favor completa todos los campos obligatorios.');
    }
  }
}


// import { Component, EventEmitter, Output } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

// @Component({
//   selector: 'app-datos-personales',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule],
//   templateUrl: './informacion-personal.component.html',
// })
// export class InformacionPersonalComponent {
//   // 🧠 Formulario local de datos personales
//   form: FormGroup;

//   // 📤 Emite cambios del formulario al padre (registrar-cliente)
//   @Output() formChange = new EventEmitter<any>();

//   constructor(private fb: FormBuilder) {
//     // ✅ Inicialización del formulario con validaciones básicas
//     this.form = this.fb.group({
//       tipoDocumento: ['', Validators.required],
//       numeroDocumento: ['', [Validators.required, Validators.minLength(5)]],
//       lugarExpedicion: ['', Validators.required],
//       ciudadNacimiento: ['', Validators.required],
//       fechaNacimiento: ['', Validators.required],
//       fechaExpedicion: ['', Validators.required],
//       primerNombre: ['', Validators.required],
//       segundoNombre: [''],
//       primerApellido: ['', Validators.required],
//       segundoApellido: [''],
//       genero: ['', Validators.required],
//       nacionalidad: ['', Validators.required],
//       otraNacionalidad: [''],
//       estadoCivil: ['', Validators.required],
//       grupoEtnico: [''],
//     });

//     // 🔁 Escucha cada cambio del formulario y lo envía al padre automáticamente
//     this.form.valueChanges.subscribe((val) => {
//       if (this.form.valid) {
//         this.formChange.emit(this.form.value);
//       }
//     });
//   }
// }
