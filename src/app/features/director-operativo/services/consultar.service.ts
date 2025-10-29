import { Injectable } from '@angular/core';

export interface Solicitud {
  codigo: string;
  id: string;
  cedula: string;
  fecha: string;
  estado: 'PENDIENTE' | 'APROBADO' | 'RECHAZADO';
  producto: string;
  valor: number;
}

@Injectable({
  providedIn: 'root'
})
export class DirectorOperativo {
  private solicitudes: Solicitud[] = [
    {
      codigo: '1',
      id: '1',
      cedula: '12345678',
      fecha: '01/08/2025',
      estado: 'PENDIENTE',
      producto: 'Cuenta de ahorros',
      valor: 0
    },
    {
      codigo: '2',
      id: '2',
      cedula: '87654321',
      fecha: '02/08/2025',
      estado: 'APROBADO',
      producto: 'Cuenta de ahorros',
      valor: 0
    },
    {
      codigo: '3',
      id: '3',
      cedula: '11223344',
      fecha: '03/08/2025',
      estado: 'RECHAZADO',
      producto: 'Cuenta de ahorros',
      valor: 0
    }
  ];

  obtenerSolicitudesRecientes(): Solicitud[] {
    return this.solicitudes;
  }

  buscarPorAsesor(codigoAsesor: string): Solicitud[] {
    return this.solicitudes.filter(s => 
      s.codigo.includes(codigoAsesor) || 
      s.cedula.includes(codigoAsesor)
    );
  }
}