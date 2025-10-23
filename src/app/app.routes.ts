import { Routes } from '@angular/router';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/asesor',
    pathMatch: 'full'
  },
  {
    path: 'asesor',
    loadChildren: () =>
      import('./features/asesor/asesor.routes').then(m => m.ASESOR_ROUTES),
    canActivate: [roleGuard],
    data: { role: 'asesor' }
  },
  {
    path: 'director-operativo',
    loadChildren: () =>
      import('./features/director-operativo/director-operativo.routes').then(
        m => m.DIRECTOR_OPERATIVO_ROUTES
      ),
    canActivate: [roleGuard],
    data: { role: 'director-operativo' }
  }

];
