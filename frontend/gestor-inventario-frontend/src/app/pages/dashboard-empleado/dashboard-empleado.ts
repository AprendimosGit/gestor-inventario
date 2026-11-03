
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { StockService } from '../../services/stock.service';
import { VentaService } from '../../services/venta.service';

import { Ingrediente } from '../../models/ingrediente.model';
import { Venta } from '../../models/venta.model';

@Component({
  selector: 'app-dashboard-empleado',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './dashboard-empleado.html',
  styleUrl: './dashboard-empleado.css',
})
export class DashboardEmpleado implements OnInit {
  ingredientes: Ingrediente[] = [];
  ventas: Venta[] = [];

  cargando = true;
  errorCarga = '';

  constructor(
    private stockService: StockService,
    private ventaService: VentaService
  ) {}

  ngOnInit(): void {
    this.cargando = true;
    this.errorCarga = '';

    let respuestasRecibidas = 0;

    const finalizarCarga = () => {
      respuestasRecibidas++;

      if (respuestasRecibidas === 2) {
        this.cargando = false;
      }
    };

    this.stockService.getIngredientes().subscribe({
      next: (data) => {
        this.ingredientes = data.map((ingrediente) => ({
          ...ingrediente,
          stock_actual: Number(ingrediente.stock_actual),
          stock_minimo: Number(ingrediente.stock_minimo),
        }));

        finalizarCarga();
      },
      error: (error) => {
        console.error('Error al cargar ingredientes:', error);
        this.errorCarga = 'No se pudieron cargar los ingredientes.';
        finalizarCarga();
      },
    });

    this.ventaService.getVentas().subscribe({
      next: (data) => {
        this.ventas = data;
        finalizarCarga();
      },
      error: (error) => {
        console.error('Error al cargar ventas:', error);
        this.errorCarga = this.errorCarga
          ? `${this.errorCarga} No se pudieron cargar las ventas.`
          : 'No se pudieron cargar las ventas.';
        finalizarCarga();
      },
    });
  }

  get ingredientesConStockBajo(): Ingrediente[] {
    return this.ingredientes.filter(
      (ingrediente) =>
        ingrediente.stock_actual <= ingrediente.stock_minimo
    );
  }
}
