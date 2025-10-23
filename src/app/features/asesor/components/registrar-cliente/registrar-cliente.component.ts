import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { AsesorService } from '../../services/asesor.service';

@Component({
  selector: 'app-registrar-cliente',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTabsModule, MatButtonModule],
  templateUrl: './registrar-cliente.component.html',
  styleUrls: ['./registrar-cliente.component.css'],
})
export class RegistrarClienteComponent {
  activeTabIndex = 0; // controla la pestaña activa
  formData: any = {
    infoPersonal: {},
    contactoPersonal: {},
    infoLaboral: {},
    factaCrs: {}
  };

  constructor(private asesorService: AsesorService) {}

  // Avanza a la siguiente pestaña
  nextTab() {
    if (this.activeTabIndex < 3) this.activeTabIndex++;
  }

  // Retrocede a la pestaña anterior
  prevTab() {
    if (this.activeTabIndex > 0) this.activeTabIndex--;
  }

  // Guarda el cliente completo
  guardarCliente() {
    console.log('Datos a enviar:', this.formData);
    this.asesorService.registrarCliente(this.formData).subscribe({
      next: (res) => {
        alert('Cliente registrado con éxito');
      },
      error: (err: any) => {
        console.error('Error al registrar cliente:', err);
        alert('Error al registrar cliente');
      },
    });
  }
}

// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { AsesorService } from '../../services/asesor.service';

// @Component({
//   selector: 'app-registrar-cliente',
//   standalone: true,
//   imports: [
//     CommonModule,
//     FormsModule,
//   ],
//   templateUrl: './registrar-cliente.component.html',
//   styleUrls: ['./registrar-cliente.component.css']
// })
// export class RegistrarClienteComponent {

//   // pestaña activa
//   selectedIndex = 0;

//   // 🔹 Información Personal
//   personal = {
//     tipo_documento: '',
//     numero_documento: '',
//     lugar_expedicion: '',
//     ciudad_nacimiento: '',
//     fecha_nacimiento: '',
//     fecha_expedicion: '',
//     primer_nombre: '',
//     segundo_nombre: '',
//     primer_apellido: '',
//     segundo_apellido: '',
//     genero: '',
//     nacionalidad: '',
//     otra_nacionalidad: '',
//     estado_civil: '',
//     grupo_etnico: ''
//   };

//   // 🔹 Contacto Personal
//   contacto = {
//     direccion: '',
//     barrio: '',
//     departamento: '',
//     telefono: '',
//     ciudad: '',
//     pais: '',
//     correo: '',
//     bloque_torre: '',
//     apto_casa: ''
//   };

//   // 🔹 Información Laboral y Financiera
//   laboral = {
//     nombre_empresa: '',
//     direccion_empresa: '',
//     pais_empresa: '',
//     departamento_empresa: '',
//     ciudad_empresa: '',
//     telefono_empresa: '',
//     ext: '',
//     celular_empresa: '',
//     correo_laboral: '',
//     ingresos_mensuales: 0,
//     egresos_mensuales: 0,
//     total_activos: 0,
//     total_pasivos: 0,
//     profesion: '',
//     ocupacion: '',
//     codigo_CIIU: '',
//     detalle_actividad: '',
//     numero_empleados: 0
//   };

//   // 🔹 FACTA y CRS
//   facta = {
//     es_residente_extranjero: 'No',
//     pais: ''
//   };

//   constructor(private asesorService: AsesorService) {}

//   siguienteTab() {
//     if (this.selectedIndex < 3) {
//       this.selectedIndex++;
//     }
//   }

//   anteriorTab() {
//     if (this.selectedIndex > 0) {
//       this.selectedIndex--;
//     }
//   }

//   guardarCliente() {
//     const payload = {
//       personal: this.personal,
//       contacto: this.contacto,
//       laboral: this.laboral,
//       facta: this.facta
//     };

//     this.asesorService.registrarCliente(payload).subscribe({
//       next: (res) => {
//         alert('✅ Cliente registrado correctamente');
//         console.log(res);
//       },
//       error: (err) => {
//         alert('❌ Error al registrar cliente');
//         console.error(err);
//       }
//     });
//   }
// }
