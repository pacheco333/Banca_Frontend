import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface RegistroUsuario {
  nombreCompleto: string;
  correo: string;
  contrasena: string;
}

@Component({
  selector: 'app-registrar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {
  registerForm!: FormGroup;
  isSubmitting: boolean = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.registerForm = this.fb.group({
      nombreCompleto: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
      ]],
      correo: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      ]],
      contrasena: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(50)
      ]]
    });
  }


  get nombreCompleto() {
    return this.registerForm.get('nombreCompleto');
  }

  get correo() {
    return this.registerForm.get('correo');
  }

  get contrasena() {
    return this.registerForm.get('contrasena');
  }


  hasError(fieldName: string): boolean {
    const field = this.registerForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getErrorMessage(fieldName: string): string {
    const field = this.registerForm.get(fieldName);
    
    if (!field || !field.errors) {
      return '';
    }

    if (field.errors['required']) {
      switch(fieldName) {
        case 'nombreCompleto':
          return 'Ingrese su nombre completo';
        case 'correo':
          return 'Ingrese un correo electrónico completo';
        case 'contrasena':
          return 'Ingrese una contraseña';
        default:
          return 'Este campo es requerido';
      }
    }

    if (field.errors['minlength']) {
      const minLength = field.errors['minlength'].requiredLength;
      if (fieldName === 'contrasena') {
        return `mínimo ${minLength} caracteres`;
      }
      return `Mínimo ${minLength} caracteres`;
    }

    if (field.errors['email'] || field.errors['pattern']) {
      if (fieldName === 'correo') {
        return 'Ingrese un correo electrónico válido';
      }
      if (fieldName === 'nombreCompleto') {
        return 'Solo se permiten letras y espacios';
      }
    }

    return 'Campo inválido';
  }

  onSubmit(): void {

    Object.keys(this.registerForm.controls).forEach(key => {
      this.registerForm.get(key)?.markAsTouched();
    });

    if (this.registerForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    const usuario: RegistroUsuario = this.registerForm.value;

    this.registrarUsuario(usuario);
  }

  private registrarUsuario(usuario: RegistroUsuario): void {
    setTimeout(() => {
      console.log('Usuario registrado:', usuario);
    
      alert('¡Registro exitoso! Bienvenido a ¡Únete!');  
      this.registerForm.reset();     
      this.isSubmitting = false;
    }, 1500);

  }

  volverAlLogin(): void {
    this.router.navigate(['/login']);
  }
}