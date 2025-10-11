import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface VerificarClienteRequest {
  tipoDocumento: string;
  numeroDocumento: string;
}

export interface VerificarClienteResponse {
  existe: boolean;
  estado: string;
  mensaje: string;
  icono?: string;
  nombreCompleto?: string;
  idCliente?: number;
  idSolicitud?: number;
}

export interface AperturarCuentaRequest {
  idSolicitud: number;
  tipoDeposito: string;
  valorDeposito: number;
  codigoCheque?: string;
  numeroCheque?: string;
}

export interface AperturarCuentaResponse {
  exito: boolean;
  mensaje: string;
  numeroCuenta?: string;
  idCuenta?: number;
  idTransaccion?: number;
}

@Injectable({
  providedIn: 'root'
})
export class AperturaService {
  private apiUrl = 'http://localhost:3000/api/apertura';

  constructor(private http: HttpClient) {}

  verificarCliente(datos: VerificarClienteRequest): Observable<VerificarClienteResponse> {
    return this.http.post<VerificarClienteResponse>(`${this.apiUrl}/verificar-cliente`, datos);
  }

  aperturarCuenta(datos: AperturarCuentaRequest): Observable<AperturarCuentaResponse> {
    return this.http.post<AperturarCuentaResponse>(`${this.apiUrl}/aperturar-cuenta`, datos);
  }
}
