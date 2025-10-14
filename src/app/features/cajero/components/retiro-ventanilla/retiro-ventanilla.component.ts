import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-retiro-ventanilla',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './retiro-ventanilla.component.html',
  styleUrls: ['./retiro-ventanilla.component.css']
})
export class RetiroVentanillaComponent {
  retiroForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.retiroForm = this.fb.group({
      numeroCuenta: ['', [Validators.required, Validators.pattern(/^\d{4}-\d{3}-\d{5}$/)]],
      numeroDocumento: ['', [Validators.required]],
      titular: ['', [Validators.required]],
      saldoDisponible: [{ value: '', disabled: true }],
      montoRetirar: ['', [Validators.required, Validators.min(1)]]
    });
  }

  onAperturarCuenta() {
    if (this.retiroForm.valid) {
      console.log('Formulario válido:', this.retiroForm.value);
      // Aquí irá la lógica para procesar el retiro
    } else {
      console.log('Formulario inválido');
      this.retiroForm.markAllAsTouched();
    }
  }

  onCancelar() {
    this.retiroForm.reset();
  }
}
