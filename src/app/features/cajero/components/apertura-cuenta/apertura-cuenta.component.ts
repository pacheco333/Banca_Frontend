import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AperturaService, VerificarClienteResponse, AperturarCuentaResponse } from '../../../../core/services/apertura.service';

@Component({
  selector: 'app-apertura-cuenta',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './apertura-cuenta.component.html',
  styleUrls: ['./apertura-cuenta.component.css']
})
export class AperturaCuentaComponent {

  iconoEstado: string = '';

  // Datos del formulario
  tipoDocumento: string = '';
  numeroDocumento: string = '';
  nombreCompleto: string = '';
  depositoInicial: string = '';
  valorDeposito: number = 0;
  codigoCheque: string = '';
  numeroCheque: string = '';
  numeroCuenta: string = '';

  // Control de estado
  clienteVerificado: boolean = false;
  estadoSolicitud: string = '';
  mensajeEstado: string = '';
  idSolicitud: number | null = null;
  mostrarFormularioDeposito: boolean = false;
  cuentaAperturada: boolean = false;

  // Datos del comprobante
  datosComprobante: any = null;

  constructor(private aperturaService: AperturaService) {}

  buscarCliente() {
    if (!this.tipoDocumento || !this.numeroDocumento) {
      alert('Por favor ingrese el tipo y número de documento');
      return;
    }

    this.aperturaService.verificarCliente({
      tipoDocumento: this.tipoDocumento,
      numeroDocumento: this.numeroDocumento
    }).subscribe({
      next: (respuesta: VerificarClienteResponse) => {
        this.clienteVerificado = true;
        this.estadoSolicitud = respuesta.estado;
        this.mensajeEstado = respuesta.mensaje;
        this.nombreCompleto = respuesta.nombreCompleto || '';
        this.idSolicitud = respuesta.idSolicitud || null;
        this.iconoEstado = respuesta.icono || 'info';

        // Si está aprobada, mostrar formulario de depósito
        if (respuesta.estado === 'Aprobada') {
          this.mostrarFormularioDeposito = true;
        } else {
          this.mostrarFormularioDeposito = false;
        }
      },
      error: (error) => {
        console.error('Error al verificar cliente:', error);
        alert('Error al conectar con el servidor. Verifique que el backend esté corriendo.');
      }
    });
  }

  abrirCuenta() {
    if (!this.idSolicitud) {
      alert('No hay una solicitud válida para aperturar');
      return;
    }

    if (!this.depositoInicial) {
      alert('Seleccione el tipo de depósito inicial');
      return;
    }

    // Validar cheque si es necesario
    if (this.depositoInicial === 'Cheque') {
      if (!this.codigoCheque || !this.numeroCheque) {
        alert('Para depósito con cheque debe ingresar código y número de cheque');
        return;
      }
    }

    // Preparar datos
    const datosApertura = {
      idSolicitud: this.idSolicitud,
      tipoDeposito: this.depositoInicial,
      valorDeposito: Number(this.valorDeposito) || 0,
      codigoCheque: this.depositoInicial === 'Cheque' ? this.codigoCheque : undefined,
      numeroCheque: this.depositoInicial === 'Cheque' ? this.numeroCheque : undefined
    };

    this.aperturaService.aperturarCuenta(datosApertura).subscribe({
      next: (respuesta: AperturarCuentaResponse) => {
        if (respuesta.exito) {
          this.cuentaAperturada = true;
          this.numeroCuenta = respuesta.numeroCuenta || '';

          // Guardar datos del comprobante
          this.datosComprobante = {
            numeroCuenta: respuesta.numeroCuenta,
            nombreCliente: this.nombreCompleto,
            tipoDocumento: this.tipoDocumento,
            numeroDocumento: this.numeroDocumento,
            tipoDeposito: this.depositoInicial,
            valorDeposito: this.valorDeposito,
            fecha: new Date(),
            idTransaccion: respuesta.idTransaccion
          };

          alert('✅ ' + respuesta.mensaje + '\nNúmero de cuenta: ' + respuesta.numeroCuenta);
        } else {
          alert('❌ ' + respuesta.mensaje);
        }
      },
      error: (error) => {
        console.error('Error al aperturar cuenta:', error);
        alert('Error al procesar la apertura. Intente nuevamente.');
      }
    });
  }

  limpiarFormulario() {
    this.tipoDocumento = '';
    this.numeroDocumento = '';
    this.nombreCompleto = '';
    this.depositoInicial = '';
    this.valorDeposito = 0;
    this.codigoCheque = '';
    this.numeroCheque = '';
    this.numeroCuenta = '';
    this.clienteVerificado = false;
    this.mostrarFormularioDeposito = false;
    this.cuentaAperturada = false;
    this.datosComprobante = null;
    this.estadoSolicitud = '';
    this.mensajeEstado = '';
    this.idSolicitud = null;
  }

  imprimirComprobante() {
    window.print();
  }
}
