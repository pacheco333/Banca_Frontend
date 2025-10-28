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

  // Constantes alineadas con apertura
  readonly MONTO_MAXIMO = 9999999999999; // 13 dígitos
  readonly MONTO_MINIMO = 1; // Mínimo $1 para retiro
  readonly MAX_DIGITOS = 13;

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
    private retiroService: RetiroService
  ) {
    this.retiroForm = this.fb.group({
      numeroCuenta: ['', [Validators.required]],
      numeroDocumento: [''],
      titular: [''],
      saldoDisponible: [''],
      montoRetirar: ['', [Validators.required, Validators.min(this.MONTO_MINIMO)]]
    });
  }

  // Validar monto en tiempo real
  onInputMonto(event: Event) {
    const input = event.target as HTMLInputElement;
    let valor = input.value.replace(/[^0-9]/g, ''); // Solo números

    // Limitar a 13 dígitos
    if (valor.length > this.MAX_DIGITOS) {
      valor = valor.substring(0, this.MAX_DIGITOS);
    }

    // Actualizar input y formulario
    input.value = valor;
    const numero = valor ? Number(valor) : 0;
    this.retiroForm.patchValue({ montoRetirar: numero }, { emitEvent: false });
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

    // Validar monto máximo
    const monto = parseFloat(montoRetirar);
    if (monto > this.MONTO_MAXIMO) {
      alert(`⚠️ El monto máximo permitido es $9,999,999,999,999`);
      return;
    }

    const datosRetiro = {
      idCuenta: this.idCuenta,
      numeroDocumento: numeroDocumento,
      montoRetirar: monto
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
