import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-informacion-laboral',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './informacion-laboral.component.html',
})
export class InformacionLaboralComponent {
  // 🧠 Formulario reactivo
  form: FormGroup;

  // 📤 Emisores hacia el componente padre
  @Output() formChange = new EventEmitter<any>();
  // @Output() nextTab = new EventEmitter<void>();

  constructor(private fb: FormBuilder) { 
    // ✅ Inicializamos el formulario con validaciones básicas
    this.form = this.fb.group({
      nombreEmpresa: ['', Validators.required],
      direccionEmpresa: ['', Validators.required],
      paisEmpresa: ['', Validators.required],
      departamentoEmpresa: ['', Validators.required],
      ciudadEmpresa: ['', Validators.required],
      telefonoEmpresa: ['', [Validators.required, Validators.minLength(7)]],
      ext: [''],
      celularEmpresa: ['', [Validators.required, Validators.minLength(10)]],
      correoLaboral: ['', [Validators.required, Validators.email]],
    });

    // 🔁 Emitir cambios válidos al padre automáticamente
    // this.form.valueChanges.subscribe(() => {
    //   if (this.form.valid) {
    //     this.formChange.emit(this.form.value);
    //   }
    // });
  }
   guardarSeccion() {
    if (this.form.valid) {
      this.formChange.emit(this.form.value);
      // this.nextTab.emit();
      alert('✅ Datos personales guardados correctamente');
    } else {
      this.form.markAllAsTouched();
      alert('Por favor completa todos los campos obligatorios.');
    }
  }

  // 💾 Guardar sección y avanzar
  // guardarSeccion(): void {
  //   if (this.form.valid) {
  //     this.formChange.emit(this.form.value);
  //     this.nextTab.emit();
  //     alert('Sección de Información Laboral guardada correctamente ✅');
  //   } else {
  //     this.form.markAllAsTouched();
  //     alert('Por favor complete todos los campos obligatorios ⚠️');
  //   }
  // }
}

// import { Component, EventEmitter, Output } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

// @Component({
//   selector: 'app-informacion-laboral',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule],
//   templateUrl: './informacion-laboral.component.html',
// })
// export class InformacionLaboralComponent {
  
//   form: FormGroup;

//   // 📤 Emisor de los datos al componente padre
//   @Output() formChange = new EventEmitter<any>();

//   constructor(private fb: FormBuilder) { 
//     // ✅ Inicializamos el formulario con validaciones básicas
//     this.form = this.fb.group({
//       nombreEmpresa: ['', Validators.required],
//       direccionEmpresa: ['', Validators.required],
//       paisEmpresa: ['', Validators.required],
//       departamentoEmpresa: ['', Validators.required],
//       ciudadEmpresa: ['', Validators.required],
//       telefonoEmpresa: ['', [Validators.required, Validators.minLength(7)]],
//       ext: [''],
//       celularEmpresa: ['', [Validators.required, Validators.minLength(10)]],
//       correoLaboral: ['', [Validators.required, Validators.email]],
//     });

//     // 🔁 Emitir cambios válidos al padre automáticamente
//     this.form.valueChanges.subscribe((val) => {
//       if (this.form.valid) {
//         this.formChange.emit(this.form.value);
//       }
//     });
//   }
// }
