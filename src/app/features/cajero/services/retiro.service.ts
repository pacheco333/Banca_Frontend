import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface BuscarCuentaRequest {
  numeroCuenta: string;
}

export interface BuscarCuentaResponse {
  existe: boolean;
  mensaje: string;
  datos?: {
    numeroCuenta: string;
    numeroDocumento: string;
    titular: string;
    saldo: number;
    estadoCuenta: string;
    idCuenta: number;
    idCliente: number;
  };
}

export interface ProcesarRetiroRequest {
  idCuenta: number;
  numeroDocumento: string;
  montoRetirar: number;
}

export interface ProcesarRetiroResponse {
  exito: boolean;
  mensaje: string;
  datos?: {
    idTransaccion: number;
    saldoAnterior: number;
    saldoNuevo: number;
    montoRetirado: number;
    fechaTransaccion: Date;
  };
}

@Injectable({
  providedIn: 'root'
})
export class RetiroService {
  private apiUrl = 'http://localhost:3000/api/cajero/retiro';

  constructor(private http: HttpClient) {}

  buscarCuenta(datos: BuscarCuentaRequest): Observable<BuscarCuentaResponse> {
    return this.http.post<BuscarCuentaResponse>(
      `${this.apiUrl}/buscar-cuenta`,
      datos
    );
  }

  procesarRetiro(datos: ProcesarRetiroRequest): Observable<ProcesarRetiroResponse> {
    return this.http.post<ProcesarRetiroResponse>(
      `${this.apiUrl}/procesar-retiro`,
      datos
    );
  }
}
