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
    loadChildren: () => import('./features/asesor/asesor.routes').then(m => m.ASESOR_ROUTES),
    canActivate: [roleGuard],
    data: { role: 'cajero' }
  }
  // Aquí agregarás asesor y admin después
];
