import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-registrar-venta',
  imports: [ReactiveFormsModule],
  templateUrl: './registrar-venta.html',
  styleUrl: './registrar-venta.css',
})
export class RegistrarVenta {
  private fb = inject(FormBuilder);

  ventaForm = this.fb.group({
    producto: [''],
    cantidad: [''],
  });
}
