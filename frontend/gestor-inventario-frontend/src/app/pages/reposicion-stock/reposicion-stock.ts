import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StockService } from '../../services/stock.service';
import { Ingrediente } from '../../models/ingrediente.model';
import { Proveedor } from '../../models/proveedor.model';

@Component({
  selector: 'app-reposicion-stock',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './reposicion-stock.html',
  styleUrl: './reposicion-stock.css',
})
export class ReposicionStock implements OnInit {
    form: FormGroup;
    ingredientes: Ingrediente[] = [];
    proveedores: Proveedor[] = [];

    constructor(private fb: FormBuilder, private stockService:StockService , private cdr: ChangeDetectorRef) {
        this.form = this.fb.group({
            ingrediente: ['', Validators.required],
            cantidad: ['', [Validators.required, Validators.min(1)]],
            proveedor: ['', Validators.required]
        })
    }
    ngOnInit(): void {
        this.stockService.getIngredientes().subscribe({
            next: (data) => {
                this.ingredientes = data;
                this.cdr.detectChanges();
            },
            error: (error) => {
                console.error("Error al cargar ingredientes", error)
            }
        });
        this.stockService.getProveedores().subscribe({
            next: (data) => {
                this.proveedores = data;
                this.cdr.detectChanges();
            },
            error: (error) => {
                console.error("Error al cargar proveedores: ", error);
            }
        });
    }
}