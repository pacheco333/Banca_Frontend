import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ProcesarConsignacionRequest {
  numeroCuenta: string;
  tipoConsignacion: 'Efectivo' | 'Cheque';
  valor: number;
  codigoCheque?: string;
  numeroCheque?: string;
}

export interface ProcesarConsignacionResponse {
  exito: boolean;
  mensaje: string;
  datos?: {
    idTransaccion: number;
    numeroCuenta: string;
    titular: string;
    numeroDocumento: string;
    saldoAnterior: number;
    saldoNuevo: number;
    valorConsignado: number;
    tipoConsignacion: string;
    codigoCheque?: string;
    numeroCheque?: string;
    fechaTransaccion: Date;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ConsignacionService {
  private apiUrl = 'http://localhost:3000/api/cajero/consignacion';

  constructor(private http: HttpClient) {}

  procesarConsignacion(datos: ProcesarConsignacionRequest): Observable<ProcesarConsignacionResponse> {
    return this.http.post<ProcesarConsignacionResponse>(`${this.apiUrl}/procesar`, datos);
  }
}
