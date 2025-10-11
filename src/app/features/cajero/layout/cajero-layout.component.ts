import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-cajero-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, HeaderComponent],
  template: `
    <div class="flex min-h-screen bg-gray-100 overflow-hidden">
      <!-- Sidebar -->
      <app-sidebar [menuItems]="cajeroMenuItems"></app-sidebar>
      
      <!-- Contenido principal -->
      <main class="flex-1 min-w-0 w-full overflow-x-hidden ">
        <app-header 
          [titulo]="'Panel de Cajero'" 
          [subtitulo]="'Sistema de Simulación Bancaria - Banca Uno'">
        </app-header>
        
        <div class="p-4 md:p-6 lg:p-8">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `
})
export class CajeroLayoutComponent {
  cajeroMenuItems = [
    {
      titulo: 'Cuenta de Ahorros',
      items: [
        { label: 'Apertura de cuenta', ruta: '/cajero/apertura' },
        { label: 'Retiro por ventanilla', ruta: '/cajero/retiro' },
        { label: 'Nota débito', ruta: '/cajero/nota-debito' },
        { label: 'Cancelación de cuenta', ruta: '/cajero/cancelacion' },
        { label: 'Saldo Canje', ruta: '/cajero/saldo-canje' },
        { label: 'Traslado Cajero', ruta: '/cajero/traslado' },
        { label: 'Recibo Traslado', ruta: '/cajero/recibo-traslado' }
      ]
    }
  ];
}
