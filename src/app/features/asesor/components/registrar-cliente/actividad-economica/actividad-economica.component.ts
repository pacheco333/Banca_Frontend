import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-actividad-economica',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './actividad-economica.component.html',
})
export class ActividadEconomicaComponent {
  form: FormGroup;

  // 📤 Enviamos datos al padre al guardar (mismo nombre que en los demás módulos)
  @Output() formChange = new EventEmitter<any>();

  // 📤 Avisamos al padre que debe cambiar de pestaña
  @Output() nextTab = new EventEmitter<void>();

  
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      profesion: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
        Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
      ]],
      ocupacion: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
        Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
      ]],
      codigoCiiu: ['', [
        Validators.minLength(4),
        Validators.maxLength(6),
        Validators.pattern(/^[0-9]{4,6}$/)
      ]],
      detalleActividad: ['', [
        Validators.minLength(5),
        Validators.maxLength(500)
      ]],
      numeroEmpleados: [0, [
        Validators.required,
        Validators.min(0),
        Validators.max(999999),
        Validators.pattern(/^[0-9]+$/)
      ]],
      factaCrs: [false, Validators.required],
    });
  }

  // 💾 Guarda la sección y avisa al padre
  guardarSeccion() {
    if (this.form.valid) {
      this.formChange.emit(this.form.value); // <— cambia aquí
      this.nextTab.emit(); // <— igual que los demás módulos
      alert('📤 Datos de actividad económica guardados correctamente');
    } else {
      this.form.markAllAsTouched();
      alert('⚠️ Por favor completa los campos obligatorios.');
    }
  }

  // 🔒 Método para permitir solo letras y espacios
  soloLetras(event: KeyboardEvent) {
    const pattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]$/;
    const inputChar = event.key;
    if (!pattern.test(inputChar)) {
      event.preventDefault();
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

  // 🔒 Método para permitir alfanuméricos
  alfanumerico(event: KeyboardEvent) {
    const pattern = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s.,;:()\-]$/;
    const inputChar = event.key;
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
}


// import { Component, EventEmitter, Output } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

// @Component({
//   selector: 'app-actividad-economica',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule],
//   templateUrl: './actividad-economica.component.html',
// })
// export class ActividadEconomicaComponent {
//   // 🧠 Formulario reactivo
//   form: FormGroup;

//   // 📤 Emisor de cambios hacia el componente padre
//   @Output() formChange = new EventEmitter<any>();

//   constructor(private fb: FormBuilder) {
//     // ✅ Inicialización del formulario con validaciones
//     this.form = this.fb.group({
//       profesion: ['', Validators.required],
//       ocupacion: ['', Validators.required],
//       codigoCiiu: ['', Validators.required],
//       detalleActividad: [''],
//       numeroEmpleados: [0, [Validators.required, Validators.min(0)]],
//       factaCrs: [false, Validators.required],
//     });

//     // 🔁 Escucha los cambios del formulario y los envía al padre si son válidos
//     this.form.valueChanges.subscribe((value) => {
//       if (this.form.valid) {
//         this.formChange.emit(this.form.value);
//       }
//     });
//   }
// }
