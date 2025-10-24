import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InformacionPersonalComponent } from './informacion-personal/informacion-personal.component';
import { ContactoPersonalComponent } from './contacto-personal/contacto-personal.component';
import { InformacionLaboralComponent } from './informacion-laboral/informacion-laboral.component';
import { AsesorService } from '../../services/asesor.service';

@Component({
  selector: 'app-registrar-cliente',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InformacionPersonalComponent,
    ContactoPersonalComponent,
    InformacionLaboralComponent
  ],
  templateUrl: './registrar-cliente.component.html',
  styleUrls: ['./registrar-cliente.component.css']
})
export class RegistrarClienteComponent {
  datosPersonales = { tipoDocumento: '', numeroDocumento: '', nombre: '', apellido: '' };
  datosContacto = { telefono: '', email: '', direccion: '' };
  datosLaborales = { ocupacion: '', ingresos: '', empresa: '' };

  constructor(private asesorService: AsesorService) {}

  registrarCliente() {
    const nuevoCliente = {
      ...this.datosPersonales,
      ...this.datosContacto,
      ...this.datosLaborales
    };

    this.asesorService.registrarCliente(nuevoCliente).subscribe({
      next: (res) => alert('Cliente registrado correctamente'),
      error: (err: any) => console.error('Error al registrar cliente', err)
    });
  }
}
