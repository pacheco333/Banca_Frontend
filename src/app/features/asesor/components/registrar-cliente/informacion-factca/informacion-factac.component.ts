import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-facta',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './informacion-factca.component.html',
})
export class FactaComponent {
  // 🧠 Formulario reactivo FACTA/CRS
  form: FormGroup;

  // 📤 Emisores hacia el componente padre
  @Output() formChange = new EventEmitter<any>();
  @Output() nextTab = new EventEmitter<void>();

  constructor(private fb: FormBuilder) {
    // ✅ Inicialización con validaciones
    this.form = this.fb.group({
      esResidenteExtranjero: [null, Validators.required],
      pais: [''],
    });

    // 🔁 Validación condicional: si es residente extranjero, el país es obligatorio
    this.form.get('esResidenteExtranjero')?.valueChanges.subscribe(value => {
      const paisControl = this.form.get('pais');
      if (value === true) {
        paisControl?.setValidators([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
          Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
        ]);
      } else {
        paisControl?.clearValidators();
      }
      paisControl?.updateValueAndValidity();
    });
  }

  // 💾 Guardar sección y avanzar
  guardarSeccion(){
    if (this.form.valid) {
      this.formChange.emit(this.form.value);
      this.nextTab.emit();
      alert('Sección FACTA/CRS guardada correctamente ✅');
    } else {
      this.form.markAllAsTouched();
      alert('Por favor complete los campos obligatorios ⚠️');
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
}
