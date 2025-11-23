import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EnviarTrasladoRequest {
  cajeroOrigen: string;
  cajeroDestino: string;
  monto: number;
}

export interface EnviarTrasladoResponse {
  exito: boolean;
  mensaje: string;
  datos?: {
    idTraslado: number;
    cajeroOrigen: string;
    cajeroDestino: string;
    monto: number;
    fechaEnvio: Date;
  };
}

export interface TrasladoPendiente {
  idTraslado: number;
  cajeroOrigen: string;
  monto: number;
  fechaEnvio: Date;
}

export interface ConsultarTrasladosResponse {
  exito: boolean;
  traslados: TrasladoPendiente[];
}

export interface AceptarTrasladoRequest {
  idTraslado: number;
  cajeroDestino: string;
}

export interface AceptarTrasladoResponse {
  exito: boolean;
  mensaje: string;
  datos?: {
    idTraslado: number;
    cajeroOrigen: string;
    cajeroDestino: string;
    monto: number;
    fechaEnvio: Date;
    fechaAceptacion: Date;
  };
}

@Injectable({
  providedIn: 'root'
})
export class TrasladoService {
  private apiUrl = 'http://localhost:3000/api/cajero/traslado';

  constructor(private http: HttpClient) {}

  enviarTraslado(datos: EnviarTrasladoRequest): Observable<EnviarTrasladoResponse> {
    return this.http.post<EnviarTrasladoResponse>(`${this.apiUrl}/enviar`, datos);
  }

  consultarTrasladosPendientes(cajeroDestino: string): Observable<ConsultarTrasladosResponse> {
    return this.http.get<ConsultarTrasladosResponse>(
      `${this.apiUrl}/consultar-pendientes?cajeroDestino=${cajeroDestino}`
    );
  }

  aceptarTraslado(datos: AceptarTrasladoRequest): Observable<AceptarTrasladoResponse> {
    return this.http.post<AceptarTrasladoResponse>(`${this.apiUrl}/aceptar`, datos);
  }
}
