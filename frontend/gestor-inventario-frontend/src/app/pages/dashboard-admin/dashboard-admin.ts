import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IngredienteService } from '../../services/ingrediente.service';
import { Ingrediente } from '../../models/ingrediente.model';
import { ProveedorService } from '../../services/proveedor.service';
import { Proveedor } from '../../models/proveedor.model';
import { MovimientoStockService } from '../../services/movimiento-stock.service';

@Component({
  selector: 'app-dashboard-admin',
  imports: [ReactiveFormsModule],
  templateUrl: './dashboard-admin.html',
  styleUrl: './dashboard-admin.css',
})
export class DashboardAdmin implements OnInit {
  form: FormGroup;
  ingredientes: Ingrediente[] = [];
  proveedores: Proveedor[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private ingredienteService: IngredienteService,
    private proveedorService: ProveedorService,
    private movimientoStockService: MovimientoStockService
  ) {
    this.form = this.formBuilder.group({
      producto: ['', [Validators.required]],
      cantidad: ['', [Validators.required]],
      proveedor: ['', [Validators.required]],
      unidad: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.ingredienteService.getIngredientes().subscribe((data) => {
      this.ingredientes = data;
    });
    this.proveedorService.getProveedores().subscribe((data) => {
      this.proveedores = data;
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const nuevoMovimiento = {
      tipo: 'ingreso',
      fecha: new Date().toISOString().split('T')[0],
      cantidad: Number(this.form.value.cantidad),
      id_ingrediente: Number(this.form.value.producto),
      id_usuario: 1,
      id_proveedor: Number(this.form.value.proveedor),
      id_venta: null
    };

    this.movimientoStockService.crearMovimiento(nuevoMovimiento).subscribe(() => {
      alert('Stock cargado correctamente');
      this.form.reset();
    });
  }
}