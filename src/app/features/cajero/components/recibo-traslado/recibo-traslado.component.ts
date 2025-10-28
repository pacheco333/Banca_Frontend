import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrasladoService, TrasladoPendiente } from '../../services/traslado.service';

@Component({
  selector: 'app-recibo-traslado',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recibo-traslado.component.html',
  styleUrls: ['./recibo-traslado.component.css']
})
export class ReciboTrasladoComponent implements OnInit {
  trasladosPendientes: TrasladoPendiente[] = [];
  cargando = false;
  trasladoAceptado = false;

  // Cajero fijo del usuario actual
  cajeroActual = 'Cajero 01'; // ← CAMBIAR SEGÚN TU SISTEMA

  datosComprobante = {
    idTraslado: 0,
    cajeroOrigen: '',
    cajeroDestino: '',
    monto: 0,
    fechaEnvio: new Date(),
    fechaAceptacion: new Date()
  };

  constructor(private trasladoService: TrasladoService) {}

  ngOnInit() {
    this.cargarTrasladosPendientes();
  }

  cargarTrasladosPendientes() {
    this.cargando = true;
    this.trasladosPendientes = [];

    this.trasladoService.consultarTrasladosPendientes(this.cajeroActual).subscribe({
      next: (response) => {
        if (response.exito) {
          this.trasladosPendientes = response.traslados;
        }
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al cargar traslados:', error);
        alert('Error al cargar los traslados pendientes');
        this.cargando = false;
      }
    });
  }

  onAceptarTraslado(traslado: TrasladoPendiente) {
    const confirmar = confirm(
      `¿Confirma la recepción de este traslado?\n\n` +
      `De: ${traslado.cajeroOrigen}\n` +
      `Monto: $${traslado.monto.toLocaleString()}\n` +
      `Fecha: ${new Date(traslado.fechaEnvio).toLocaleString()}\n\n` +
      `Su saldo aumentará inmediatamente.`
    );

    if (!confirmar) {
      return;
    }

    const datosAceptacion = {
      idTraslado: traslado.idTraslado,
      cajeroDestino: this.cajeroActual
    };

    this.trasladoService.aceptarTraslado(datosAceptacion).subscribe({
      next: (response) => {
        if (response.exito && response.datos) {
          alert(`${response.mensaje}\n\nSu saldo ha sido actualizado.`);

          this.datosComprobante = {
            idTraslado: response.datos.idTraslado,
            cajeroOrigen: response.datos.cajeroOrigen,
            cajeroDestino: response.datos.cajeroDestino,
            monto: response.datos.monto,
            fechaEnvio: new Date(response.datos.fechaEnvio),
            fechaAceptacion: new Date(response.datos.fechaAceptacion)
          };

          this.trasladoAceptado = true;
        } else {
          alert(response.mensaje);
        }
      },
      error: (error) => {
        console.error('Error al aceptar traslado:', error);
        alert('Error al aceptar el traslado. Intente nuevamente.');
      }
    });
  }

  imprimirComprobante() {
    window.print();
  }

  volverATraslados() {
    this.trasladoAceptado = false;
    this.cargarTrasladosPendientes();
  }
}
