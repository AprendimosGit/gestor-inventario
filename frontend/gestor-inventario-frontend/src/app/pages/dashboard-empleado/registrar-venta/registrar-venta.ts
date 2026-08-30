import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-registrar-venta',
  imports: [ReactiveFormsModule],
  templateUrl: './registrar-venta.html',
  styleUrl: './registrar-venta.css',
})
export class RegistrarVenta {
  private fb = inject(FormBuilder);

  ventaForm = this.fb.group({
    producto: ['', [Validators.required]],
    cantidad: ['', [Validators.required , Validators.min(1), Validators.max(50)]],
  });

  get producto(){
    return this.ventaForm.controls.producto;
  }

  get cantidad() {
    return this.ventaForm.controls.cantidad;
  }
}
