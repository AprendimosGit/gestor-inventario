import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

interface ProductoVenta {
  nombre: string;
  stockDisponible: number;
}

@Component({
  selector: 'app-registrar-venta',
  imports: [ReactiveFormsModule],
  templateUrl: './registrar-venta.html',
  styleUrl: './registrar-venta.css',
})
export class RegistrarVenta {
  private fb = inject(FormBuilder);

  productos: ProductoVenta[] = [
    { nombre: 'Pizza Muzzarella', stockDisponible: 10},
    { nombre: 'Pizza Especial', stockDisponible: 6},
    { nombre: 'Pizza Napolitana', stockDisponible: 8},
    { nombre: 'Lomo Simple', stockDisponible: 12},
    { nombre: 'Lomo Completo', stockDisponible: 3},
  ];

  ventaForm = this.fb.group({
    producto: ['', [Validators.required]],
    cantidad: [1, [Validators.required , Validators.min(1), Validators.max(50)]],
  });

  ventaRegistrada = false;

  get producto(){
    return this.ventaForm.controls.producto;
  }

  get cantidad() {
    return this.ventaForm.controls.cantidad;
  }

  registrarVenta(): void {
    if (this.ventaForm.invalid) {
      this.ventaForm.markAllAsTouched();
      return;
    }

    console.log('Venta registrada: ', this.ventaForm.value);
    this.ventaRegistrada = true;
    this.ventaForm.reset();
  }
}
