import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-informacion-financiera',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './informacion-financiera.componet.html',
  styleUrls: ['./informacion-financiera.componet.css']
})
export class InformacionFinancieraComponent {
  @Input() datosLaborales: any;
}
