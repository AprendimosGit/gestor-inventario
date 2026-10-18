import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private usuariosService = inject(UsuarioService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  get email() {
    return this.loginForm.controls.email;
  }

  get password() {
    return this.loginForm.controls.password;
  }

  ingresar(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const mail = this.email.value!;
    const password = this.password.value!;

    this.usuariosService.login(mail, password).subscribe({
      next: (usuario) => {
        if (usuario.rol === 1) {
          this.router.navigate(['/dashboard-admin']);
        } else {
          this.router.navigate(['/dashboard-empleado']);
        }
      },
      error: (error) => {
        console.error('Error al iniciar sesión:', error);

        if (error.status === 401) {
          alert('Correo o contraseña incorrectos.');
        } else {
          alert('No se pudo conectar con el servidor.');
        }
      },
    });
  }
}