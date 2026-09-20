import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-dashboard-admin',
  imports: [ReactiveFormsModule],
  templateUrl: './dashboard-admin.html',
  styleUrl: './dashboard-admin.css',
})
export class DashboardAdmin implements OnInit {
  form: FormGroup;
  productos: Producto[] = [];

  constructor(private formBuilder: FormBuilder, private productoService: ProductoService) {
    this.form = this.formBuilder.group({
      producto: ['', [Validators.required]],
      cantidad: ['', [Validators.required]],
      proveedor: ['', [Validators.required]],
      unidad: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.productoService.getProductos().subscribe((data) => {
      this.productos = data;
    });
  }

  onSubmit() {
    console.log(this.form.value);
  }
}