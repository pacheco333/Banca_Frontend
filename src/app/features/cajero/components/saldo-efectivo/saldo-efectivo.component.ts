import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaldoCajeroService } from '../../services/saldo-cajero.service';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-saldo-efectivo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './saldo-efectivo.component.html',
  styleUrls: ['./saldo-efectivo.component.css']
})
export class SaldoEfectivoComponent implements OnInit {
  saldoEfectivo: number = 0;
  fechaActualizacion: Date | null = null;
  cargando: boolean = true;
  cajeroActual: string = '';

  constructor(
    private saldoCajeroService: SaldoCajeroService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    // ✅ Obtener el nombre del usuario actual desde AuthService
    this.authService.currentUser.subscribe(user => {
      if (user) {
        this.cajeroActual = user.nombre;
        console.log('🔑 Cajero actual (Efectivo):', this.cajeroActual);
        this.cargarSaldo();
      }
    });
  }

  cargarSaldo() {
    if (!this.cajeroActual) {
      console.warn('⚠️ No hay cajero definido');
      return;
    }

    this.cargando = true;
    console.log('📦 Consultando saldo en efectivo para:', this.cajeroActual);

    this.saldoCajeroService.obtenerSaldos(this.cajeroActual).subscribe({
      next: (response) => {
        console.log('✅ Respuesta saldo efectivo:', response);
        if (response.exito && response.saldos) {
          this.saldoEfectivo = response.saldos.saldoEfectivo;
          this.fechaActualizacion = new Date();
        }
        this.cargando = false;
      },
      error: (error) => {
        console.error('❌ Error al cargar saldo:', error);
        alert('Error al cargar el saldo de efectivo');
        this.cargando = false;
      }
    });
  }

  refrescar() {
    this.cargarSaldo();
  }
}
