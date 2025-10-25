import { Routes } from '@angular/router';
import { CajeroLayoutComponent } from './layout/cajero-layout.component';

export const CAJERO_ROUTES: Routes = [
  {
    path: '',
    component: CajeroLayoutComponent,
    children: [
      { 
        path: '', 
        redirectTo: 'apertura', 
        pathMatch: 'full' 
      },
      { 
        path: 'apertura', 
        loadComponent: () => import('./components/apertura-cuenta/apertura-cuenta.component')
          .then(m => m.AperturaCuentaComponent)
      },
      { 
        path: 'retiro',                    // ← NUEVA RUTA
        loadComponent: () => import('./components/retiro-ventanilla/retiro-ventanilla.component')
          .then(m => m.RetiroVentanillaComponent)
      },
      { 
  path: 'nota-debito', 
  loadComponent: () => import('./components/nota-debito/nota-debito.component')
    .then(m => m.NotaDebitoComponent)
}

      
      // Aquí agregarás más rutas después
    ]
  }
];
