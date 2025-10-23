import { Routes } from '@angular/router';
import { DirectorOperativoLayoutComponent } from './layout/director-operativo-layout.component';

export const DIRECTOR_OPERATIVO_ROUTES: Routes = [
  {
    path: '',
    component: DirectorOperativoLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'consultar-solicitudes',
        pathMatch: 'full'
      },
      {
        path: 'consultar-solicitudes',
        loadComponent: () =>
          import('./components/consultar-solicitudes/consultar-solicitudes.component').then(
            (m) => m.ConsultarSolicitudes
          ),
      }
    ]
  }
];

