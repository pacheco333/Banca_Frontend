import { Routes } from '@angular/router';
import { RegistrarComponent } from './registrar.component';

export const registrarRoutes: Routes = [
  {
    path: '',
    component: RegistrarComponent,
    data: { 
      title: 'Crear Cuenta - ¡Únete!' 
    }
  }
];

export default registrarRoutes;