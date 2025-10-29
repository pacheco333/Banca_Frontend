import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DirectorOperativo, Solicitud } from '../../services/consultar.service';

@Component({
  selector: 'app-consultar-solicitudes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './consultar-solicitudes.component.html',
  styleUrl: './consultar-solicitudes.component.css'
})
export class ConsultarSolicitudes implements OnInit {
  codigoAsesor: string = '';
  solicitudes: Solicitud[] = [];

  constructor(private directorService: DirectorOperativo) {}

  ngOnInit() {
    this.cargarSolicitudesRecientes();
  }

  buscar() {
    if (this.codigoAsesor.trim()) {
      this.solicitudes = this.directorService.buscarPorAsesor(this.codigoAsesor);
    }
  }

  cargarSolicitudesRecientes() {
    this.solicitudes = this.directorService.obtenerSolicitudesRecientes();
  }

  verDetalle(solicitud: Solicitud) {
    console.log('Ver detalle de solicitud:', solicitud);
  }
}