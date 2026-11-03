
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { DatePipe } from '@angular/common';

interface ProductoVenta {
  id: number;
  nombre: string;
  precio: number;
}

interface DetalleVenta {
  id: number;
  producto: number;
  cantidad: number;
  precio_unitario: string;
}

interface Venta {
  id: number;
  fecha: string;
  usuario: number;
  total: string;
  detalles: DetalleVenta[];
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
  private http = inject(HttpClient);
  private api = 'http://localhost:8000/api/v1';

  productos: ProductoVenta[] = [];
  movimientos: MovimientoReciente[] = [];
  ventaRegistrada = false;
  errorVenta = '';
  guardando = false;

  ventaForm = this.fb.group({
    producto: ['', Validators.required],
    cantidad: [1, [Validators.required, Validators.min(1), Validators.max(50)]],
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
      productos: this.http.get<ProductoVentaApi[]>(`${this.api}/productos/`),
      ventas: this.http.get<Venta[]>(`${this.api}/ventas/`),
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

    this.guardando = true;
    this.ventaRegistrada = false;
    this.errorVenta = '';

    this.http.post<Venta>(`${this.api}/ventas/`, {
      usuario: 1,
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
        this.errorVenta = 'No se pudo registrar la venta. Revisá los datos e intentá nuevamente.';
        this.guardando = false;
      },
    });
  }
}

interface ProductoVentaApi {
  id: number;
  nombre: string;
  precio: string | number;
}
