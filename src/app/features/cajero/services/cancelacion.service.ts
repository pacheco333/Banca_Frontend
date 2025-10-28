import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CancelarCuentaRequest {
  numeroCuenta: string;
  numeroDocumento: string;
  motivoCancelacion: string;
}

export interface CancelarCuentaResponse {
  exito: boolean;
  mensaje: string;
  datos?: {
    idCuenta: number;
    numeroCuenta: string;
    titular: string;
    numeroDocumento: string;
    saldoFinal: number;
    motivoCancelacion: string;
    fechaCancelacion: Date;
  };
}

@Injectable({
  providedIn: 'root'
})
export class CancelacionService {
  private apiUrl = 'http://localhost:3000/api/cajero/cancelacion';

  constructor(private http: HttpClient) {}

  cancelarCuenta(datos: CancelarCuentaRequest): Observable<CancelarCuentaResponse> {
    return this.http.post<CancelarCuentaResponse>(`${this.apiUrl}/cancelar`, datos);
  }
}
