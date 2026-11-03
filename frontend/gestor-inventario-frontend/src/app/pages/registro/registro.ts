import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-registro',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private usuariosService = inject(UsuarioService);

  registroForm = this.fb.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmarPassword: ['', Validators.required],
  });

  get nombre() {
    return this.registroForm.controls.nombre;
  }

  get apellido() {
    return this.registroForm.controls.apellido;
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

    const nombre = this.nombre.value!;
    const apellido = this.apellido.value!;
    const mail = this.email.value!;
    const password = this.password.value!;
    const confirmarPassword = this.confirmarPassword.value!;

    if (password !== confirmarPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    this.usuariosService.getUsuarios().subscribe({
      next: (usuarios) => {
        if (usuarios.some((usuario) => usuario.mail === mail)) {
          alert('El correo electrónico ya se encuentra registrado.');
          return;
        }

        const nuevoUsuario = {
          nombre,
          apellido,
          mail,
          password,
          rol: 2,
        };

        this.usuariosService.crearUsuario(nuevoUsuario).subscribe({
          next: () => {
            alert('Usuario registrado correctamente.');
            this.router.navigate(['/login']);
          },
          error: (error) => {
            console.error('Error al crear usuario:', error);
            alert('No se pudo registrar el usuario.');
          },
        });
      },
      error: (error) => {
        console.error('Error al consultar usuarios:', error);
        alert('No se pudo conectar con el servidor.');
      },
    });
  }
}