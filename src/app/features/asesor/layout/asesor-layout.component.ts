import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-asesor-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, HeaderComponent],
  template: `
    <div class="flex min-h-screen bg-gray-100 overflow-hidden">
      <!-- Sidebar -->
      <app-sidebar [menuItems]="asesorMenuItems"></app-sidebar>
      
      <!-- Contenido principal -->
      <main class="flex-1 min-w-0 w-full overflow-x-hidden ">
        <app-header 
          [titulo]="'Panel de Asesor'" 
          [subtitulo]="'Sistema de Simulación Bancaria - Banca Uno'">
        </app-header>
        
        <div class="p-4 md:p-6 lg:p-8">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `
})
export class AsesorLayoutComponent {
  asesorMenuItems = [
    {
      titulo: 'Cuenta de Ahorros',
      items: [
        { label: 'Consultar Cliente', ruta: '/cajero/apertura' },
        { label: 'Registrar Cliente', ruta: '/cajero/retiro' },
        { label: 'Solicitar Producto', ruta: '/cajero/nota-debito' },
        { label: 'Solicitudes Radicadas', ruta: '/cajero/cancelacion' },
      ]
    }
  ];
}
