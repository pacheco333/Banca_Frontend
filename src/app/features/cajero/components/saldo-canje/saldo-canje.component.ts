import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaldoCajeroService } from '../../services/saldo-cajero.service';

@Component({
  selector: 'app-saldo-canje',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './saldo-canje.component.html',
  styleUrls: ['./saldo-canje.component.css']
})
export class SaldoCanjeComponent implements OnInit {
  saldoCheques: number = 0;
  fechaActualizacion: Date | null = null;
  cargando: boolean = true;

  constructor(private saldoCajeroService: SaldoCajeroService) { }

  ngOnInit() {
    this.cargarSaldo();
  }

  cargarSaldo() {
    this.cargando = true;
    const cajeroActual = 'Cajero 01';
    this.saldoCajeroService.obtenerSaldos(cajeroActual).subscribe({
      next: (response) => {
        if (response.exito && response.saldos) {
          this.saldoCheques = response.saldos.saldoCheques;
        }
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al cargar saldo:', error);
        alert('Error al cargar el saldo de cheques');
        this.cargando = false;
      }
    });
  }

  refrescar() {
    this.cargarSaldo();
  }
}
