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
    InformacionFactacComponent
  ],
  templateUrl: './registrar-cliente.component.html',
  styleUrls: ['./registrar-cliente.component.css']
})
export class RegistrarClienteComponent {
  datosPersonales = { tipoDocumento: '', numeroDocumento: '', nombre: '', apellido: '' };
  datosContacto = { telefono: '', email: '', direccion: '' };
  datosLaborales = { ocupacion: '', ingresos: '', empresa: '' };
  datosFactac = { ocupacion: '', ingresos: 0, empresa: '' };
  

  constructor(private asesorService: AsesorService) {}

  registrarCliente() {
    const nuevoCliente = {
      ...this.datosPersonales,
      ...this.datosContacto,
      ...this.datosLaborales,
      ...this.datosFactac
    };

    this.asesorService.registrarCliente(nuevoCliente).subscribe({
      next: () => alert('Cliente registrado correctamente'),
      error: (err) => console.error('Error al registrar cliente', err)
    });
  }
}
