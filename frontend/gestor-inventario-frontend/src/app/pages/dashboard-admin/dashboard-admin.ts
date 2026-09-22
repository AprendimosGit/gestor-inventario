import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
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
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
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

  onSubmit() {
    if (this.form.valid) {
      const movimiento = {
        tipo: 'entrada',
        fecha: new Date().toISOString(),
        cantidad: +this.form.value.cantidad,
        id_ingrediente: +this.form.value.ingrediente,
        id_usuario: 1,
        id_proveedor: +this.form.value.proveedor,
        id_venta: null,
      };
      this.stockService.registrarMovimiento(movimiento).subscribe(() => {
          alert('Movimiento registrado exitosamente');
          this.form.reset();
        },
        error => {
          console.error('Error al registrar el movimiento:', error);
          alert('Ocurrió un error al registrar el movimiento. Por favor, inténtalo de nuevo.');
        });
    }
  }
}