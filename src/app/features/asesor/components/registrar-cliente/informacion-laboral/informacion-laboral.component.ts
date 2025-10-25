import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-informacion-laboral',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './informacion-laboral.component.html',
  styleUrls: ['./informacion-laboral.component.css'],
})
export class InformacionLaboralComponent {
  @Input() datosLaborales: any= {
    ocupacion: '',
    ingresos: null,
    empresa: ''
  };
  
}
