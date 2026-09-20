import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ingrediente } from '../models/ingrediente.model';
import { Proveedor } from '../models/proveedor.model';
import { MovimientoStock } from '../models/movimiento-stock.model';

@Injectable({
  providedIn: 'root'
})
export class StockService {
    private proveedoresUrl = 'http://localhost:3001/proveedores';
    private apiUrl = 'http://localhost:3001/ingredientes';
    private movimientosUrl = 'http://localhost:3001/movimientos_stock';

    

  constructor(private http: HttpClient) { }

  getIngredientes(): Observable<Ingrediente[]> {
    return this.http.get<Ingrediente[]>(this.apiUrl);
  }

  getProveedores(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(this.proveedoresUrl);
  }

  getMovimientos(): Observable<MovimientoStock[]> {
    return this.http.get<MovimientoStock[]>(this.movimientosUrl);
  }

  registrarMovimiento(movimiento: MovimientoStock): Observable<MovimientoStock> {
  return this.http.post<MovimientoStock>(this.movimientosUrl, movimiento);
}
}
