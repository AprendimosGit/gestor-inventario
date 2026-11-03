
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { DatePipe } from '@angular/common';

import { ProductoService } from '../../../services/producto.service';
import { VentaService } from '../../../services/venta.service';

interface ProductoVenta {
  id: number;
  nombre: string;
  precio: number;
}

interface MovimientoReciente {
  id: number;
  producto: string;
  cantidad: number;
  total: number;
  fecha: string;
}

@Component({
  selector: 'app-registrar-venta',
  imports: [ReactiveFormsModule, DatePipe],
  templateUrl: './registrar-venta.html',
  styleUrl: './registrar-venta.css',
})
export class RegistrarVenta implements OnInit {
  private fb = inject(FormBuilder);
  private productoService = inject(ProductoService);
  private ventaService = inject(VentaService);

  productos: ProductoVenta[] = [];
  movimientos: MovimientoReciente[] = [];
  ventaRegistrada = false;
  errorVenta = '';
  guardando = false;

  ventaForm = this.fb.group({
    producto: ['', Validators.required],
    cantidad: [1, [
      Validators.required,
      Validators.min(1),
      Validators.max(50)
    ]],
  });

  get producto() {
    return this.ventaForm.controls.producto;
  }

  get cantidad() {
    return this.ventaForm.controls.cantidad;
  }

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    forkJoin({
      productos: this.productoService.getProductos(),
      ventas: this.ventaService.getVentas(),
    }).subscribe({
      next: ({ productos, ventas }) => {
        this.productos = productos.map(p => ({
          id: p.id,
          nombre: p.nombre,
          precio: Number(p.precio),
        }));

        this.movimientos = ventas.flatMap(venta =>
          venta.detalles.map(detalle => {
            const producto = this.productos.find(
              p => p.id === detalle.producto
            );

            return {
              id: venta.id,
              producto: producto?.nombre ?? `Producto #${detalle.producto}`,
              cantidad: detalle.cantidad,
              total: Number(detalle.precio_unitario) * detalle.cantidad,
              fecha: venta.fecha,
            };
          })
        ).slice(0, 5);
      },
      error: error => {
        console.error('Error al cargar datos:', error);
        this.errorVenta = 'No se pudieron cargar los productos o las ventas.';
      },
    });
  }

  registrarVenta(): void {
    if (this.ventaForm.invalid || this.guardando) {
      this.ventaForm.markAllAsTouched();
      return;
    }

    const productoId = Number(this.producto.value);
    const cantidad = Number(this.cantidad.value);
    const producto = this.productos.find(p => p.id === productoId);

    if (!producto) {
      this.errorVenta = 'Seleccioná un producto válido.';
      return;
    }

    const usuarioGuardado = sessionStorage.getItem('usuario');

    if (!usuarioGuardado) {
      this.errorVenta = 'Debés iniciar sesión para registrar una venta.';
      return;
    }

    let usuarioId: number;

    try {
      const usuario = JSON.parse(usuarioGuardado);
      usuarioId = Number(usuario.id);
    } catch {
      this.errorVenta = 'La sesión no es válida. Iniciá sesión nuevamente.';
      return;
    }

    if (!Number.isInteger(usuarioId) || usuarioId <= 0) {
      this.errorVenta = 'No se pudo identificar al usuario.';
      return;
    }

    this.guardando = true;
    this.ventaRegistrada = false;
    this.errorVenta = '';

    this.ventaService.registrarVenta({
      usuario: usuarioId,
      total: producto.precio * cantidad,
      detalles: [{
        producto: producto.id,
        cantidad,
        precio_unitario: producto.precio,
      }],
    }).subscribe({
      next: () => {
        this.ventaRegistrada = true;
        this.ventaForm.reset({ producto: '', cantidad: 1 });
        this.guardando = false;
        this.cargarDatos();
      },
      error: error => {
        console.error('Error al registrar venta:', error);
        this.errorVenta =
          'No se pudo registrar la venta. Revisá los datos e intentá nuevamente.';
        this.guardando = false;
      },
    });
  }
}
