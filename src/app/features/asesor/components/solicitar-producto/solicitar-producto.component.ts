import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SolicitudService } from '../../services/solicitud.service';

@Component({
  selector: 'app-solicitar-producto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './solicitar-producto.component.html',
  styleUrl: './solicitar-producto.component.css'
})
export class SolicitarProductoComponent {
  cedula: string = '';
  producto: string = 'Cuenta de Ahorros (Persona natural)';
  comentario: string = '';
  archivoSeleccionado: string = '';
  archivoFile: File | null = null;

  constructor(private solicitudService: SolicitudService) {}

  buscarCliente(): void {
    if (this.cedula.trim()) {
      console.log('Buscando cliente con cédula:', this.cedula);
      this.solicitudService.buscarCliente(this.cedula).subscribe({
        next: (cliente) => {
          console.log('Cliente encontrado:', cliente);
          alert(`Cliente encontrado: ${cliente.nombre} ${cliente.apellido}`);
        },
        error: (error) => {
          console.error('Error al buscar cliente:', error);
        }
      });
    } else {
      alert('Por favor ingrese una cédula');
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.archivoFile = input.files[0];
      this.archivoSeleccionado = input.files[0].name;
    }
  }

  enviarSolicitud(): void {
    if (!this.cedula.trim()) {
      alert('Por favor ingrese la cédula del titular');
      return;
    }

    const solicitud = {
      cedula: this.cedula,
      producto: this.producto,
      comentario: this.comentario,
      archivo: this.archivoFile
    };

    console.log('Enviando solicitud:', solicitud);
    
    this.solicitudService.enviarSolicitud(solicitud).subscribe({
      next: (response) => {
        console.log('Solicitud enviada exitosamente:', response);
        alert('Solicitud enviada exitosamente');
        this.limpiarFormulario();
      },
      error: (error) => {
        console.error('Error al enviar solicitud:', error);
        alert('Error al enviar la solicitud');
      }
    });
  }

  cancelar(): void {
    this.limpiarFormulario();
  }

  private limpiarFormulario(): void {
    this.cedula = '';
    this.producto = 'Cuenta de Ahorros (Persona natural)';
    this.comentario = '';
    this.archivoSeleccionado = '';
    this.archivoFile = null;
  }
}