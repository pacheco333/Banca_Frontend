import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // 🔥 Esto permite inyectar el servicio globalmente
})
export class AsesorService {
  private apiUrl = 'http://localhost:3000/api'; // Ajusta si tu backend usa otro prefijo

  constructor(private http: HttpClient) {}

  buscarCliente(numeroDocumento: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/asesor/cliente/${numeroDocumento}`);
  }
  // Método para registrar cliente
  registrarCliente(payload: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/asesor/registrar-cliente`, payload);
  }

}
