import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-informacion-factac',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './informacion-factca.component.html',
 styleUrls: ['./informacion-factca.component.css']

})
export class InformacionFactacComponent {
  @Input() datosFactac: any;
}
