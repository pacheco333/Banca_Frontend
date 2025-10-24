import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-informacion-personal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './informacion-personal.component.html',
})
export class InformacionPersonalComponent implements OnInit {
  @Output() formReady = new EventEmitter<FormGroup>();
  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      tipo_documento: ['', Validators.required],
      numero_documento: ['', Validators.required],
      lugar_expedicion: [''],
      ciudad_nacimiento: [''],
      fecha_nacimiento: ['', Validators.required],
      fecha_expedicion: [''],
      primer_nombre: ['', Validators.required],
      segundo_nombre: [''],
      primer_apellido: ['', Validators.required],
      segundo_apellido: [''],
      genero: ['', Validators.required],
      nacionalidad: ['', Validators.required],
      otra_nacionalidad: [''],
      estado_civil: ['', Validators.required],
      grupo_etnico: ['', Validators.required],
    });

    this.formReady.emit(this.form);
  }
}
