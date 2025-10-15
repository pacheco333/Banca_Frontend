import { Routes } from '@angular/router';
import { AsesorLayoutComponent } from './layout/asesor-layout.component';

export const ASESOR_ROUTES: Routes = [
  {
    path: '',
    component: AsesorLayoutComponent,
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
