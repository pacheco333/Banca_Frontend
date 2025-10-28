import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RetiroService } from '../../services/retiro.service';
import { ConsignacionService } from '../../services/consignacion.service';

@Component({
  selector: 'app-consignacion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './consignacion.component.html',
  styleUrls: ['./consignacion.component.css']
})
export class ConsignacionComponent {
  consignacionForm: FormGroup;
  cuentaEncontrada = false;
  idCuenta: number = 0;
  consignacionRealizada = false;

  readonly MONTO_MAXIMO = 9999999999999;
  readonly MONTO_MINIMO = 1;
  readonly MAX_DIGITOS = 13;

  datosComprobante = {
    idTransaccion: 0,
    numeroCuenta: '',
    numeroDocumento: '',
    titular: '',
    valorConsignado: 0,
    tipoConsignacion: '',
    codigoCheque: '',
    numeroCheque: '',
    saldoAnterior: 0,
    saldoNuevo: 0,
    fecha: new Date()
  };

  constructor(
    private fb: FormBuilder,
    private retiroService: RetiroService,
    private consignacionService: ConsignacionService
  ) {
    this.consignacionForm = this.fb.group({
      numeroCuenta: ['', [Validators.required]],
      numeroDocumento: [''],
      saldoDisponible: [''],
      titular: [''],
      tipoConsignacion: ['', [Validators.required]],
      valor: ['', [Validators.required, Validators.min(this.MONTO_MINIMO)]],
      codigoCheque: [''],
      numeroCheque: ['']
    });
  }

  onInputValor(event: Event) {
    const input = event.target as HTMLInputElement;
    let valor = input.value.replace(/[^0-9]/g, '');

    if (valor.length > this.MAX_DIGITOS) {
      valor = valor.substring(0, this.MAX_DIGITOS);
    }

    input.value = valor;
    const numero = valor ? Number(valor) : 0;
    this.consignacionForm.patchValue({ valor: numero }, { emitEvent: false });
  }

  buscarCuenta() {
    const numeroCuenta = this.consignacionForm.get('numeroCuenta')?.value;

    if (!numeroCuenta) {
      alert('Por favor ingrese un número de cuenta');
      return;
    }

    this.retiroService.buscarCuenta({ numeroCuenta }).subscribe({
      next: (response) => {
        if (response.existe && response.datos) {
          this.cuentaEncontrada = true;
          this.idCuenta = response.datos.idCuenta;

          this.consignacionForm.patchValue({
            numeroDocumento: response.datos.numeroDocumento,
            titular: response.datos.titular,
            saldoDisponible: `$${response.datos.saldo.toLocaleString('es-CO')}`
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

  onProcesarConsignacion() {
    if (this.consignacionForm.invalid || !this.cuentaEncontrada) {
      alert('Por favor complete todos los campos requeridos');
      return;
    }

    const numeroCuenta = this.consignacionForm.get('numeroCuenta')?.value;
    const tipoConsignacion = this.consignacionForm.get('tipoConsignacion')?.value;
    const valor = this.consignacionForm.get('valor')?.value;
    const titular = this.consignacionForm.get('titular')?.value;
    const numeroDocumento = this.consignacionForm.get('numeroDocumento')?.value;

    const monto = parseFloat(valor);
    if (monto > this.MONTO_MAXIMO) {
      alert(`⚠️ El valor máximo permitido es $9,999,999,999,999`);
      return;
    }

    if (tipoConsignacion === 'Cheque') {
      const codigoCheque = this.consignacionForm.get('codigoCheque')?.value;
      const numeroCheque = this.consignacionForm.get('numeroCheque')?.value;

      if (!codigoCheque || !numeroCheque) {
        alert('⚠️ Para consignación con cheque debe ingresar código y número de cheque');
        return;
      }
    }

    const datosConsignacion = {
      numeroCuenta: numeroCuenta,
      tipoConsignacion: tipoConsignacion,
      valor: monto,
      codigoCheque: tipoConsignacion === 'Cheque' ? this.consignacionForm.get('codigoCheque')?.value : undefined,
      numeroCheque: tipoConsignacion === 'Cheque' ? this.consignacionForm.get('numeroCheque')?.value : undefined
    };

    this.consignacionService.procesarConsignacion(datosConsignacion).subscribe({
      next: (response) => {
        if (response.exito && response.datos) {
          alert(`${response.mensaje}\n\nSaldo anterior: $${response.datos.saldoAnterior.toLocaleString()}\nValor consignado: $${response.datos.valorConsignado.toLocaleString()}\nSaldo nuevo: $${response.datos.saldoNuevo.toLocaleString()}`);

          this.datosComprobante = {
            idTransaccion: response.datos.idTransaccion,
            numeroCuenta: numeroCuenta,
            numeroDocumento: numeroDocumento,
            titular: titular,
            valorConsignado: response.datos.valorConsignado,
            tipoConsignacion: tipoConsignacion,
            codigoCheque: response.datos.codigoCheque || '',
            numeroCheque: response.datos.numeroCheque || '',
            saldoAnterior: response.datos.saldoAnterior,
            saldoNuevo: response.datos.saldoNuevo,
            fecha: new Date(response.datos.fechaTransaccion)
          };

          this.consignacionRealizada = true;
        } else {
          alert(response.mensaje);
        }
      },
      error: (error) => {
        console.error('Error al procesar consignación:', error);
        alert('Error al procesar la consignación. Intente nuevamente.');
      }
    });
  }

  imprimirComprobante() {
    window.print();
  }

  limpiarFormulario() {
    this.consignacionForm.reset();
    this.cuentaEncontrada = false;
    this.idCuenta = 0;
    this.consignacionRealizada = false;
  }

  limpiarDatosCuenta() {
    this.cuentaEncontrada = false;
    this.idCuenta = 0;
    this.consignacionForm.patchValue({
      numeroDocumento: '',
      titular: ''
    });
  }

  onCancelar() {
    this.consignacionForm.reset();
    this.limpiarDatosCuenta();
  }
}
