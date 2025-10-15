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
        loadComponent: () => import('./components/consultar-cliente/consultar-cliente.component')
          .then(m => m.ConsultarClienteComponent)
      }
      // Aquí agregarás más rutas después
    ]
  }
];
