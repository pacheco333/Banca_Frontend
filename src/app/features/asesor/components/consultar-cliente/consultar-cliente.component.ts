import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AsesorService, BuscarClienteResponse } from '../../../../core/services/asesor.service';

@Component({
  selector: 'app-consultar-cliente',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './consultar-cliente.component.html',
  styleUrls: ['./consultar-cliente.component.css']
})
export class ConsultarClienteComponent {

  numeroDocumento: string = '';
  cliente: BuscarClienteResponse | null = null;
  mensaje: string = '';
  buscando: boolean = false;

  constructor(private asesorService: AsesorService) {}

  buscarCliente() {
    if (!this.numeroDocumento.trim()) {
      alert('Por favor ingrese un número de documento');
      return;
    }

    this.buscando = true;
    this.asesorService.buscarCliente({ numeroDocumento: this.numeroDocumento }).subscribe({
      next: (resp) => {
        this.buscando = false;
        this.mensaje = resp.mensaje;
        this.cliente = resp.existe ? resp : null;
      },
      error: (err) => {
        this.buscando = false;
        console.error('Error al buscar cliente:', err);
        alert('No se pudo conectar con el servidor.');
      }
    });
  }

  limpiar() {
    this.numeroDocumento = '';
    this.mensaje = '';
    this.cliente = null;
  }
}

// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { AsesorService, BuscarClienteResponse } from '../../../../core/services/asesor.service';

// @Component({
//   selector: 'app-consultar-cliente',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './consultar-cliente.component.html',
//   styleUrls: ['./consultar-cliente.component.css']
// })
// export class ConsultarClienteComponent {

//   numeroDocumento: string = '';
//   clienteEncontrado: boolean = false;
//   mensaje: string = '';
//   cliente: BuscarClienteResponse | null = null;

//   constructor(private asesorService: AsesorService) {}

//   buscarCliente() {
//     if (!this.numeroDocumento.trim()) {
//       alert('Por favor ingrese un número de documento');
//       return;
//     }

//     this.asesorService.buscarCliente({ numeroDocumento: this.numeroDocumento }).subscribe({
//       next: (respuesta: BuscarClienteResponse) => {
//         this.mensaje = respuesta.mensaje;
//         this.clienteEncontrado = respuesta.existe;
//         this.cliente = respuesta.existe ? respuesta : null;
//       },
//       error: (err) => {
//         console.error('Error al consultar cliente:', err);
//         alert('Error de conexión con el servidor. Verifique que el backend esté ejecutándose.');
//       }
//     });
//   }

//   limpiar() {
//     this.numeroDocumento = '';
//     this.clienteEncontrado = false;
//     this.mensaje = '';
//     this.cliente = null;
//   }
// }
