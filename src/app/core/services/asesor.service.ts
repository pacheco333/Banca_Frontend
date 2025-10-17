import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface BuscarClienteRequest {
  numeroDocumento: string;
}

export interface BuscarClienteResponse {
  existe: boolean;
  mensaje: string;
  nombreCompleto?: string;
  tipoDocumento?: string;
  numeroDocumento?: string;
  direccion?: string;
  telefono?: string;
  correo?: string;
  estado?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AsesorService {
  private apiUrl = 'http://localhost:3000/api/asesor'; // se ajustará luego en backend

  constructor(private http: HttpClient) {}

  buscarCliente(datos: BuscarClienteRequest): Observable<BuscarClienteResponse> {
    return this.http.post<BuscarClienteResponse>(`${this.apiUrl}/buscar-cliente`, datos);
  }
}

// buscarCliente(datos: BuscarClienteRequest): Observable<BuscarClienteResponse> {
//   const mock: BuscarClienteResponse = {
//     existe: datos.numeroDocumento === '12345678',
//     mensaje: datos.numeroDocumento === '12345678'
//       ? 'Cliente encontrado correctamente.'
//       : 'No se encontró ningún cliente con ese documento.',
//     nombreCompleto: 'Juan Pérez',
//     tipoDocumento: 'CC',
//     numeroDocumento: datos.numeroDocumento,
//     direccion: 'Calle 10 #5-30',
//     telefono: '3101234567',
//     correo: 'juanperez@example.com',
//     estado: 'Activo'
//   };
//   return new Observable(observer => {
//     setTimeout(() => {
//       observer.next(mock);
//       observer.complete();
//     }, 1000);
//   });
// }
