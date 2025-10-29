import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  private apiUrl = 'http://localhost:3000/api/asesor'; // Cambia esto por tu URL de API

  constructor(private http: HttpClient) {}

  buscarCliente(cedula: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/clientes/${cedula}`);
  }

  enviarSolicitud(solicitud: any): Observable<any> {
    const formData = new FormData();
    formData.append('cedula', solicitud.cedula);
    formData.append('producto', solicitud.producto);
    formData.append('comentario', solicitud.comentario);
    
    if (solicitud.archivo) {
      formData.append('archivo', solicitud.archivo, solicitud.archivo.name);
    }

    return this.http.post(`${this.apiUrl}/solicitudes`, formData);
  }

  obtenerSolicitudes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/solicitudes`);
  }

  obtenerSolicitudPorId(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/solicitudes/${id}`);
  }

  actualizarSolicitud(id: string, solicitud: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/solicitudes/${id}`, solicitud);
  }

  eliminarSolicitud(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/solicitudes/${id}`);
  }
}