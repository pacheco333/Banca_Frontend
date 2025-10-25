import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // Datos del usuario
  user = {
    email: '',
    password: '',
    rol: ''
  };

  // Mensajes de error y éxito
  emailError: string | null = null;
  passwordError: string | null = null;
  rolError: string | null = null;
  successMessage: string | null = null;
  errorMessage: string = '';

  // URL de la API (ajústala según tu backend)
  private apiUrl = 'http://localhost:4200/api/login';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    // Reiniciar mensajes
    this.emailError = null;
    this.passwordError = null;
    this.rolError = null;
    this.successMessage = null;
    this.errorMessage = '';

    let valid = true;

    // ✅ Validar email
    if (!this.user.email) {
      this.emailError = 'El correo electrónico es obligatorio';
      valid = false;
    } else if (!this.user.email.includes('@')) {
      this.emailError = 'Debe ingresar un correo electrónico válido';
      valid = false;
    }

    // ✅ Validar contraseña
    if (!this.user.password) {
      this.passwordError = 'La contraseña es obligatoria';
      valid = false;
    } else if (this.user.password.length < 8) {
      this.passwordError = 'La contraseña debe tener al menos 8 caracteres';
      valid = false;
    }

    // ✅ Validar rol
    if (!this.user.rol) {
      this.rolError = 'Debe seleccionar un rol';
      valid = false;
    }

    // 🚫 Si no pasa las validaciones, no continúa
    if (!valid) return;

    // ✅ Si todo está correcto, llamar al backend
    const credentials = {
      username: this.user.email, // tu backend usa "username"
      password: this.user.password,
      rol: this.user.rol
    };

    this.http.post<any>(this.apiUrl, credentials).subscribe({
      next: (res) => {
        if (res && res.token) {
          // Guardar token
          localStorage.setItem('token', res.token);

          // Mostrar mensaje de éxito
          this.successMessage = '¡Inicio de sesión exitoso!';

          // Redirigir según el rol
          setTimeout(() => {
            if (this.user.rol === 'Administrador') {
              this.router.navigate(['/admin-dashboard']);
            } else if (this.user.rol === 'Cajero') {
              this.router.navigate(['/cajero-dashboard']);
            } else {
              this.router.navigate(['/cliente-dashboard']);
            }
          }, 1000);
        } else {
          this.errorMessage = 'Credenciales inválidas.';
        }
      },
      error: (err) => {
        console.error('Error en login:', err);
        this.errorMessage = 'Usuario o contraseña incorrectos.';
      }
    });
  }
}
