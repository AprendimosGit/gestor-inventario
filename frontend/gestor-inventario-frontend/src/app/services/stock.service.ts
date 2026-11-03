
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ingrediente } from '../models/ingrediente.model';
import { Proveedor } from '../models/proveedor.model';
import { MovimientoStock } from '../models/movimiento-stock.model';
import { API_BASE_URL } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  private proveedoresUrl = `${API_BASE_URL}/proveedores/`;
  private ingredientesUrl = `${API_BASE_URL}/ingredientes/`;
  private movimientosUrl = `${API_BASE_URL}/movimientos-stock/`;

  constructor(private http: HttpClient) {}

  getIngredientes(): Observable<Ingrediente[]> {
    return this.http.get<Ingrediente[]>(this.ingredientesUrl);
  }

  getProveedores(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(this.proveedoresUrl);
  }

  getMovimientos(): Observable<MovimientoStock[]> {
    return this.http.get<MovimientoStock[]>(this.movimientosUrl);
  }

  registrarMovimiento(
    movimiento: MovimientoStock
  ): Observable<MovimientoStock> {
    return this.http.post<MovimientoStock>(
      this.movimientosUrl,
      movimiento
    );
  }
}
