import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-informacion-financiera',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './informacion-financiera.component.html',
})
export class InformacionFinancieraComponent {
  // 🧠 Formulario reactivo
  form: FormGroup;

  // 📤 Emisores hacia el componente padre
  @Output() formChange = new EventEmitter<any>();
  @Output() nextTab = new EventEmitter<void>();

  constructor(private fb: FormBuilder) {
    // ✅ Inicialización del formulario con validaciones numéricas completas
    this.form = this.fb.group({
      ingresosMensuales: [null, [
        Validators.required,
        Validators.min(0),
        Validators.max(999999999999),
        Validators.pattern(/^[0-9]+$/)
      ]],
      egresosMensuales: [null, [
        Validators.required,
        Validators.min(0),
        Validators.max(999999999999),
        Validators.pattern(/^[0-9]+$/)
      ]],
      totalActivos: [null, [
        Validators.required,
        Validators.min(0),
        Validators.max(999999999999),
        Validators.pattern(/^[0-9]+$/)
      ]],
      totalPasivos: [null, [
        Validators.required,
        Validators.min(0),
        Validators.max(999999999999),
        Validators.pattern(/^[0-9]+$/)
      ]],
    });

    // 🔁 Escucha los cambios del formulario y los emite al padre
    // this.form.valueChanges.subscribe(() => {
    //   if (this.form.valid) {
    //     this.formChange.emit(this.form.value);
    //   }
    // });
  }
    guardarSeccion() {
    if (this.form.valid) {
      this.formChange.emit(this.form.value);
      this.nextTab.emit();
      console.log('✅ Datos personales guardados:', this.form.value);
    } else {
      this.form.markAllAsTouched();
      alert('Por favor completa todos los campos obligatorios.');
    }
  }

  // 🔒 Método para permitir solo números
  soloNumeros(event: KeyboardEvent) {
    const pattern = /^[0-9]$/;
    const inputChar = event.key;
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  // 💾 Guardar y avanzar
  // guardarSeccion(): void {
  //   if (this.form.valid) {
  //     this.formChange.emit(this.form.value);
  //     this.nextTab.emit();
  //     alert('Sección de Información Financiera guardada correctamente ✅');
  //   } else {
  //     this.form.markAllAsTouched();
  //     alert('Por favor complete los campos obligatorios ⚠️');
  //   }
  // }
}

// import { Component, EventEmitter, Output } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

// @Component({
//   selector: 'app-informacion-financiera',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule],
//   templateUrl: './informacion-financiera.component.html',
// })
// export class InformacionFinancieraComponent {
//   // 🧠 Formulario reactivo
//   form: FormGroup;

//   // 📤 Emisor de datos al componente padre
//   @Output() formChange = new EventEmitter<any>();

//   constructor(private fb: FormBuilder) {
//     // ✅ Inicialización del formulario con validaciones numéricas básicas
//     this.form = this.fb.group({
//       ingresosMensuales: [0, [Validators.required, Validators.min(0)]],
//       egresosMensuales: [0, [Validators.required, Validators.min(0)]],
//       totalActivos: [0, [Validators.required, Validators.min(0)]],
//       totalPasivos: [0, [Validators.required, Validators.min(0)]],
//     });

//     // 🔁 Escucha los cambios del formulario y los emite al padre
//     this.form.valueChanges.subscribe((value) => {
//       if (this.form.valid) {
//         this.formChange.emit(this.form.value);
//       }
//     });
//   }
// }
