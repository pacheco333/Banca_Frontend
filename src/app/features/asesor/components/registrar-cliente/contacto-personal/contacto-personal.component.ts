import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contacto-personal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contacto-personal.component.html',
  styleUrls: ['./contacto-personal.component.css']
})
export class ContactoPersonalComponent {
  @Input() datosContacto: any;
}
