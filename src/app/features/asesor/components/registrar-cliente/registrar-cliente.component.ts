import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InformacionPersonalComponent } from './informacion-personal/informacion-personal.component';
import { ContactoPersonalComponent } from './contacto-personal/contacto-personal.component';
import { InformacionLaboralComponent } from './informacion-laboral/informacion-laboral.component';
import { InformacionFactacComponent } from './informacion-factca/informacion-factac.component';
import { AsesorService } from '../../services/asesor.service';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-registrar-cliente',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    FormsModule,
    InformacionPersonalComponent,
    ContactoPersonalComponent,
    InformacionLaboralComponent,
    InformacionFactacComponent,
  ],
  templateUrl: './registrar-cliente.component.html',
  styleUrls: ['./registrar-cliente.component.css'],
})
export class RegistrarClienteComponent {
  datosPersonales = {
    tipoDocumento: '',
    numeroDocumento: '',
    nombre: '',
    apellido: '',
    genero: '',
    estadoCivil: '',
    nacionalidad: '',
  };
  datosContacto = { telefono: '', email: '', direccion: '' };
  datosLaborales = { ocupacion: '', ingresos: '', empresa: '' };
  datosFactac = { ocupacion: '', ingresos: 0, empresa: '' };

  constructor(private asesorService: AsesorService) {}

  registrarCliente() {
    // Estructuramos el payload tal como lo espera el backend
    const payload = {
      // Información personal
      tipoDocumento: this.datosPersonales.tipoDocumento,
      numeroDocumento: this.datosPersonales.numeroDocumento,
      primerNombre: this.datosPersonales.nombre,
      primerApellido: this.datosPersonales.apellido,
      genero: this.datosPersonales.genero,
      estadoCivil: this.datosPersonales.estadoCivil,
      nacionalidad: this.datosPersonales.nacionalidad,

      // Contacto personal
      contacto: {
        direccion: this.datosContacto.direccion,
        telefono: this.datosContacto.telefono,
        correo: this.datosContacto.email,
      },

      // Información laboral
      laboral: {
        nombreEmpresa: this.datosLaborales.empresa,
        ingresos: this.datosLaborales.ingresos,
        ocupacion: this.datosLaborales.ocupacion,
      },

      // FACTA / CRS (por ahora con valores por defecto)
      facta: {
        esResidenteExtranjero: false,
        pais: 'Colombia',
      },
    };

    // Llamada al servicio
    this.asesorService.registrarCliente(payload).subscribe({
      next: (res) => {
        console.log('Respuesta del servidor:', res);
        alert('✅ Cliente registrado correctamente');
      },
      error: (err: any) => {
        console.error('❌ Error al registrar cliente:', err);
        alert('Ocurrió un error al registrar el cliente');
      },
    });
  }

  // registrarCliente() {
  //   const nuevoCliente = {
  //     ...this.datosPersonales,
  //     ...this.datosContacto,
  //     ...this.datosLaborales,
  //     ...this.datosFactac
  //   };

  //   this.asesorService.registrarCliente(nuevoCliente).subscribe({
  //     next: () => alert('Cliente registrado correctamente'),
  //     error: (err) => console.error('Error al registrar cliente', err)
  //   });
  // }
}
