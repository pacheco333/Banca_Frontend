import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-informacion-financiera',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './informacion-financiera.component.html',
})
export class InformacionFinancieraComponent implements OnInit {
  // 🧠 Formulario reactivo
  form: FormGroup;

  // 📤 Emisores hacia el componente padre
  @Input() datosIniciales: any; // ← AGREGAR ESTO para modo edición
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
  }

  ngOnInit() {
    // ← AGREGAR ESTE MÉTODO para cargar datos iniciales
    if (this.datosIniciales) {
      console.log('📥 Cargando datos iniciales en Información Personal:', this.datosIniciales);
      this.form.patchValue(this.datosIniciales);
    }

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
}

