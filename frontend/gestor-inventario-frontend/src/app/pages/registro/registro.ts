import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-registro',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  registroForm = this.fb.group({
    nombre: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmarPassword: ['', Validators.required],
  });

  get nombre() {
    return this.registroForm.controls.nombre;
  }

  get email() {
    return this.registroForm.controls.email;
  }

  get password() {
    return this.registroForm.controls.password;
  }

  get confirmarPassword() {
    return this.registroForm.controls.confirmarPassword;
  }

  registrar(): void {
    if (this.registroForm.invalid) {
      this.registroForm.markAllAsTouched();
      return;
    }

    console.log('Usuario registrado:', this.registroForm.value);
    this.router.navigate(['/login']);
  }
}