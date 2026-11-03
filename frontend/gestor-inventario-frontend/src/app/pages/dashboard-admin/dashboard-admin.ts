import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StockService } from '../../services/stock.service';
import { ProductoService } from '../../services/producto.service';
import { UsuarioService } from '../../services/usuario.service';
import { VentaService } from '../../services/venta.service';
import { Ingrediente } from '../../models/ingrediente.model';
import { Proveedor } from '../../models/proveedor.model';
import { Producto } from '../../models/producto.model';
import { Usuario } from '../../models/usuario.model';
import { Venta } from '../../models/venta.model';

@Component({
  selector: 'app-dashboard-admin',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dashboard-admin.html',
  styleUrl: './dashboard-admin.css',
})
export class DashboardAdmin implements OnInit {
  form: FormGroup;
  ingredientes: Ingrediente[] = [];
  proveedores: Proveedor[] = [];
  productos: Producto[] = [];
  usuarios: Usuario[] = [];
  ventas: Venta[] = [];

  get ingredientesConAlerta(): Ingrediente[] {
    return this.ingredientes.filter(i => i.stock_actual <= i.stock_minimo);
  }

  constructor(
    private formBuilder: FormBuilder,
    private stockService: StockService,
    private productoService: ProductoService,
    private usuarioService: UsuarioService,
    private ventaService: VentaService
  ) {
    this.form = this.formBuilder.group({
      ingrediente: ['', [Validators.required]],
      cantidad: ['', [Validators.required]],
      proveedor: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.stockService.getIngredientes().subscribe((data) => {
      this.ingredientes = data;
    });
    this.stockService.getProveedores().subscribe((data) => {
      this.proveedores = data;
    });
    this.productoService.getProductos().subscribe((data) => {
      this.productos = data;
    });
    this.usuarioService.getUsuarios().subscribe((data) => {
      this.usuarios = data;
    });
    this.ventaService.getVentas().subscribe((data) => {
      this.ventas = data;
    });
  }


  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const movimiento = {
      tipo: 'ingreso' as const,
      fecha: new Date().toISOString().split('T')[0],
      cantidad: Number(this.form.value.cantidad),
      ingrediente: Number(this.form.value.ingrediente),
      proveedor: Number(this.form.value.proveedor)
    };

    this.stockService.registrarMovimiento(movimiento).subscribe({
      next: () => {
        alert('Movimiento registrado exitosamente');
        this.form.reset();

        // Actualizar los ingredientes para reflejar el stock nuevo.
        this.stockService.getIngredientes().subscribe({
          next: (data) => {
            this.ingredientes = data;
          },
          error: (error) => {
            console.error('Error al actualizar los ingredientes:', error);
          }
        });
      },
      error: (error) => {
        console.error(
          'Error al registrar el movimiento:',
          error.error
        );

        alert(
          'No se pudo registrar el movimiento. Revisá los datos e intentá nuevamente.'
        );
      }
    });
  }
}