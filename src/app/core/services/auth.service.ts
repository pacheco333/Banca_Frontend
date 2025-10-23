import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type UserRole = 'cajero' | 'asesor' | 'admin' | 'director-operativo' |  null;

export interface User {
  nombre: string;
  rol: UserRole;
  iniciales: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    // Simular usuario cajero por defecto
    this.setCurrentUser({
      nombre: 'María González',
      rol: 'director-operativo',
      iniciales: 'MG'
    });
  }

  setCurrentUser(user: User | null) {
    this.currentUserSubject.next(user);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  getUserRole(): UserRole {
    return this.currentUserSubject.value?.rol || null;
  }

  hasRole(role: UserRole): boolean {
    return this.getUserRole() === role;
  }

  logout() {
    this.currentUserSubject.next(null);
  }
}
