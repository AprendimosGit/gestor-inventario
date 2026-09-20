import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovimientoStock } from '../models/movimiento-stock.model';

@Injectable({
  providedIn: 'root'
})
export class MovimientoStockService {
  private apiUrl = 'http://localhost:3001/movimientos_stock';

  constructor(private http: HttpClient) {}

  getMovimientos(): Observable<MovimientoStock[]> {
    return this.http.get<MovimientoStock[]>(this.apiUrl);
  }

  crearMovimiento(movimiento: Omit<MovimientoStock, 'id'>): Observable<MovimientoStock> {
    return this.http.post<MovimientoStock>(this.apiUrl, movimiento);
  }
}