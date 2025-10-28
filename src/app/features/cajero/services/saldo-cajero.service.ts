import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SaldoCajeroResponse {
  exito: boolean;
  saldos?: {
    saldoEfectivo: number;
    saldoCheques: number;
    total: number;
  };
  mensaje?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SaldoCajeroService {
  private apiUrl = 'http://localhost:3000/api/cajero/saldo';

  constructor(private http: HttpClient) {}

  obtenerSaldos(cajero: string): Observable<SaldoCajeroResponse> {
    return this.http.get<SaldoCajeroResponse>(`${this.apiUrl}/consultar?cajero=${cajero}`);
  }
}
