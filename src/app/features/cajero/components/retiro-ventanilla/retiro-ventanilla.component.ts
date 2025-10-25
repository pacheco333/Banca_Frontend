import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RetiroService } from '../../services/retiro.service';

@Component({
  selector: 'app-retiro-ventanilla',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './retiro-ventanilla.component.html',
  styleUrls: ['./retiro-ventanilla.component.css']
})
export class RetiroVentanillaComponent {
  retiroForm: FormGroup;
  cuentaEncontrada = false;
  idCuenta: number = 0;
  retiroRealizado = false;

  datosComprobante = {
    idTransaccion: 0,
    numeroCuenta: '',
    numeroDocumento: '',
    titular: '',
    montoRetirado: 0,
    saldoAnterior: 0,
    saldoNuevo: 0,
    fecha: new Date()
  };

  constructor(
    private fb: FormBuilder,
    private retiroService: RetiroService  // ← Inyectar el service
  ) {
    this.retiroForm = this.fb.group({
      numeroCuenta: ['', [Validators.required]],
      numeroDocumento: [''],
      titular: [''],
      saldoDisponible: [''],
      montoRetirar: ['', [Validators.required, Validators.min(1)]]
    });
  }

  buscarCuenta() {
    const numeroCuenta = this.retiroForm.get('numeroCuenta')?.value;

    if (!numeroCuenta) {
      alert('Por favor ingrese un número de cuenta');
      return;
    }

    this.retiroService.buscarCuenta({ numeroCuenta }).subscribe({
      next: (response) => {
        if (response.existe && response.datos) {
          this.cuentaEncontrada = true;
          this.idCuenta = response.datos.idCuenta;

          this.retiroForm.patchValue({
            numeroDocumento: response.datos.numeroDocumento,
            titular: response.datos.titular,
            saldoDisponible: `$${response.datos.saldo.toLocaleString()}`
          });

          alert(response.mensaje);
        } else {
          alert(response.mensaje);
          this.limpiarDatosCuenta();
        }
      },
      error: (error) => {
        console.error('Error al buscar cuenta:', error);
        alert('Error al buscar la cuenta. Intente nuevamente.');
        this.limpiarDatosCuenta();
      }
    });
  }

  onRetirar() {
    if (this.retiroForm.invalid || !this.cuentaEncontrada) {
      alert('Por favor complete todos los campos requeridos');
      return;
    }

    const numeroDocumento = this.retiroForm.get('numeroDocumento')?.value;
    const montoRetirar = this.retiroForm.get('montoRetirar')?.value;
    const numeroCuenta = this.retiroForm.get('numeroCuenta')?.value;
    const titular = this.retiroForm.get('titular')?.value;

    const datosRetiro = {
      idCuenta: this.idCuenta,
      numeroDocumento: numeroDocumento,
      montoRetirar: parseFloat(montoRetirar)
    };

    this.retiroService.procesarRetiro(datosRetiro).subscribe({
      next: (response) => {
        if (response.exito && response.datos) {
          alert(`${response.mensaje}\n\nSaldo anterior: $${response.datos.saldoAnterior.toLocaleString()}\nMonto retirado: $${response.datos.montoRetirado.toLocaleString()}\nSaldo nuevo: $${response.datos.saldoNuevo.toLocaleString()}`);

          this.datosComprobante = {
            idTransaccion: response.datos.idTransaccion,
            numeroCuenta: numeroCuenta,
            numeroDocumento: numeroDocumento,
            titular: titular,
            montoRetirado: response.datos.montoRetirado,
            saldoAnterior: response.datos.saldoAnterior,
            saldoNuevo: response.datos.saldoNuevo,
            fecha: new Date(response.datos.fechaTransaccion)
          };

          this.retiroRealizado = true;
        } else {
          alert(response.mensaje);
        }
      },
      error: (error) => {
        console.error('Error al procesar retiro:', error);
        alert('Error al procesar el retiro. Intente nuevamente.');
      }
    });
  }

  imprimirComprobante() {
    window.print();
  }

  limpiarFormulario() {
    this.retiroForm.reset();
    this.cuentaEncontrada = false;
    this.idCuenta = 0;
    this.retiroRealizado = false;
  }

  limpiarDatosCuenta() {
    this.cuentaEncontrada = false;
    this.idCuenta = 0;
    this.retiroForm.patchValue({
      numeroDocumento: '',
      titular: '',
      saldoDisponible: ''
    });
  }

  onCancelar() {
    this.retiroForm.reset();
    this.limpiarDatosCuenta();
  }
}
