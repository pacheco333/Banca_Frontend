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
      }
      // Aquí agregarás más rutas después
    ]
  }
];
