import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  const requiredRole = route.data['role'];
  const userRole = authService.getUserRole();

  if (userRole === requiredRole) {
    return true;
  }

  // Redirigir según el rol del usuario
  switch(userRole) {
    case 'cajero':
      router.navigate(['/cajero']);
      break;
      case 'director-operativo':
      router.navigate(['/director-operativo']);
      break;
    case 'asesor':
      router.navigate(['/asesor']);
      break;
    case 'admin':
      router.navigate(['/admin']);
      break;
    default:
      router.navigate(['/cajero']); // Por defecto ir a cajero
  }
  
  return false;
};
