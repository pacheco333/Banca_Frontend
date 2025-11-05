import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contacto-personal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contacto-personal.component.html',
})
export class ContactoPersonalComponent {
  form: FormGroup;

  // 📤 Emite los datos al padre cuando se guarda
  @Output() formChange = new EventEmitter<any>();

  // // 📤 Pide avanzar a la siguiente pestaña
  // @Output() nextTab = new EventEmitter<void>();

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      direccion: ['', Validators.required],
      barrio: [''],
      departamento: ['', Validators.required],
      ciudad: ['', Validators.required],
      pais: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.minLength(7)]],
      correo: ['', [Validators.required, Validators.email]],
      bloqueTorre: [''],
      aptoCasa: [''],
    });
  }

  // 💾 Guarda la sección y notifica al padre
  guardarSeccion() {
    if (this.form.valid) {
      this.formChange.emit(this.form.value); // igual que informacion-personal
      // this.nextTab.emit(); // pasa automáticamente a la siguiente pestaña
      alert('📤 Datos de contacto guardados correctamente');
    } else {
      this.form.markAllAsTouched();
      alert('⚠️ Por favor completa los campos obligatorios antes de continuar.');
    }
  }
}



// import { Component, EventEmitter, Output } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

// @Component({
//   selector: 'app-contacto-personal',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule],
//   templateUrl: './contacto-personal.component.html',
// })
// export class ContactoPersonalComponent {
//   // 🧠 Formulario reactivo
//   form: FormGroup;

//   // 📤 Emite los cambios hacia el componente padre (registrar-cliente)
//   @Output() formChange = new EventEmitter<any>();

//   constructor(private fb: FormBuilder) {
//     // ✅ Inicializamos el formulario con validaciones básicas
//     this.form = this.fb.group({
//       direccion: ['', Validators.required],
//       barrio: [''],
//       departamento: ['', Validators.required],
//       ciudad: ['', Validators.required],
//       pais: ['', Validators.required],
//       telefono: ['', [Validators.required, Validators.minLength(7)]],
//       correo: ['', [Validators.required, Validators.email]],
//       bloqueTorre: [''],
//       aptoCasa: [''],
//     });

//     // 🔁 Emite los datos al padre cada vez que el formulario es válido
//     this.form.valueChanges.subscribe((value) => {
//       if (this.form.valid) {
//         this.formChange.emit(this.form.value);
//       }
//     });
//   }
// }
