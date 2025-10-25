import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RetiroService } from '../../services/retiro.service';
import { NotaDebitoService } from '../../services/nota-debito.service';

@Component({
  selector: 'app-nota-debito',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './nota-debito.component.html',
  styleUrls: ['./nota-debito.component.css']
})
export class NotaDebitoComponent {
  notaDebitoForm: FormGroup;
  cuentaEncontrada = false;
  idCuenta: number = 0;
  notaDebitoRealizada = false;

  datosComprobante = {
    idTransaccion: 0,
    numeroCuenta: '',
    numeroDocumento: '',
    titular: '',
    valor: 0,
    saldoAnterior: 0,
    saldoNuevo: 0,
    fecha: new Date()
  };

  constructor(
    private fb: FormBuilder,
    private retiroService: RetiroService,          // ← Para buscar cuenta
    private notaDebitoService: NotaDebitoService   // ← Para aplicar nota débito
  ) {
    this.notaDebitoForm = this.fb.group({
      numeroCuenta: ['', [Validators.required]],
      numeroDocumento: [''],
      titular: [''],
      valor: ['', [Validators.required, Validators.min(1)]]
    });
  }

  buscarCuenta() {
    const numeroCuenta = this.notaDebitoForm.get('numeroCuenta')?.value;

    if (!numeroCuenta) {
      alert('Por favor ingrese un número de cuenta');
      return;
    }

    // Reutilizar el servicio de retiro para buscar cuenta
    this.retiroService.buscarCuenta({ numeroCuenta }).subscribe({
      next: (response) => {
        if (response.existe && response.datos) {
          this.cuentaEncontrada = true;
          this.idCuenta = response.datos.idCuenta;

          this.notaDebitoForm.patchValue({
            numeroDocumento: response.datos.numeroDocumento,
            titular: response.datos.titular
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

  onAplicarNotaDebito() {
    if (this.notaDebitoForm.invalid || !this.cuentaEncontrada) {
      alert('Por favor complete todos los campos requeridos');
      return;
    }

    const numeroDocumento = this.notaDebitoForm.get('numeroDocumento')?.value;
    const valor = this.notaDebitoForm.get('valor')?.value;
    const numeroCuenta = this.notaDebitoForm.get('numeroCuenta')?.value;
    const titular = this.notaDebitoForm.get('titular')?.value;

    const datosNotaDebito = {
      idCuenta: this.idCuenta,
      numeroDocumento: numeroDocumento,
      valor: parseFloat(valor)
    };

    this.notaDebitoService.aplicarNotaDebito(datosNotaDebito).subscribe({
      next: (response) => {
        if (response.exito && response.datos) {
          alert(`${response.mensaje}\n\nSaldo anterior: $${response.datos.saldoAnterior.toLocaleString()}\nValor debitado: $${response.datos.valor.toLocaleString()}\nSaldo nuevo: $${response.datos.saldoNuevo.toLocaleString()}`);

          this.datosComprobante = {
            idTransaccion: response.datos.idTransaccion,
            numeroCuenta: numeroCuenta,
            numeroDocumento: numeroDocumento,
            titular: titular,
            valor: response.datos.valor,
            saldoAnterior: response.datos.saldoAnterior,
            saldoNuevo: response.datos.saldoNuevo,
            fecha: new Date(response.datos.fechaTransaccion)
          };

          this.notaDebitoRealizada = true;
        } else {
          alert(response.mensaje);
        }
      },
      error: (error) => {
        console.error('Error al aplicar nota débito:', error);
        alert('Error al aplicar la nota débito. Intente nuevamente.');
      }
    });
  }

  imprimirComprobante() {
    window.print();
  }

  limpiarFormulario() {
    this.notaDebitoForm.reset();
    this.cuentaEncontrada = false;
    this.idCuenta = 0;
    this.notaDebitoRealizada = false;
  }

  limpiarDatosCuenta() {
    this.cuentaEncontrada = false;
    this.idCuenta = 0;
    this.notaDebitoForm.patchValue({
      numeroDocumento: '',
      titular: ''
    });
  }

  onCancelar() {
    this.notaDebitoForm.reset();
    this.limpiarDatosCuenta();
  }
}
