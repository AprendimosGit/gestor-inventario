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
    password: ['', [Validators.required, Validators.minLength(5)]],
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
    const email = this.loginForm.controls.email.value;
    const password = this.loginForm.controls.password.value;

    this.usuariosService.getUsuarios().subscribe({
      next: (usuarios) => {
        const usuario = usuarios.find(
          u => u.mail === email && u.password === password
        );
        if (!usuario) {
          alert('Correo o contraseña incorrectos.');
          return;
        }
        console.log('Usuario verificado ', usuario);
        if (usuario.id_rol === 1) {
          this.router.navigate(['/dashboard-admin']);
        } else if (usuario.id_rol === 2 || usuario.id_rol === 3) {
          this.router.navigate(['/dashboard-empleado']);
        }
      },
      error: (error) => {
        console.error('Error al consultar usuarios: ', error)
        alert('No se pudo conectar con el servidor');
      }
    });
  }
}