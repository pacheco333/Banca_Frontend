import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AplicarNotaDebitoRequest {
  idCuenta: number;
  numeroDocumento: string;
  valor: number;
}

export interface AplicarNotaDebitoResponse {
  exito: boolean;
  mensaje: string;
  datos?: {
    idTransaccion: number;
    saldoAnterior: number;
    saldoNuevo: number;
    valor: number;
    fechaTransaccion: Date;
  };
}

@Injectable({
  providedIn: 'root'
})
export class NotaDebitoService {
  private apiUrl = 'http://localhost:3000/api/cajero/nota-debito';

  constructor(private http: HttpClient) {}

  aplicarNotaDebito(datos: AplicarNotaDebitoRequest): Observable<AplicarNotaDebitoResponse> {
    return this.http.post<AplicarNotaDebitoResponse>(
      `${this.apiUrl}/aplicar-nota-debito`,
      datos
    );
  }
}
