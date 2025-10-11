import { Routes } from '@angular/router';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/cajero',
    pathMatch: 'full'
  },
  {
    path: 'cajero',
    loadChildren: () => import('./features/cajero/cajero.routes').then(m => m.CAJERO_ROUTES),
    canActivate: [roleGuard],
    data: { role: 'cajero' }
  }
  // Aquí agregarás asesor y admin después
];
