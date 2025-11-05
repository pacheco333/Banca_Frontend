import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AsesorService } from '../../../asesor/services/asesor.service';

// 🧩 Subcomponentes
import { InformacionPersonalComponent } from './informacion-personal/informacion-personal.component';
import { ContactoPersonalComponent } from './contacto-personal/contacto-personal.component';
import { InformacionLaboralComponent } from './informacion-laboral/informacion-laboral.component';
import { InformacionFinancieraComponent } from './informacion-financiera/informacion-financiera.component';
import { ActividadEconomicaComponent } from './actividad-economica/actividad-economica.component';
import { FactaComponent } from './informacion-factca/informacion-factac.component';

@Component({
  selector: 'app-registrar-cliente',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    InformacionPersonalComponent,
    ContactoPersonalComponent,
    InformacionLaboralComponent,
    InformacionFinancieraComponent,
    ActividadEconomicaComponent,
    FactaComponent,
  ],
  templateUrl: './registrar-cliente.component.html',
})
export class RegistrarClienteComponent {
  // 🌐 Control de pestañas
  pestanaActiva: string = 'datos-personales';

  // 🧠 Datos temporales de todos los subformularios
  clienteData: any = {
    datosPersonales: null,
    contacto: null,
    actividad: null,
    laboral: null,
    financiera: null,
    facta: null,
  };

  // Orden de las pestañas para moverse automáticamente
  ordenPestanas = [
    'datos-personales',
    'contacto-personal',
    'info-laboral',
    'facta',
  ];

  constructor(private asesorService: AsesorService, private fb: FormBuilder) {}

  // 🔁 Cambiar pestaña manualmente
  cambiarPestana(nombre: string) {
    this.pestanaActiva = nombre;
  }

  // ⏭️ Ir a la siguiente pestaña automáticamente
  irASiguientePestanaActual() {
    const indexActual = this.ordenPestanas.indexOf(this.pestanaActiva);
    if (indexActual < this.ordenPestanas.length - 1) {
      this.pestanaActiva = this.ordenPestanas[indexActual + 1];
    }
  }

  // 📥 Recibir datos desde los subcomponentes
  actualizarDatos(nombre: string, data: any) {
    this.clienteData[nombre] = data;
    this.asesorService.setClienteData?.(this.clienteData); // si tu servicio tiene método para sincronizar
    console.log(`✅ Datos actualizados (${nombre}):`, data);
  }

  // 📩 Escuchar evento de "nextTab" desde los subcomponentes
  manejarNextTab() {
    this.irASiguientePestanaActual();
  }

  // ✅ Validar que todo esté diligenciado antes de registrar
  datosCompletos(): boolean {
    return Object.values(this.clienteData).every((seccion) => seccion && Object.keys(seccion).length > 0);
  }

  // 🚀 Registrar cliente en el backend
  registrarCliente() {
    if (!this.datosCompletos()) {
      alert('⚠️ Debes completar todos los módulos antes de registrar el cliente.');
      return;
    }

    const payload = {
      ...this.clienteData.datosPersonales,
      contacto: this.clienteData.contacto,
      actividad: this.clienteData.actividad,
      laboral: this.clienteData.laboral,
      financiera: this.clienteData.financiera,
      facta: this.clienteData.facta,
    };

    console.log('📦 Enviando datos al backend:', payload);

    this.asesorService.registrarCliente(payload).subscribe({
      next: (res) => {
        console.log('✅ Cliente registrado con éxito:', res);
        alert('Cliente registrado correctamente');
      },
      error: (err) => {
        console.error('❌ Error al registrar cliente:', err);
        alert('Error al registrar el cliente');
      },
    });
  }
}


// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
// import { HttpClient, HttpClientModule } from '@angular/common/http';

// // 🧩 Importamos los subcomponentes
// import { InformacionPersonalComponent } from './informacion-personal/informacion-personal.component';
// import { ContactoPersonalComponent } from './contacto-personal/contacto-personal.component';
// import { InformacionLaboralComponent } from './informacion-laboral/informacion-laboral.component';
// import { InformacionFinancieraComponent } from './informacion-financiera/informacion-financiera.component';
// import { ActividadEconomicaComponent } from './actividad-economica/actividad-economica.component';
// import { FactaComponent } from './informacion-factca/informacion-factac.component';

// @Component({
//   selector: 'app-registrar-cliente',
//   standalone: true,
//   imports: [
//     CommonModule,
//     ReactiveFormsModule,
//     HttpClientModule,
//     InformacionPersonalComponent,
//     ContactoPersonalComponent,
//     InformacionLaboralComponent,
//     InformacionFinancieraComponent,
//     ActividadEconomicaComponent,
//     FactaComponent,
//   ],
//   templateUrl: './registrar-cliente.component.html',
// })
// export class RegistrarClienteComponent {
//   // 🧠 Formulario general
//   clienteForm!: FormGroup;

//   // 🧭 Control de pestañas
//   activeTab: string = 'datos-personales';

//   // 🌐 URL del backend
//   private apiUrl = 'http://localhost:3000/api/asesor/registrar-cliente';

//   constructor(private fb: FormBuilder, private http: HttpClient) {
//     this.clienteForm = this.fb.group({
//       datosPersonales: [],
//       contactoPersonal: [],
//       actividadEconomica: [],
//       informacionLaboral: [],
//       informacionFinanciera: [],
//     });
//   }

//   /**
//    * 🔄 Recibe datos desde los subcomponentes
//    * y actualiza el formulario padre.
//    */
//   actualizarSubform(nombreSubform: string, formData: any) {
//     this.clienteForm.patchValue({ [nombreSubform]: formData });
//   }

//   /**
//    * 📑 Cambia la pestaña activa
//    */
//   cambiarTab(tab: string) {
//     this.activeTab = tab;
//   }

//   /**
//    * 🚀 Envía todos los datos combinados al backend.
//    */
//   onSubmit() {
//     const data = {
//       ...this.clienteForm.value.datosPersonales,
//       contacto: this.clienteForm.value.contactoPersonal,
//       actividad: this.clienteForm.value.actividadEconomica,
//       laboral: this.clienteForm.value.informacionLaboral,
//       financiera: this.clienteForm.value.informacionFinanciera,
//     };

//     this.http.post(this.apiUrl, data).subscribe({
//       next: (response) => {
//         console.log('✅ Cliente registrado correctamente:', response);
//         alert('Cliente registrado con éxito');
//       },
//       error: (err) => {
//         console.error('❌ Error al registrar cliente:', err);
//         alert('Error al registrar el cliente');
//       },
//     });
//   }
// }
